import './App.css';
import Headers from './pages/headers';
import Base from './pages/Base'
import PageList from './pages/PageList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchLanguage } from './store/LanguageSlice';
import Review from './pages/Review';
import { MyTrips } from './pages/MyTrips';
import { Account } from './pages/Account';
import { Admin } from './pages/Admin';
import Settings from './pages/Settings';
import AuthCheck from './AuthCheck';
function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchLanguage())
  },[dispatch])

  
  return (
    
      <div className='App'>
        <Router>
          <AuthCheck/>
          <Headers />
          <Routes>
            <Route path='/' exact Component={Base} />
            <Route path='/flights' exact Component={PageList} />
            <Route path="/flights/review" exact Component={Review} />
            <Route path="/myTrips" exact Component={MyTrips} />
            <Route path="/account" exact Component={Account} />
            <Route path="/admin" exact Component={Admin} />
            <Route path="/settings" exact Component={Settings} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
