import Modal from '../Modal/Modal';
import ModalForm from '../ModalForm/ModalForm';

import { Task } from '../Dashboard/Dashboard.types';

const TaskFormModal = ({
  isTaskFormModalOpen,
  onTaskFormModalClose,
  isAddTaskForm,
  addTask,
  isEditingTaskForm,
  task,
  editTask,
}: {
  isTaskFormModalOpen: boolean;
  onTaskFormModalClose: () => void;
  isAddTaskForm: boolean;
  addTask: (task: Task) => void;
  isEditingTaskForm: boolean;
  task: Task | null;
  editTask: (taskToEdit: Task) => void;
}) => {
  return (
    <Modal
      isModalOpen={isTaskFormModalOpen}
      onModalClose={onTaskFormModalClose}
    >
      <ModalForm
        isModalOpen={isTaskFormModalOpen}
        onModalClose={onTaskFormModalClose}
        isAddTaskForm={isAddTaskForm}
        addTask={addTask}
        isEditingTaskForm={isEditingTaskForm}
        task={task}
        editTask={editTask}
      />
    </Modal>
  );
};

export default TaskFormModal;
