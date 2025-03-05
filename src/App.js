import './App.css';
import Headers from './pages/headers';
import Base from './pages/Base'
import PageList from './pages/PageList';
import { Routes, Route } from 'react-router-dom';
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

  useEffect(() => {
    dispatch(fetchLanguage())
  }, [dispatch])

  return (
    <div className='App'>
      <AuthCheck />
      <Headers />
      <Routes>
        <Route path='/' element={<Base />} />
        <Route path='/flights' element={<PageList />} />
        <Route path="/flights/review" element={<Review />} />
        <Route path="/myTrips" element={<MyTrips />} />
        <Route path="/account" element={<Account />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
