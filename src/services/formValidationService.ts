/**
 * Form validation rules and utilities
 */

export type TaskFormData = {
  content: string;
  priority: "Low" | "Medium" | "High";
  deadline: string;
};

/**
 * Validates that task content is not empty
 */
export const validateContent = (content: string): boolean | string => {
  if (!content || content.trim() === "") {
    return "Task content is required";
  }
  return true;
};

/**
 * Validates that priority is selected
 */
export const validatePriority = (
  priority: string
): boolean | string => {
  if (!priority) {
    return "Priority is required";
  }
  if (!["Low", "Medium", "High"].includes(priority)) {
    return "Invalid priority level";
  }
  return true;
};

/**
 * Validates that deadline is provided and not in the past
 */
export const validateDeadline = (deadline: string): boolean | string => {
  if (!deadline) {
    return "Deadline is required";
  }

  const selectedDate = new Date(deadline);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    return "Deadline cannot be in the past";
  }

  return true;
};

/**
 * Validates the entire form data
 */
export const validateTaskForm = (data: TaskFormData): { isValid: boolean; errors: Partial<Record<keyof TaskFormData, string>> } => {
  const errors: Partial<Record<keyof TaskFormData, string>> = {};

  const contentValidation = validateContent(data.content);
  if (contentValidation !== true) {
    errors.content = contentValidation as string;
  }

  const priorityValidation = validatePriority(data.priority);
  if (priorityValidation !== true) {
    errors.priority = priorityValidation as string;
  }

  const deadlineValidation = validateDeadline(data.deadline);
  if (deadlineValidation !== true) {
    errors.deadline = deadlineValidation as string;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

