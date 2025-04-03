/// <reference types="webextension-polyfill" />
import browser from "webextension-polyfill";

// Background script for the extension - handles communication with the inspected page

// Define message types
interface DevtronMessage {
  type: string;
  [key: string]: any;
}

// Listen for messages from content script or panel
browser.runtime.onMessage.addListener(
  (
    message: any, 
    sender: browser.Runtime.MessageSender, 
    sendResponse: (response?: any) => void
  ) => {
    console.log('Message received in background:', message as DevtronMessage);
    
    // Handle different message types
    if ((message as DevtronMessage).type === 'init') {
      sendResponse({ success: true });
    }
    
    // Return true to indicate async response
    return true;
  }
);
