import React, { useEffect, useRef } from 'react'
import { ChatInput, Message } from '../components'
import { useActiveChat } from '../hooks'



export const ChatPage = () => {

  const {messages, loadingResponse, id} = useActiveChat();

  const messagesContainerRef = useRef(null);



  useEffect(() => {
    
    if(messagesContainerRef.current) {
      setTimeout(() => {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }, 800);

    }

  }, [id, messages?.length])

  


  return (
    <>
    


        <div className='w-full flex transition-all h-full pb-20 justify-center items-center bg-white dark:bg-[#121417]'>
        
          {
            messages?.length === 0?
            <h1 className='font-medium text-3xl text-[#1E1F26] dark:text-[#EDEDED]'>I'll help with anything</h1>

            :

              <div 
                className=' w-[82%] lg:w-[70%] h-[75%] flex flex-col gap-11 pe-3 overflow-y-scroll custom-scrollbar'
                ref={messagesContainerRef}
                >
                {
                

                
                messages?.map((message, index) => (
                  
                  <React.Fragment key={index}>               
                    <Message message={message}/>
                    <h1 
                      className={`font-semibold animate__animated animate__fadeIn text-[#333333] dark:text-[#EDEDED] text-xl text-start ${loadingResponse.state && message.sender === 'user' && message.id === loadingResponse.idUser? '' : 'hidden'}`}
                      key={index}
                    >
                      Thinking...
                    </h1>
                  
                  </React.Fragment>

                ))
                
                
                
                }
              </div>
              
              

            }

          <ChatInput/>

        </div>
    
    </>
  )
}
