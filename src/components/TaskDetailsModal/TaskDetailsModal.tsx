import { useState, useEffect } from 'react';

import Modal from '../Modal/Modal';

import './TaskDetailsModal.scss';

import { Task } from '../Dashboard/Dashboard.types';
import { TaskDetails, TaskDetailsState } from './TaskDetailsModal.types';

const INITIAL_TASK_DETAILS = {
  title: '',
  description: '',
};

const TaskDetailsModal = ({
  task,
  isTaskDetailsModalOpen,
  onTaskDetailsModalClose,
}: {
  task: Task | null;
  isTaskDetailsModalOpen: boolean;
  onTaskDetailsModalClose: () => void;
}) => {
  const [taskDetails, setTaskDetails]: TaskDetailsState =
    useState<TaskDetails>(INITIAL_TASK_DETAILS);

  useEffect(() => {
    if (isTaskDetailsModalOpen && task) {
      const { title, description } = task;

      setTaskDetails({ title, description });
    } else {
      setTaskDetails(INITIAL_TASK_DETAILS);
    }
  }, [isTaskDetailsModalOpen, task]);

  return (
    <Modal
      isModalOpen={isTaskDetailsModalOpen}
      onModalClose={onTaskDetailsModalClose}
    >
      <h2 className="dialog__details-title">{taskDetails.title}</h2>
      <div className="dialog__details-description">
        {taskDetails.description}
      </div>
    </Modal>
  );
};

export default TaskDetailsModal;
