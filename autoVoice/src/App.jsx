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
          <p>AutoVoice</p>
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
  const auth_token = '487ff42e-7ba7-4615-a3d9-f32383adb5e8';
  const phone_number_id = '6278b486-8fea-430a-88fe-4d244b6c31d3'
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
    "assistantId": "1e07a3cc-5011-414e-a674-6bdaa22be71c",
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
        <p>Make a Call</p>
        <CallIcon></CallIcon>
    </div></button>
  </>
}

export default App
