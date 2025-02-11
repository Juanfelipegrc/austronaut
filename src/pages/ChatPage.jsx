import React from 'react'
import { ChatInput } from '../components'


export const ChatPage = () => {

  


  return (
    <>
    


        <div className='w-full flex transition-all h-full justify-center items-center bg-white dark:bg-[#121417]'>
        
          <h1 className='font-medium text-3xl animate-bounce text-[#1E1F26] dark:text-[#EDEDED]'>Welcome to Austronaut</h1>

          <ChatInput/>

        </div>
    
    </>
  )
}
