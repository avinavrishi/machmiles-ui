import './App.css';
import Headers from './pages/headers';
import Base from './pages/Base'
import PageList from './pages/PageList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (

    <div className='App'>
      <Router>
        <Headers/>
        <Routes>
          <Route path='/' exact Component={Base}/>
          <Route path='/result' exact Component={PageList}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
