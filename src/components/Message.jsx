import React from 'react'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const Message = ({message}) => {
  return (
    <>
    
    <ReactMarkdown 
        remarkPlugins={[remarkGfm]} 
        className={`${message.sender === 'user'? 'self-end bg-gray-100 dark:bg-[#202129] p-5 rounded-xl' : 'self-start'} text-[#333333] dark:text-white lg:max-w-[80%] max-w-[80%] transition-all animate__animated animate__fadeIn`}
    >
        {message.message}
    </ReactMarkdown>
    
    </>
  )
}
