import React from 'react'

export const ChatInput = () => {
  return (
    <>
    
        <form className='fixed bottom-10 w-[90%] lg:w-[60%]'>
            <div className='relative'>
                <input 
                    type="text"
                    placeholder='Message Austronaut'
                    className='h-24 w-full shadow-[0_0.1rem_0.6rem_rgba(0,0,0,0.25)] dark:shadow-[0_0.1rem_0.8rem_rgba(255,255,255,0.25)] bg-gray-50 dark:bg-[#F4F6F8] rounded-3xl px-4 placeholder:fixed placeholder:top-5 placeholder-gray-600 focus-visible:outline-0 pb-[1.90rem]' 
                />
                <button className='rounded-full w-9 h-9 flex items-center justify-center absolute right-3 bottom-4 bg-black dark:bg-[#121417] cursor-pointer'>
                
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        height="1.2rem" 
                        viewBox="0 -960 960 960" 
                        width="1.2rem" 
                        fill="#fff"
                        className='me-[0.7px]'
                        >
                            <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z"/>
                    </svg>
                </button>
            </div>
        </form>
    
    </>
  )
}
