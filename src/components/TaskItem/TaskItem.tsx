import { useState } from 'react';

import './TaskItem.scss';

import { Task } from '../Dashboard/Dashboard.types';

import { FaRegEye } from 'react-icons/fa';
import { GoPencil } from 'react-icons/go';
import { MdDeleteOutline } from 'react-icons/md';

const TaskItem = ({
  task,
  refreshTaskList,
  updateTaskDetails,
  openTaskDetailsModal,
  openTaskEditingModal,
  deleteTask,
}: {
  task: Task;
  refreshTaskList: (taskToUpdate: Task) => void;
  updateTaskDetails: (task: Task) => void;
  openTaskDetailsModal: () => void;
  openTaskEditingModal: () => void;
  deleteTask: (taskToDelete: Task) => void;
}) => {
  const { id, title, description, isCompleted } = task;
  const initialIsCompleted = isCompleted;

  const [taskCompleted, setTaskCompleted] = useState(initialIsCompleted);

  const titleClassName = taskCompleted
    ? 'task-item-info__title task-item-info__title--completed-task'
    : 'task-item-info__title';

  const handleTaskStateChange = () => {
    setTaskCompleted(!taskCompleted);

    const updatedTask = { ...task, isCompleted: !taskCompleted };
    refreshTaskList(updatedTask);
  };

  const handleDetailsClick = () => {
    updateTaskDetails(task);
    openTaskDetailsModal();
  };

  const handleEditClick = () => {
    updateTaskDetails(task);
    openTaskEditingModal();
  };

  const handleDeleteClick = () => {
    deleteTask(task);
  };

  return (
    <li>
      <div className="task-item">
        <div className="task-item__info-wrapper">
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              checked={taskCompleted}
              id={`task-${id}`}
              className="checkbox-wrapper__checkbox"
              onChange={handleTaskStateChange}
            />
            <label htmlFor={`task-${id}`} className="checkbox-wrapper__label" />
          </div>
          <div className="task-item-info">
            <h3 className={titleClassName}>{title}</h3>
            <p className="task-item-info__description">{description}</p>
          </div>
        </div>
        <div className="task-item__actions">
          <button className="task-item-action" onClick={handleDetailsClick}>
            <FaRegEye />
          </button>
          <button className="task-item-action" onClick={handleEditClick}>
            <GoPencil />
          </button>
          <button className="task-item-action" onClick={handleDeleteClick}>
            <MdDeleteOutline />
          </button>
        </div>
      </div>
    </li>
  );
};

export default TaskItem;
