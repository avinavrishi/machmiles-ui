import './App.css';
import Headers from './pages/headers';
import Base from './pages/Base'
import PageList from './pages/PageList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchLanguage } from './store/LanguageSlice';
import Review from './pages/Review';
function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchLanguage())
  },[dispatch])

  
  return (
    
      <div className='App'>
        <Router>
          <Headers />
          <Routes>
            <Route path='/' exact Component={Base} />
            <Route path='/flights' exact Component={PageList} />
            <Route path="/flights/review" exact Component={Review} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
