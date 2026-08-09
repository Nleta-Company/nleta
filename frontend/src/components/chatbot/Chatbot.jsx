import React, { useState } from 'react';
import './Chatbot.css';

const responses = {
  lift: 'We provide comprehensive lift testing, inspection, and certification services according to IS 4591 standards.',
  escalator: 'Our escalator services include testing, inspection, and certification as per IS 14665 standards.',
  service: 'We offer Testing, Inspection, Certification, and Training Services for lifts, escalators, and travelators across India.',
  contact: 'You can reach us at info@nleta.org.in or call +91 9990029597.',
  certification: 'We provide nationally recognized certifications backed by ISO 9001, ISO 14001, and OHSAS 18001 accreditations.',
  training: 'We offer specialized training programs including mock drills and emergency training.',
  inspection: 'Our inspection services cover all safety and standard compliances with online report access.',
  standard: 'We follow BIS standards including IS 4591 for lifts and IS 14665 for escalators.',
  default: 'Thank you for your question. Please contact us at info@nleta.org.in or call +91 9990029597 for more details.',
};

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: 'bot', text: "Hello! I'm here to help with questions about lifts, escalators, and our services." }]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    const lower = input.toLowerCase();
    let reply = responses.default;
    for (let key in responses) {
      if (lower.includes(key)) { reply = responses[key]; break; }
    }
    setMessages(prev => [...prev, userMsg, { from: 'bot', text: reply }]);
    setInput('');
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-toggle" onClick={() => setOpen(!open)}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L2 22l5.71-.97C9 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.38 0-2.68-.31-3.85-.85l-.27-.14-2.83.48.48-2.83-.14-.27C4.31 14.68 4 13.38 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/>
          <circle cx="8" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="16" cy="12" r="1.5"/>
        </svg>
      </button>
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div>
              <h3>NLETA Assistant</h3>
              <span>Ask about lifts &amp; escalators</span>
            </div>
            <button onClick={() => setOpen(false)}>&times;</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.from}`}>{msg.text}</div>
            ))}
          </div>
          <div className="chatbot-input">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendMessage()} placeholder="Type your message..." />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
