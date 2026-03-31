"use client";
import React from "react";
import { useForm } from "react-hook-form";
import type { TaskFormData } from "../../services/formValidationService";

export type { TaskFormData } from "../../services/formValidationService";

const TaskForm = ({ onAddTask }: { onAddTask: (data: TaskFormData) => void }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>();

  const onSubmit = (data: TaskFormData) => {
    onAddTask(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white/30 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/40 mb-8"
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Add New Task</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <input
            {...register("content", { required: "Task content is required" })}
            placeholder="Task Description"
            className="w-full p-2 rounded-lg bg-white/50 border border-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 text-gray-800"
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
          )}
        </div>

        <div>
          <select
            {...register("priority", { required: "Priority is required" })}
            className="w-full p-2 rounded-lg bg-white/50 border border-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
          >
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {errors.priority && (
            <p className="text-red-500 text-sm mt-1">{errors.priority.message}</p>
          )}
        </div>

        <div>
          <input
            type="date"
            {...register("deadline", {
              required: "Deadline is required",
              validate: (value) => {
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return selectedDate >= today || "Deadline cannot be in the past";
              },
            })}
            className="w-full p-2 rounded-lg bg-white/50 border border-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
          />
          {errors.deadline && (
            <p className="text-red-500 text-sm mt-1">{errors.deadline.message}</p>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-blue-500/80 hover:bg-blue-600/80 text-white font-bold py-2 px-4 rounded-lg transition-colors"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
