import TaskItem from '../TaskItem/TaskItem'

const TaskItems = ({ tasks, updateTaskState, setTaskDetails, checkShowTaskDetailsModal, taskToEdit, checkShowTaskEditingModal, deleteTask }) => {
  return (
    <div className='to-do-list--tasks-items'>
      <ul>
        {tasks.map((task) =>
          <TaskItem
            key={task.id}
            task={task}
            updateTaskState={updateTaskState}
            setTaskDetails={setTaskDetails}
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
