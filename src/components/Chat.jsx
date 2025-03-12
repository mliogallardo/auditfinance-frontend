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
  Box,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SendIcon from '@mui/icons-material/Send'; // Importa el ícono de avión de papel
import { toast } from 'react-toastify';
import { getUserFriendList, getPrivateChat, sendMensaje } from '../api'; // Importa desde el archivo index.js
import { getErrorMessage } from '../utils/errorUtils';

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);//correo
  const [usuarioInterlocutor, setUsuarioInterlocutor] = useState(null);//objeto con todos los campos de usuario (uuid, correo, nombre, etc)
  const [messagesChat, setMessagesChat] = useState([]);
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

  useEffect(() => {
    const fetchChat = async (usuarioInterlocutor) => {
      setLoading(true);
      const result = await getPrivateChat(usuarioInterlocutor);
      if (result.success) {
        //usuarioInterlocutor y chat
        setUsuarioInterlocutor(result.data.usuarioInterlocutor)
        setMessagesChat(result.data.chat);
      } else {
        const errorMessage = getErrorMessage(result.error);
        toast.error(`Error cargando conversación: ${errorMessage}`);
      }
      setLoading(false);
    };

    if (selectedUser!==null && selectedUser !== undefined){
      fetchChat(selectedUser);
    }
  }, [selectedUser]); // Se ejecuta cada vez que cambia el selectedUser

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setExpanded(true);
  };

  // Efecto para desplazar el contenedor hacia abajo cuando se añade un mensaje
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messagesChat]); // Se ejecuta cada vez que `messages` cambia

  //desplazamiento suave
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messagesChat]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      /*const message = {
        text: newMessage,
      };*/
    
      console.log('Enviando mensaje')
      const result = await sendMensaje({
        mailReceptor: selectedUser,
        mensaje: newMessage,
      });
      if (result.success) {
        const message = result.data.data.mensaje;
        console.log('se ha enviado el mensaje. campos '+Object.keys(message))
        setMessagesChat([...messagesChat, message]);
        setNewMessage('');
      } else {
        const errorMessage = getErrorMessage(result.error);
        toast.error(`Error cargando conversación: ${errorMessage}`);
      }
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
              {messagesChat.map((lineaChat) => (
                <Box
                  key={lineaChat.id}
                  sx={{
                    display: 'flex',
                    justifyContent: lineaChat.emisorId !== usuarioInterlocutor.id ? 'flex-end' : 'flex-start',
                    marginBottom: '8px',
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      padding: '8px',
                      borderRadius: '8px',
                      backgroundColor: lineaChat.emisorId !== usuarioInterlocutor.id ? '#1976d2' : '#f5f5f5',
                      color: lineaChat.emisorId !== usuarioInterlocutor.id ? '#fff' : '#000',
                      maxWidth: '80%',
                      wordWrap: 'break-word',
                    }}
                  >
                    {lineaChat.mensaje}
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