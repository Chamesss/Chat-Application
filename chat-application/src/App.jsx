import Login from './pages/Login';
import Register from './pages/Register';
import Application from './pages/Application';
import RequireAuth from './utils/RequireAuth'
import RequireNoAuth from './utils/RequireNoAuth'
import Layout from './Layouts/Layout';
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate
} from 'react-router-dom'

import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { useThemeContext } from './contexts/themeContext';
import { getDesignTokens } from './styles/palette'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        {/* public routes but not accessible for private */}
        <Route path="/" element={<RequireNoAuth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
        {/* private routes */}
        <Route path="/" element={<RequireAuth />}>
          <Route path="application" element={<Application />} />
        </Route>
      </Route>
    </Route>
  )
)

function App() {
  const { mode } = useThemeContext();
  const theme = createTheme(getDesignTokens(mode));

  return (
    <MuiThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </MuiThemeProvider>
  );
}

export default App
