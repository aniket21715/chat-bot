// App.js
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

const sendMessage = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:5000/chat', {
      message: userInput
    });
    const aiResponse = response.data.message;
    setMessages([...messages, { text: userInput, user: true }, { text: aiResponse, user: false }]);
    setUserInput('');
  } catch (error) {
    console.error('Error sending message:', error);
  }
};


  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim() !== '') {
      sendMessage();
    }
  };

  return (
    <div>
      <h1>Chatbot</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.user ? <p>You: {msg.text}</p> : <p>Chatbot: {msg.text}</p>}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={userInput} onChange={handleChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default App;
