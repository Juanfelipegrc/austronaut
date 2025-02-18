import React from 'react'
import { useActiveChat, useAuth } from '../hooks'

export const ChatsBox = () => {


  const {chats} = useAuth();
  const {onSetActiveChat, id} = useActiveChat();


  return (
    <>
    
    
        <div className={`flex flex-col ${chats?.length > 0? 'gap-5' : 'justify-center'} items-center w-full h-full mt-10`}>


            {
              chats?.length > 0?
              
              <>

              <h1 className='ps-12 lg:ps-8 font-semibold text-[1rem] dark:text-[#EDEDED] text-[#333333] text-start w-full'>CHATS:</h1>
              
              {chats?.map((chat, index) => (
                <div 
                  key={index} 
                  onClick={() => onSetActiveChat(chat)}
                  className={`w-[80%] flex ps-5 ms-8 lg:ms-0 items-center animate__animated animate__fadeIn p-2 rounded-xl transition-all cursor-pointer ${chat.id === id? 'bg-gray-200 dark:bg-[#121417]' : 'hover:bg-gray-200 dark:hover:bg-[#121417]'}`}
                >
                  <p className=' text-[1rem] dark:text-[#EDEDED] text-[#333333]'>{chat.title}</p>
                </div>
              ))}
              
              </>


              :

              <p className='font-medium dark:text-[#EDEDED] text-[#333333] text-[0.8rem]'>No chats history</p>
            }


        </div>
    
    
    </>
  )
}
