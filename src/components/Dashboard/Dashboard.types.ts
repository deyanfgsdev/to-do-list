export interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}
export type Tasks = Task[];
export type TasksState = [Tasks, (newTasks: Tasks) => void];
export type IsTaskFormModalOpenState = [
  boolean,
  (newIsTaskFormModalOpen: boolean) => void,
];
export type IsAddTaskFormState = [boolean, (newIsAddTaskForm: boolean) => void];
export type IsEditingTaskFormState = [
  boolean,
  (newIsEditingTaskFormState: boolean) => void,
];
export type TaskState = [Task | null, (newTask: Task) => void];
export type IsTaskDetailsModalOpenState = [
  boolean,
  (newIsTaskDetailsModalOpenState: boolean) => void,
];
