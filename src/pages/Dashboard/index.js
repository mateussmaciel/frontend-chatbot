import React, {useEffect, useState} from 'react';
import api from '../../services/api';

import {Form, User, Watson, Container, Content} from './style';


const Dashboard = () => {
  const [inputError, setInputError] = useState('');
  const[message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {scrollWin()}, [chat])
  function scrollWin() {
    var elmnt = document.getElementById("A");
    elmnt.scrollTop = Number.MAX_SAFE_INTEGER
    
  }

  async function EncerraSession(){
    setChat([])
    setMessage('')
    await api.get('/kill-session')    
  }

  async function handleSendMessage(event){
    event.preventDefault();
    try{ 
      const messagesUser = chat;
      messagesUser.push({message: message, who: 'user'})
      setChat([...chat, messagesUser]);      
      const response = await api.post('/', {message: message});
      const responseMessage = response.data;
      const messagesWatson = chat;      
      let parsed = new DOMParser();
      let msg = parsed.parseFromString(responseMessage, "text/html").body.innerHTML.replaceAll('<br>','<br/>');
      let msg2 = msg.replaceAll("\\n", '<br/>')
      messagesWatson.push({message:msg2, who: 'watson'})
      setChat([...chat, messagesWatson]);
      setMessage('');
      setInputError('');
    }catch(err){
      setInputError('Erro!');
    }    
  }
  return (
    <Container>
    <Content>
      <div style={{display:'flex',flexDirection:'column',width:'48%', maxHeight: '650px', overflow: 'auto', alignSelf:'flex-end', position:'absolute', bottom:23}}>
        <div id="A" style={{display:'flex',flexDirection:'column', maxHeight: '530px', overflow: 'auto', width:'auto'}}>
          {
           chat && Array.isArray(chat[chat.length-1]) ? chat.slice(chat.length-1, 1) : ""
          }
          {chat.map((item, index) => (
            item.who === 'user'
            ? <User key={index} > {item.message} </User> 
          : Array.isArray(item) ? "" : <Watson key={index}><div key={index} dangerouslySetInnerHTML={{__html:item.message}}/></Watson>
          ))}
        </div>
        <Form hasError={!! inputError} onSubmit={handleSendMessage}>
          <input
            id="inputMessage"
            value={message}
            onChange={(e ) => setMessage(e.target.value)}
            placeholder="Escreva uma mensagem"         
           />
          <button type="submit" >Enviar</button>
        </Form>
      </div>
      
      <div style={{display:'flex', flexDirection:'column',width:'48%', marginLeft:'20px', maxHeight: '655px'}}>
      <h1>
      Consultor Tecnológico
      </h1>
      <h4 style={{lineHeight: 1.5, overflow: 'auto', maxHeight: '550px', paddingRight:'10px'}}>
      <button type="button" onClick={() => EncerraSession()} >Encerrar sessão</button>
      <p align="justify">O nosso chatbot tem como objetivo te ajudar a sanar dúvidas
quanto a compra de um novo eletronico, seja ele um celular,
notebook, tablet, smartwatch ou um novo computador.</p>
      <p>Você pode me perguntar coisas como: </p>
      <p align="justify">Ajuda 
Quero comprar um celular / notebook / tablet / smartwatch
Quero uma analise de um  celular / notebook / tablet / smartwatch 
Quero montar/comprar um computador intel/amd  </p>
<p align="justify">O botão encerrar sessão é caso eu não consiga responder 
suas dúvidas mais malucas e filosóficas, no caso disso 
acontecer não tenha dúvida em clicar.</p>
<p align="justify">Espero que consiga te ajudar nessa jornada.</p>

      </h4>
      </div>
      
      
      </Content>
    </Container>
  );
}

export default Dashboard;
