import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "../../services/dragDropService";

type TaskItemProps = {
  task: Task;
  columnId: string; // Add columnId prop
};

const TaskItem = ({ task, columnId }: TaskItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id, data: { columnId: columnId } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-5 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-white/50 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow relative overflow-hidden group"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800">{task.content}</h3>
        <span
          className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
      </div>
      <div className="text-sm text-gray-500 flex items-center gap-1 mt-3">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        {task.deadline}
      </div>
    </div>
  );
};

export default TaskItem;
