import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import CreateVideo from './views/CreateVideo';
import DashBoard from './views/Dashboard';
import Videos from './views/Videos';
function App() {
  // Main Router
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Navigate to={'/dashboard'} replace={true} />} />
          <Route path='dashboard' element={<DashBoard />} />
          <Route path='my-videos' element={<Videos />}>
            <Route path='create' element={<CreateVideo />} />
          </Route>
        </Route>

        <Route path='auth' element={<AuthLayout />}>

        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
