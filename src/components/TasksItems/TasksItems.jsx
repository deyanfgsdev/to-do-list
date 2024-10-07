import TaskItem from '../TaskItem/TaskItem'

const TaskItems = ({ tasks, showTaskDetails, checkShowTaskDetailsModal, taskToEdit, checkShowTaskEditingModal, deleteTask }) => {
  return (
    <div className='to-do-list--tasks-items'>
      <ul>
        {tasks.map((task) =>
          <TaskItem
            key={task.id}
            task={task}
            showTaskDetails={showTaskDetails}
            checkShowTaskDetailsModal={checkShowTaskDetailsModal}
            taskToEdit={taskToEdit}
            checkShowTaskEditingModal={checkShowTaskEditingModal}
            deleteTask={deleteTask}
          />)}
      </ul>
    </div>
  )
}

export default TaskItems
