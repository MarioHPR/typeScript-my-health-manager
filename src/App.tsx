import React from 'react';
import {BrowserRouter as Router } from 'react-router-dom';
import AppProvider from './contexts';
import Routes from './routes';
import 'react-toastify/dist/ReactToastify.min.css';
import {toast} from "react-toastify";

toast.configure()
const App: React.FC = () => {
  return (
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>
    </Router>
  );
}

export default App;
