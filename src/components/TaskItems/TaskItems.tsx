import TaskItem from '../TaskItem/TaskItem';

import './TaskItems.scss';

import { Tasks, Task } from '../Dashboard/Dashboard.types';

const TaskItems = ({
  tasks,
  refreshTaskList,
  updateTaskDetails,
  openTaskDetailsModal,
  openTaskEditingModal,
  deleteTask,
}: {
  tasks: Tasks;
  refreshTaskList: (taskToUpdate: Task) => void;
  updateTaskDetails: (task: Task) => void;
  openTaskDetailsModal: () => void;
  openTaskEditingModal: () => void;
  deleteTask: (taskToDelete: Task) => void;
}) => {
  return (
    <div className="main__tasks-items">
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            refreshTaskList={refreshTaskList}
            updateTaskDetails={updateTaskDetails}
            openTaskDetailsModal={openTaskDetailsModal}
            openTaskEditingModal={openTaskEditingModal}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskItems;
