import { useState } from 'react';
import './App.css'

import { CallIcon } from './assets/components/Call_icon';
import { LogoIcon } from './assets/components/Logo_icon';

function App() {
  
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");


  return (
    <>
      <nav>
        <div className='logo'>
          <LogoIcon></LogoIcon>
          <div>
            <p id='logoHead'>Direct Dial</p>
            <p id='logoText'>Solutions</p>
          </div>
          
        </div> 
      </nav>

      <div id='textContent'>
        <p id='title'>Voice AI for Calling.</p>
      </div>

      <div className='box'>
      <div>
          <label>Phone no.</label>
          <input type='number' placeholder='+91' onChange={(e)=>{
            setPhone(e.target.value)
          }}></input>
        </div>
        
        <div>
          <label>Message</label>
          <textarea onChange={(e)=>{
            setMsg(e.target.value)
          }}></textarea>
        </div>
        <Call phone={phone} msg={msg}></Call>
        
      </div>
      
  </>

)}

function Call({phone, msg}){
  const auth_token = 'db2940f4-fb54-44d9-b4d1-4c6a367da27f';
  const phone_number_id = '63810e4a-a558-4cdd-b233-9a50dc2ef288'
  const customer_number = "+91 " + phone;

  const headers = {
    'Authorization': `Bearer ${auth_token}`,
    'Content-Type': 'application/json',
  }

  const data = {
    'assistant': {
        "firstMessage": msg,
        "model": {
            "provider": "openai",
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "system",
                    "content": "You are an assistant."
                }
            ]
        },
        "voice": "jennifer-playht",
    },
    "assistantId": "e18c3847-a2cf-493e-9aed-ec7cf54a891b",
    'phoneNumberId': phone_number_id,
    'customer': {
        'number': customer_number,
    },
}



  return <>
    <button onClick={()=>{
      fetch('https://api.vapi.ai/call/phone', {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
        })
        .then(()=>{
          console.log("DONE");
        })
    }}>
      <div className='btnContent'>
        <p>Call</p>
        <CallIcon></CallIcon>
    </div></button>
  </>
}

export default App
