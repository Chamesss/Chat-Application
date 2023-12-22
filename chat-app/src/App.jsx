import Login from './pages/Login';
import Register from './pages/Register';
import Application from './pages/Application';
import RequireAuth from './utils/RequireAuth'
import RequireNoAuth from './utils/RequireNoAuth'
import Layout from './Layouts/Layout'
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate
} from 'react-router-dom'
import { useState, useEffect } from 'react';
import AvatarSelection from './pages/Avatar';
import { ChatProvider } from './Contexts/ChatProvider';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<Layout />}>
        {/* public routes but not accessible for private */}
        <Route element={<RequireNoAuth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
        {/* private routes */}
        <Route element={<RequireAuth />}>
          <Route path="" element={<Navigate to="/application" />} />
          <Route path="application" element={<Application />} />
          <Route path='avatar' element={<AvatarSelection />} />
          <Route path="*" element={<Navigate to="/application" />} />
        </Route>
      </Route>
    </Route>
  )
)

function App() {
  const [showRouter, setShowRouter] = useState(false);

  useEffect(() => {
    setShowRouter(true);
  }, []);

  return (
    <>
      {showRouter &&
        <ChatProvider>
          <RouterProvider router={router} />
        </ChatProvider>
      }
    </>
  );
}

export default App
