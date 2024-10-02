import './App.scss'
import ToDoListDashBoard from './components/ToDoListDashBoard'

const App = () => {
  return (
    <div className='to-do-list--app'>
      <header>
        <h1 className='to-do-list--main-title'>My To do List</h1>
      </header>
      <ToDoListDashBoard />
    </div>
  )
}

export default App
