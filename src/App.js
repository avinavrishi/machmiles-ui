import './App.css';
import Headers from './pages/headers';
import Base from './pages/Base'
import PageList from './pages/PageList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { FlightContext } from './context/FlightContext';
function App() {
  return (
    
      <div className='App'>
        <Router>
          <Headers />
          <Routes>
            <Route path='/' exact Component={Base} />
            <Route path='/flights' exact Component={PageList} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
