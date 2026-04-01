"use client";
import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import TaskColumn from "./TaskColumn";
import TaskForm, { TaskFormData } from "./TaskForm";
import { celebrate, celebrateIntense, celebrateSubtle } from "../../services/confettiService";
import { handleDragEnd as performDragEnd, Task, TaskState } from "../../services/dragDropService";

export type { Task } from "../../services/dragDropService";

const TaskPage = () => {
  const [tasks, setTasks] = useState<TaskState>({
    todo: [
      { id: "1", content: "Design System Architecture", priority: "High", deadline: "2024-12-01" },
      { id: "2", content: "Implement Authentication", priority: "Medium", deadline: "2024-12-05" },
    ],
    done: [
      { id: "3", content: "Project Setup", priority: "Low", deadline: "2024-11-20" },
    ],
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleAddTask = (data: TaskFormData) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      ...data,
    };
    setTasks(prev => ({ ...prev, todo: [...prev.todo, newTask] }));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { updatedTasks, completedTask } = performDragEnd(event, tasks);
    setTasks(updatedTasks);

    // Trigger celebration if task was moved to done
    if (completedTask) {
      if (completedTask.priority === "High") {
        celebrateIntense();
      } else if (completedTask.priority === "Low") {
        celebrateSubtle();
      } else {
        celebrate();
      }
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 drop-shadow-sm">
        CSP541: ERP Project Dashboard
      </h1>
      <h2 className="text-2xl font-semibold text-center text-gray-600 mb-4">
        Clément Chapard - A20655461
      </h2>
      <TaskForm onAddTask={handleAddTask} />
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TaskColumn id="todo" title="To Do" tasks={tasks.todo} />
          <TaskColumn id="done" title="Completed" tasks={tasks.done} />
        </div>
      </DndContext>
    </div>
  );
};

export default TaskPage;
