import { DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

export type Task = {
  id: string;
  content: string;
  priority: "Low" | "Medium" | "High";
  deadline: string;
};

export type TaskContainer = "todo" | "done";

export type TaskState = {
  todo: Task[];
  done: Task[];
};

/**
 * Finds which container a task belongs to
 */
export const findContainer = (
  id: string,
  tasks: TaskState
): TaskContainer | undefined => {
  if (tasks.todo.some(task => task.id === id)) return "todo";
  if (tasks.done.some(task => task.id === id)) return "done";
  return undefined;
};

/**
 * Handles the drag end event for task reordering or moving between containers
 * Returns the updated task state and a boolean indicating if task was moved to done
 */
export const handleDragEnd = (
  event: DragEndEvent,
  tasks: TaskState
): { updatedTasks: TaskState; movedToDone: boolean } => {
  const { active, over } = event;
  let movedToDone = false;

  if (!over) {
    return { updatedTasks: tasks, movedToDone };
  }

  const activeId = active.id as string;
  const overId = over.id as string;

  const activeContainer = findContainer(activeId, tasks);
  const overContainer = findContainer(overId, tasks) || (over.id as TaskContainer);

  if (!activeContainer || !overContainer) {
    return { updatedTasks: tasks, movedToDone };
  }

  // Handle reordering within the same column
  if (activeContainer === overContainer) {
    const updatedTasks = { ...tasks };
    const newItems = arrayMove(
      updatedTasks[activeContainer],
      updatedTasks[activeContainer].findIndex(item => item.id === activeId),
      updatedTasks[activeContainer].findIndex(item => item.id === overId)
    );
    updatedTasks[activeContainer] = newItems;
    return { updatedTasks, movedToDone };
  }

  // Handle moving to a different container
  const updatedTasks = { ...tasks };
  const activeItems = [...updatedTasks[activeContainer]];
  const overItems = [...updatedTasks[overContainer]];
  const activeIndex = activeItems.findIndex(item => item.id === activeId);
  const overIndex = overItems.findIndex(item => item.id === overId);

  const [movedItem] = activeItems.splice(activeIndex, 1);
  overItems.splice(overIndex >= 0 ? overIndex : overItems.length, 0, movedItem);

  updatedTasks[activeContainer] = activeItems;
  updatedTasks[overContainer] = overItems;

  // Check if task was moved to done
  if (overContainer === "done") {
    movedToDone = true;
  }

  return { updatedTasks, movedToDone };
};

