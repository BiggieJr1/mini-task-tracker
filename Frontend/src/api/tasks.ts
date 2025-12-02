// frontend/src/api/tasks.ts

export interface Task {
  id: number;
  title: string;
  owner: string;
  description: string;
  status: "completed" | "incompleted";
}

export interface TaskFilters {
  title?: string;
  owner?: string;
  status?: string;
}

export interface NewTask {
  title: string;
  owner: string;
  description: string;
}

export const getTasksRequest = async (
  filters: TaskFilters
): Promise<Task[]> => {
  // Convertimos el objeto de filtros a string de consulta (ej: ?title=hola&status=completed)
  const queryParams = new URLSearchParams(
    filters as Record<string, string>
  ).toString();

  const response = await fetch(`/api/tasks?${queryParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error fetching tasks");
  }

  return response.json();
};

export const createTaskRequest = async (task: NewTask): Promise<Task> => {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Importante para que el backend lea el body
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error creating task");
  }

  return response.json();
};

export const updateTaskStatusRequest = async (
  id: number,
  status: "completed" | "incompleted"
): Promise<Task> => {
  const response = await fetch(`/api/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error updating task");
  }

  return response.json();
};
