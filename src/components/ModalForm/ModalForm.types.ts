export type ModalTitleState = [string, (newModalTitle: string) => void];
export type FormSubmitButtonTextState = [
  string,
  (newFormSubmitButtonText: string) => void,
];
export interface TaskForm {
  taskTitle: string;
  taskDescription: string;
}
export type TaskFormState = [
  TaskForm,
  (newTaskForm: TaskForm | ((prevState: TaskForm) => TaskForm)) => void,
];
export type ShowTitleInputErrorState = [
  boolean,
  (newShowTitleInputErrorState: boolean) => void,
];
