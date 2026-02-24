import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchLanguage } from '../../store/LanguageSlice';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes, Route } from 'react-router-dom';

// Import shared components
import Headers from './components/Headers';
import Base from '../pages/Base';
import PageList from '../pages/PageList';
import Review from '../pages/Review';
import { MyTrips } from '../pages/MyTrips';
import { Account } from '../pages/Account';
import { Admin } from '../pages/Admin';
import Settings from '../pages/Settings';
import AuthCheck from '../AuthCheck';

const Stack = createNativeStackNavigator();

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLanguage());
  }, [dispatch]);

  if (Platform.OS === 'native') {
    return (
      <NavigationContainer>
        <AuthCheck />
        <Headers />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Base} />
          <Stack.Screen name="Flights" component={PageList} />
          <Stack.Screen name="Review" component={Review} />
          <Stack.Screen name="MyTrips" component={MyTrips} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="Admin" component={Admin} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

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
};

export default App; 