import './App.scss'
import Dashboard from './components/Dashboard/Dashboard'
import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <div className='to-do-list--app'>
      <header>
        <h1 className='to-do-list--main-title'>To Do List</h1>
      </header>
      <Dashboard />
      <Footer />
    </div>
  )
}

export default App
