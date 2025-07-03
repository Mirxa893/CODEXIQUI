import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HeroUIProvider, ToastProvider } from '@heroui/react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Login from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

const App: React.FC = () => {
  return (
    <Router>
      <HeroUIProvider>
        <ToastProvider> {/* FIXED: Now properly wraps children */}
          <ThemeProvider>
            <AuthProvider>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </Layout>
            </AuthProvider>
          </ThemeProvider>
        </ToastProvider>
      </HeroUIProvider>
    </Router>
  );
};

export default App;
