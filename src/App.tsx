import './App.scss';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <div className="to-do-list-app">
      <Header mainTitle="To Do List" />
      <Dashboard />
      <Footer />
    </div>
  );
};

export default App;
