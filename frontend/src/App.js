import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { SnackbarProvider } from 'notistack';

import theme from './theme';
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import Routes from './AppRoutes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Provides consistent baseline styles */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SnackbarProvider 
          maxSnack={3} 
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <div className="App min-h-screen" style={{ backgroundColor: theme.palette.background.default }}>
            <BrowserRouter>
              <AuthProvider>
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <Routes />
                </div>
              </AuthProvider>
            </BrowserRouter>
          </div>
        </SnackbarProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;