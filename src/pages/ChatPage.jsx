import React from 'react'
import { ChatInput } from '../components'
import { useActiveChat } from '../hooks'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


export const ChatPage = () => {

  const {messages, loadingResponse} = useActiveChat();


  return (
    <>
    


        <div className='w-full flex transition-all h-full justify-center items-center bg-white dark:bg-[#121417]'>
        
          {
            messages?.length === 0?
            <h1 className='font-medium text-3xl text-[#1E1F26] dark:text-[#EDEDED]'>I'll help with anything</h1>

            :

              !loadingResponse?

              <div className='w-full h-full flex flex-col gap-11 p-8 pt-28 pb-48 overflow-y-scroll'>
                {messages.map((message, index) => (
                  <ReactMarkdown 
                    key={index}
                    remarkPlugins={[remarkGfm]} 
                    className={`${message.sender === 'user'? 'self-end' : 'self-start'} text-[#333333] dark:text-white lg:max-w-[60%] max-w-[80%] transition-all`}>
                      {message.message}
                  </ReactMarkdown>

                ))}
              </div>
              :
              <h1 className='font-semibold text-[#333333] dark:text-white text-8xl text-center'>Thinking</h1>

            }

          <ChatInput/>

        </div>
    
    </>
  )
}
