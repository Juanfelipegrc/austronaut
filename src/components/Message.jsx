import React from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview'
import { useActiveChat, useAuth } from '../hooks';


export const Message = ({ message }) => {
  const { darkMode } = useAuth();
  const {loadingResponse} = useActiveChat();


  return (
    <div 
      className={`${loadingResponse.state && message.sender === 'austronaut' && message.id === loadingResponse.idAustronaut? 'hidden' : ''} ${message.sender === 'user' ? 
        'self-end bg-gray-100 dark:bg-[#202129] p-5 rounded-xl lg:max-w-[75%] max-w-[80%]' 
        : 'self-start max-w-[100%]'} text-[#333333] dark:text-white transition-all animate__animated animate__fadeIn`}
    >
      {
        message.sender === 'austronaut'?
        (
          <MarkdownPreview
            source={message.message}
            className='markdown-preview'
            style={{ 
                backgroundColor: darkMode ? '#121417' : 'white', 
                color: darkMode? '#ffffff' : '#333333'
              }}
          />
        )
        :

        message.message
      }

      
    </div>
  );
};
