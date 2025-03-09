import React, { useState, useEffect } from 'react'; import {
  Drawer,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  CircularProgress,
  TextField,
  Button,
  Box,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { getUserFriendList } from '../api'; // Importa desde el archivo index.js
import { getErrorMessage } from '../utils/errorUtils';

const Chat = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [users, setUsers] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true);
      const result = await getUserFriendList();
      /*    result.put("success", true);
            result.put("friends", commonFriendsList);
            result.put("enviadas", enviadasList);
            result.put("recibidas", recibidasList);
            result.put("blocked", blockList);*/
      if (result.success) {
        setUsers(result.data.friends); // Asume que result.data es un array de usuarios
      } else {
        const errorMessage = getErrorMessage(result.error);
        toast.error(`Error en el chat: ${errorMessage}`);
      }
      setLoading(false);
    };
    fetchFriends();

  }, []);

  // Seleccionar un usuario y cargar sus mensajes (simulado)
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setExpanded(true);
    // Simular la carga de mensajes previos
    setMessages([
      { id: 1, sender: user, text: 'Hola, ¿cómo estás?' },
      { id: 2, text: '¡Hola! Estoy bien, ¿y tú?' },
    ]);
  };
  // Enviar un mensaje
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        text: newMessage
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setExpanded(false); // Resetear el estado de expansión al cerrar el chat
  };


  return (
    <Drawer
      anchor="right"
      variant="permanent"
      open={isOpen}
      sx={{
        width: expanded ? '300px' : '64px',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: expanded ? '300px' : '64px',
          transition: 'width 0.3s',
        },
      }}
    >
      <IconButton onClick={() => setIsOpen(!isOpen)} sx={{ margin: '8px' }}>
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </IconButton>
      {isOpen && (
        <>
          <Typography variant="h6" sx={{ padding: '16px' }}>
            Chat
          </Typography>
          {loading ? (
            <CircularProgress sx={{ margin: '16px' }} />
          ) : (
            <List>
              {users.map((user) => (
                <ListItem button key={user.id} onClick={() => handleUserClick(user)}>
                  <ListItemAvatar>
                    <Avatar>{user[0]}</Avatar>
                  </ListItemAvatar>
                  {expanded && <ListItemText primary={user} />}
                </ListItem>
              ))}
            </List>
          )}
          {expanded && selectedUser && (
            <Box sx={{ padding: '16px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle1" sx={{ marginBottom: '16px' }}>
                Chat con {selectedUser.username}
              </Typography>
              <Box sx={{ flexGrow: 1, overflowY: 'auto', marginBottom: '16px' }}>
                {messages.map((message) => (
                  <Box
                    key={message.id}
                    sx={{
                      display: 'flex',
                      justifyContent: message.sender === undefined ? 'flex-end' : 'flex-start', // Alineación
                      marginBottom: '8px',
                    }}
                  >
                    <Box
                      sx={{
                        padding: '8px',
                        borderRadius: '8px',
                        backgroundColor: message.sender === undefined ? '#1976d2' : '#f5f5f5', // Fondo
                        color: message.sender === undefined ? '#fff' : '#000', // Color del texto
                      }}
                    >
                      {message.text}
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box sx={{ display: 'flex', gap: '8px' }}>
                <TextField
                  fullWidth
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button variant="contained" onClick={handleSendMessage}>
                  Enviar
                </Button>
              </Box>
            </Box>
          )}
        </>
      )}
    </Drawer>
  );
};
export default Chat;