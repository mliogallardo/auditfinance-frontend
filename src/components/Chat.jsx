import React, { useState } from 'react';
import { Drawer, IconButton, Typography } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

const Chat = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Drawer anchor="right" variant="permanent" open={isOpen}>
      <IconButton onClick={toggleChat}>
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </IconButton>
      {isOpen && <Typography variant="h6">Chat</Typography>}
    </Drawer>
  );
};

export default Chat;