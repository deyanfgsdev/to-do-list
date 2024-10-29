import Modal from '../Modal/Modal'
import ModalForm from '../ModalForm/ModalForm'

const TaskFormModal = ({ isTaskFormModalOpen, onTaskFormModalClose, isAddTaskForm, addTask, isEditingTaskForm, task, editTask }) => {
  return (
    <Modal isModalOpen={isTaskFormModalOpen} onModalClose={onTaskFormModalClose}>
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
  )
}

export default TaskFormModal
