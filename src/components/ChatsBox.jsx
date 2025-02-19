import React, { useState } from 'react'
import { useActiveChat, useAuth } from '../hooks'

export const ChatsBox = () => {

  const {chats, darkMode} = useAuth();
  const {onSetActiveChat, id, title, deleteChat} = useActiveChat();



  return (
    <>
    
    
        <div className={`flex flex-col ${chats?.length > 0? 'gap-1' : 'justify-center'} items-center w-full h-full mt-10`}>


            {
              chats?.length > 0?
              
              <>

              <h1 className='ps-12 lg:ps-8 font-semibold text-[1rem] dark:text-[#EDEDED] text-[#333333] text-start w-full'>CHATS:</h1>
              
              {chats?.map((chat, index) => (
                <div 
                  key={index} 
                  onClick={() => chat.id === id? {} : onSetActiveChat(chat)}
                  className={`w-[80%] relative flex ps-5 ms-8 lg:ms-0 items-center animate__animated animate__fadeIn p-2 rounded-xl transition-all cursor-pointer ${chat.id === id? 'bg-gray-200 dark:bg-[#121417] justify-between' : 'hover:bg-gray-200 dark:hover:bg-[#121417] justify-start'}`}
                >
                  <p className=' text-[0.85rem] dark:text-[#EDEDED] text-[#333333]'>{chat.title?.length > 20? `${chat.title.substring(0, 20)}...` : chat.title}</p>

                  

                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    height="1.2rem" 
                    viewBox="0 -960 960 960" 
                    width="1.2rem" 
                    fill={darkMode? '#EDEDED' : '#333333'}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChat(chat.id)
                      
                    }}
                    className={`${chat.id === id? title?.length > 0? '' : 'hidden' : 'hidden'}`}>
                      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                  </svg>
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
