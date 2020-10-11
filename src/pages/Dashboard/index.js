import React, {useState, useEffect} from 'react';
import api from '../../services/api';

import {Title, Form, User, Watson} from './style';


const Dashboard = () => {
  const [inputError, setInputError] = useState('');
  const[message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  async function handleSendMessage(event){
    event.preventDefault();
    try{ 
      const messagesUser = chat;
      messagesUser.push({message: message, who: 'user'})
      setChat([...chat, messagesUser]);      
      const response = await api.post('/', {message: message});
      const responseMessage = response.data;
      const messagesWatson = chat;
      messagesWatson.push({message: responseMessage.message, who: 'watson'})
      setChat([...chat, messagesWatson]);      
      setMessage('');
      setInputError('');
    }catch(err){
      setInputError('Erro!');
    }    
  }
  return (
    <>
      <Title>
        Envie uma mensagem para o chatbot watson!
      </Title>
      <Form hasError={!! inputError} onSubmit={handleSendMessage}>
        <input
          value={message}
          onChange={(e ) => setMessage(e.target.value)}
          placeholder="Escreva uma mensagem"         
         />
        <button type="submit">Enviar</button>
      </Form>
      {
       chat && Array.isArray(chat[chat.length-1]) ? chat.slice(chat.length-1, 1) : ""
      }
      {chat.map((item, index) => (
        item.who === 'user'
        ? <User key={index}> {item.message} </User>
        : Array.isArray(item) ? "" :<Watson key={index}> {item.message} </Watson>
      ))}
    </>
  );
}

export default Dashboard;
