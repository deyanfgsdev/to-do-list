import TaskItem from '../TaskItem/TaskItem'

const TaskItems = ({ tasks, taskDetails, checkShowTaskDetailsModal }) => {
  return (
    <div className='to-do-list--tasks-items'>
      {!tasks.length && <p className='to-do-list--no-tasks'>There are no tasks. Add your first task!</p>}
      {tasks.length && (
        <ul>
          {tasks.map((task) =>
            <TaskItem key={task.id} task={task} taskDetails={taskDetails} checkShowTaskDetailsModal={checkShowTaskDetailsModal} />
          )}
        </ul>
      )}
    </div>
  )
}

export default TaskItems
