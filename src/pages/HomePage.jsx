import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';
import TopBar from '../components/TopBar';
import MainContent from '../components/MainContent';

const HomePage = () => {
  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <TopBar currentRoute="Dashboard" />
      <Box display="flex" flexGrow={1}>
        <Sidebar />
        <MainContent />
        <Chat />
      </Box>
    </Box>
  );
};

export default HomePage;