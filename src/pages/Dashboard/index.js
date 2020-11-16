import React, {useEffect, useState} from 'react';
import api from '../../services/api';

import {Form, User, Watson, Container, Content} from './style';


const Dashboard = () => {
  const [inputError, setInputError] = useState('');
  const[message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [enabledButtom, setEnabledButtom] = useState(true);

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
        Consultor Tecnológico Watson Assistent
      </h1>
      <h4 style={{lineHeight: 1.5, overflow: 'auto', maxHeight: '550px', paddingRight:'10px'}}>
      <button type="button" onClick={() => EncerraSession()} >Encerrar sessão</button>
      <p align="justify">Cras ut urna laoreet orci gravida maximus. Phasellus venenatis dapibus lobortis. Fusce efficitur pharetra aliquet. Morbi consequat tortor eros, gravida commodo erat dapibus pretium. Sed lacinia nec purus sed tempus. Donec at porttitor velit, lobortis fermentum velit. Phasellus turpis nisl, auctor in lobortis vitae, rhoncus lacinia sem. Nunc dolor sapien, varius quis malesuada quis, vestibulum ac tellus.</p>
      <p align="justify">Sed at mi in ex feugiat tristique. Morbi id congue nulla. Praesent eleifend tincidunt purus a laoreet. Vivamus a lorem nisl. Sed mollis feugiat diam ac gravida. Vivamus sit amet dolor odio. Etiam auctor, lorem eget accumsan accumsan, sapien lectus scelerisque risus, nec consequat orci turpis et purus. Donec sollicitudin posuere arcu, quis faucibus sapien bibendum sit amet. Proin dui purus, volutpat vitae consectetur a, finibus non quam. Integer laoreet, nulla eget sodales bibendum, tortor arcu ornare eros, id rhoncus mi mauris in lacus. Ut ultricies erat non tortor ultrices tempor. Aliquam tempor vitae metus lobortis fringilla. Nam sed convallis mi, at faucibus urna. Cras et ullamcorper dui, sed vehicula tellus.</p>

      </h4>
      </div>
      
      
      </Content>
    </Container>
  );
}

export default Dashboard;
