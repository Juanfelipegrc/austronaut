import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useActiveChat, useAuth } from '../hooks';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const Message = ({ message }) => {
  const { darkMode } = useAuth();
  const {loadingResponse} = useActiveChat();

  return (
    <div 
      className={`${loadingResponse.state && message.sender === 'austronaut' && message.id === loadingResponse.idAustronaut? 'hidden' : ''} ${message.sender === 'user' ? 
        'self-end bg-gray-100 dark:bg-[#202129] p-5 rounded-xl lg:max-w-[75%] max-w-[80%]' 
        : 'self-start max-w-[100%]'} text-[#333333] dark:text-white transition-all animate__animated animate__fadeIn`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={darkMode ? materialDark : materialLight}
                language={match[1]}
                className='custom-scrollbar'
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={`${darkMode ? 'bg-[#1e1f26] text-white' : 'bg-gray-200 text-black'} p-1 rounded-md`} {...props}>
                {children}
              </code>
            );
          }
        }}
      >
        {message.message}
      </ReactMarkdown>
      
    </div>
  );
};
