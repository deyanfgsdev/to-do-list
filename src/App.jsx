import './App.scss'
import Dashboard from './components/Dashboard/Dashboard'
import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <div className='to-do-list-app'>
      <header className='header'>
        <h1 className='header__main-title'>To Do List</h1>
      </header>
      <Dashboard />
      <Footer />
    </div>
  )
}

export default App
