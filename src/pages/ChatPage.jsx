import React from 'react'
import { ChatInput } from '../components'
import { useActiveChat } from '../hooks'


export const ChatPage = () => {

  const {messages} = useActiveChat();


  return (
    <>
    


        <div className='w-full py-20 flex transition-all h-full justify-center items-center bg-white dark:bg-[#121417]'>
        
          {
            messages?.length === 0?
            <h1 className='font-medium text-3xl text-[#1E1F26] dark:text-[#EDEDED]'>I'll help with anything</h1>

            :
            <div className='w-full h-full flex flex-col gap-11 p-8 pb-20 overflow-y-scroll'>
              {messages.map((message, index) => (
                <p key={index} className={`${message.sender === 'user'? 'self-end' : 'self-start'} font-medium text-[#333333] dark:text-white max-w-[60%]`}>{message.message}</p>

              ))}
            </div>
          }

          <ChatInput/>

        </div>
    
    </>
  )
}
