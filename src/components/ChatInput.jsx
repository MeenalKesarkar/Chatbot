import { useState } from 'react';
import './ChatInput.css';

function getBotResponse(input) {
  const text = input.toLowerCase();

  if (text.includes('hi') || text.includes('hello')) {
    return 'Hello! 😊';
  }

  if (text.includes('date')) {
    const today = new Date();
    return `Today is ${today.toDateString()}`;
  }

  if (text.includes('time')) {
    const now = new Date();
    return `Current time is ${now.toLocaleTimeString()}`;
  }

  if (text.includes('bye')) {
    return 'Goodbye! 👋';
  }

  return "I don't understand, but I'm learning 🤖";
}

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function sendMessage() {
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ];

    setChatMessages(newChatMessages);

    const response = getBotResponse(inputText);

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);

    setInputText('');
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        value={inputText}
        className="chat-input"
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
    </div>
  );
}