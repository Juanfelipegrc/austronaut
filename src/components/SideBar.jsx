import React, { useEffect, useState } from 'react'
import {slide as Menu} from 'react-burger-menu'
import { PrincipalLogoDark, PrincipalLogoLight } from '../assets';
import { useAuth } from '../hooks';
import { LoginRegisterButton } from './LoginRegisterButton';
import { NewChatButton } from './NewChatButton';
import { ChatsBox } from './ChatsBox';

export const SideBar = () => {

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(false);
  const {darkMode, status} = useAuth();


  useEffect(() => {
    
    const handleScreenWidth = () => {
      setScreenWidth(window.innerWidth)
    };

    window.addEventListener('resize', handleScreenWidth);
  
    return () => {
      window.removeEventListener('resize', handleScreenWidth);
    }
  }, [window.innerWidth])


  useEffect(() => {
    if(status === 'not-authenticated') {
      setIsOpen(false);
    }
  }, [status])
  


  return (
    <>
    

      {
        screenWidth < 1024?
          <>



            <svg 
              xmlns="http://www.w3.org/2000/svg"
              height="2.2rem" 
              viewBox="0 -960 960 960" 
              width="2.2rem" 
              fill={darkMode? '#F4F6F8' : '#333333'}
              className='fixed left-3 top-3'
              onClick={() => setIsOpen(true)}
              >
                <path d="M120-240v-80h240v80H120Zm0-200v-80h480v80H120Zm0-200v-80h720v80H120Z"/>
            </svg>

            <Menu 
              isOpen={isOpen} 
              className='bg-[#F4F6F8] dark:bg-[#1E1F26]'
              onStateChange={({isOpen}) => setIsOpen(isOpen)}
            >

              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                height="1.2rem" viewBox="0 -960 960 960" 
                width="1.2rem" 
                fill={darkMode? '#F4F6F8' : '#1E1F26'}
                className='absolute right-4 top-6'
                onClick={() => setIsOpen(false)}
                >
                  <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/>
              </svg>

              <div className='w-full h-full flex flex-col items-center'>
              {/* HEADER */}
                <img className='w-[6rem] h-[6rem] mt-4' src={darkMode? PrincipalLogoDark : PrincipalLogoLight} alt="austronaut-logo" />

                <h1 className='text-center mb-7 text-[1.2rem] mt-5 font-orbitron font-bold text-[#333333] dark:text-[#EDEDED]'>AUSTRONAUT</h1>
              {/* HEADER */}

                <NewChatButton/>

                <ChatsBox/>


                <LoginRegisterButton/>
              </div>

            </Menu>

          </>
        :
          <>

            <div className='w-[18rem] relative bg-[#F4F6F8] transition-all dark:bg-[#1E1F26] h-full flex flex-col items-center'>

            {/* HEADER */}
              <img className='w-16 h-16 mt-4' src={darkMode? PrincipalLogoDark : PrincipalLogoLight} alt="austronaut-logo" />

              <h1 className='text-center text-xl mt-3 mb-11 font-orbitron font-bold text-[#333333] dark:text-[#EDEDED]'>AUSTRONAUT</h1>
            {/* HEADER */}

              <NewChatButton/>

              <ChatsBox/>



              <LoginRegisterButton/>              

            </div>

          </>
      }  
        
    
    </>
  )
}
