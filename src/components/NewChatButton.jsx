import React from 'react'
import { useAuth } from '../hooks'

export const NewChatButton = () => {

    const {darkMode} = useAuth();

  return (
    <>
    
        <div className='w-full py-2 hover:bg-gray-200 dark:hover:bg-[#181b1f] transition-all duration-300 cursor-pointer'>

            <div className='flex ps-12 lg:ps-7 justify-start items-center'>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    height="1.3rem" 
                    viewBox="0 -960 960 960" 
                    width="1.3rem" 
                    fill={darkMode? '#EDEDED' : "#333333"}
                    
                >
                        <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/>
                </svg>

                &nbsp;

                <p className='text-[#333333] dark:text-[#EDEDED] font-medium pb-[0.15rem]'>New Chat</p>
            </div>

        </div>
    
    </>

  )
}
