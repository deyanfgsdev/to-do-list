import './App.scss'
import Dashboard from './components/Dashboard/Dashboard'

const App = () => {
  return (
    <div className='to-do-list--app'>
      <header>
        <h1 className='to-do-list--main-title'>To Do List</h1>
      </header>
      <Dashboard />
    </div>
  )
}

export default App
