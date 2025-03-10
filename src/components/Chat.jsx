import React, { useState, useEffect, useRef } from 'react';
import {
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SendIcon from '@mui/icons-material/Send'; // Importa el ícono de avión de papel
import { toast } from 'react-toastify';
import { getUserFriendList } from '../api'; // Importa desde el archivo index.js
import { getErrorMessage } from '../utils/errorUtils';

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null); // Referencia al final del contenedor de mensajes

  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true);
      const result = await getUserFriendList();
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

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setExpanded(true);
    setMessages([
      { id: 1, sender: user, text: 'Hola, ¿cómo estás?' },
      { id: 2, text: '¡Hola! Estoy bien, ¿y tú?' },
    ]);
  };

  // Efecto para desplazar el contenedor hacia abajo cuando se añade un mensaje
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]); // Se ejecuta cada vez que `messages` cambia

  //desplazamiento suave
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        text: newMessage,
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const toggleChat = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {/* Pestaña para expandir/contraer */}
      <IconButton
        onClick={toggleChat}
        sx={{
          position: 'fixed',
          right: expanded ? '300px' : '64px', // Ajusta la posición según el estado de expansión
          top: '0,5%',
          transform: 'translateY(-50%)',
          zIndex: 1200,
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '4px 0 0 4px',
          transition: 'right 0.3s',
          width: '32px', // Ancho fijo
          height: '32px', // Alto fijo
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&:hover': {
            backgroundColor: '#f5f5f5', // Cambia el color al pasar el mouse
          },
        }}
      >
        {expanded ? <ArrowForwardIcon /> : <ArrowBackIcon />}
      </IconButton>

      {/* Drawer del chat */}
      <Drawer
        anchor="right"
        variant="permanent"
        sx={{
          width: expanded ? '300px' : '64px',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: expanded ? '300px' : '64px',
            transition: 'width 0.3s',
          },
        }}
      >
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
          <Box
            sx={{
              padding: '16px',
              display: 'flex',
              flexDirection: 'column', 
              height: '40vh', // Altura fija para el contenedor principal
              position: 'fixed',
              bottom: 0,
              right: expanded ? '0' : '-236px',
              width: expanded ? '300px' : '64px',
              backgroundColor: 'white',
              zIndex: 1000,
              transition: 'right 0.3s, width 0.3s',
              boxSizing: 'border-box', // Asegura que el padding no afecte el ancho total
            }}
          >
            {/* Título del chat */}
            <Typography
              variant="subtitle1"
              sx={{
                marginBottom: '16px',
                whiteSpace: 'nowrap', // Evita que el texto se divida en varias líneas
                overflow: 'hidden', // Oculta el texto que se desborda
                textOverflow: 'ellipsis', // Muestra "..." si el texto es demasiado largo
              }}
            >
              Chat con {selectedUser}
            </Typography>

            {/* Área de mensajes */}
            <Box
              sx={{
                //flexGrow: 1,
                overflowY: 'auto', // Permite el desplazamiento vertical
                marginBottom: '16px',
                width: '100%',
                height: '200px', // Alto fijo
                //maxHeight: '120px', 
              }}
              ref={messagesEndRef} // Referencia para el desplazamiento
            >
              {messages.map((message) => (
                <Box
                  key={message.id}
                  sx={{
                    display: 'flex',
                    justifyContent: message.sender === undefined ? 'flex-end' : 'flex-start',
                    marginBottom: '8px',
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      padding: '8px',
                      borderRadius: '8px',
                      backgroundColor: message.sender === undefined ? '#1976d2' : '#f5f5f5',
                      color: message.sender === undefined ? '#fff' : '#000',
                      maxWidth: '80%',
                      wordWrap: 'break-word',
                    }}
                  >
                    {message.text}
                  </Box>
                </Box>
              ))}
              <div ref={messagesEndRef} /> {/* Punto de referencia para el desplazamiento suave */}
            </Box>

            {/* Área de entrada de texto */}
            <Box
              sx={{
                display: 'flex',
                gap: '8px',
                width: '100%',
                alignItems: 'center',
              }}
            >
              <TextField
                fullWidth
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Escribe un mensaje..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                sx={{
                  flexGrow: 1,
                }}
              />
              <IconButton
                onClick={handleSendMessage}
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'white',
                  borderRadius: '8px',
                  width: '40px',
                  height: '40px',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                }}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        )}
      </Drawer>
    </>
  );
};

export default Chat;