export interface TaskDetails {
  title: string;
  description: string;
}
export type TaskDetailsState = [
  TaskDetails,
  (newTaskDetails: TaskDetails) => void,
];
