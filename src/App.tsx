import React from 'react';
import {BrowserRouter as Router } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';
import AppProvider from './contexts';
import Routes from './routes';
const App: React.FC = () => {
  return (
    <Router>
      <ReactNotification />
      <AppProvider>
        <Routes />
      </AppProvider>
    </Router>
  );
}

export default App;
