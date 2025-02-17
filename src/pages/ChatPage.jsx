import React from 'react'
import { ChatInput, Message } from '../components'
import { useActiveChat } from '../hooks'



export const ChatPage = () => {

  const {messages, loadingResponse} = useActiveChat();


  return (
    <>
    


        <div className='w-full flex transition-all h-full pb-20 justify-center items-center bg-white dark:bg-[#121417]'>
        
          {
            messages?.length === 0?
            <h1 className='font-medium text-3xl text-[#1E1F26] dark:text-[#EDEDED]'>I'll help with anything</h1>

            :

              !loadingResponse?

              <div className=' w-[82%] lg:w-[70%] h-[75%] flex flex-col gap-11 pe-3 overflow-y-scroll custom-scrollbar'>
                {messages?.map((message, index) => (
                  
                  <Message key={index} message={message}/>

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
