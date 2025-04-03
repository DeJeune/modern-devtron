/// <reference types="webextension-polyfill" />
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import browser from "webextension-polyfill";

interface Message {
  id: number;
  type: string;
  channel: string;
  data: any;
  timestamp: number;
}

interface BackgroundMessage {
  type: string;
  data?: Message;
}

// Main App component
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ipc');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    // Initialize connection with background script
    browser.runtime.sendMessage({ type: 'init' })
      .then((response: any) => {
        if (response && response.success) {
          setIsConnected(true);
          console.log('Connected to background script');
        }
      })
      .catch(error => {
        console.error('Connection error:', error);
      });
    
    // Set up message listener
    const messageListener = (message: any) => {
      if (message.type === 'ipc-message' && message.data) {
        setMessages(prev => [...prev, message.data as Message]);
      }
      return true;
    };
    
    browser.runtime.onMessage.addListener(messageListener);
    
    // Initialize tab event listeners
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab') || 'ipc';
        setActiveTab(tabName);
        
        // Update active tab UI
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });
    
    return () => {
      // Cleanup listeners
      browser.runtime.onMessage.removeListener(messageListener);
    };
  }, []);
  
  // Render different content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'ipc':
        return (
          <div className="ipc-container">
            <h2>IPC Messages</h2>
            {messages.length === 0 ? (
              <p>No IPC messages captured yet. Interact with your Electron app to generate messages.</p>
            ) : (
              <table className="ipc-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Channel</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((msg) => (
                    <tr key={msg.id}>
                      <td>{new Date(msg.timestamp).toLocaleTimeString()}</td>
                      <td>{msg.type}</td>
                      <td>{msg.channel}</td>
                      <td>{JSON.stringify(msg.data)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        );
      
      case 'event':
        return (
          <div className="event-container">
            <h2>Event Listeners</h2>
            <p>Event listener monitoring will be implemented soon.</p>
          </div>
        );
        
      case 'dep':
        return (
          <div className="dep-container">
            <h2>Dependencies</h2>
            <p>Dependency visualization will be implemented soon.</p>
          </div>
        );
        
      default:
        return <div>Select a tab</div>;
    }
  };
  
  return (
    <div className="app">
      {!isConnected && (
        <div className="connection-warning">
          Connecting to Electron app...
        </div>
      )}
      {renderContent()}
    </div>
  );
};

// Mount the React app
const root = ReactDOM.createRoot(document.getElementById('content') as HTMLElement);
root.render(<App />); 