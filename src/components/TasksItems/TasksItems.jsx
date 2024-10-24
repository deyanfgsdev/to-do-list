import TaskItem from '../TaskItem/TaskItem'

import './TaskItems.scss'

const TaskItems = ({ tasks, refreshTaskList, setTaskDetails, openTaskDetailsModal, taskToEdit, checkShowTaskEditingModal, deleteTask }) => {
  return (
    <div className='to-do-list--tasks-items'>
      <ul>
        {tasks.map((task) =>
          <TaskItem
            key={task.id}
            task={task}
            refreshTaskList={refreshTaskList}
            setTaskDetails={setTaskDetails}
            openTaskDetailsModal={openTaskDetailsModal}
            taskToEdit={taskToEdit}
            checkShowTaskEditingModal={checkShowTaskEditingModal}
            deleteTask={deleteTask}
          />)}
      </ul>
    </div>
  )
}

export default TaskItems
