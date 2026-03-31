import React from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import TaskItem from "./TaskItem";
import type { Task } from "../../services/dragDropService";

type TaskColumnProps = {
  id: string;
  title: string;
  tasks: Task[];
};

const TaskColumn = ({ id, title, tasks }: TaskColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      id={id}
      className="bg-white/30 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/40 min-h-[500px]"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b border-gray-300 pb-2">
        {title} <span className="text-sm font-normal text-gray-600 bg-white/50 px-2 py-1 rounded-full">{tasks.length}</span>
      </h2>
      <div className="flex flex-col gap-4">
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} columnId={id} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default TaskColumn;
