import TaskItem from '../TaskItem/TaskItem'

import './TaskItems.scss'

const TaskItems = ({ tasks, refreshTaskList, updateTaskDetails, openTaskDetailsModal, openTaskEditingModal, deleteTask }) => {
  return (
    <div className='to-do-list--tasks-items'>
      <ul>
        {tasks.map((task) =>
          <TaskItem
            key={task.id}
            task={task}
            refreshTaskList={refreshTaskList}
            updateTaskDetails={updateTaskDetails}
            openTaskDetailsModal={openTaskDetailsModal}
            openTaskEditingModal={openTaskEditingModal}
            deleteTask={deleteTask}
          />)}
      </ul>
    </div>
  )
}

export default TaskItems
