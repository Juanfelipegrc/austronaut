import React, { useEffect, useState } from 'react'
import {slide as Menu} from 'react-burger-menu'
import { PrincipalLogoDark, PrincipalLogoLight } from '../assets';
import { useAuth } from '../hooks';

export const SideBar = () => {

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(false);
  const {darkMode} = useAuth();


  useEffect(() => {
    
    const handleScreenWidth = () => {
      setScreenWidth(window.innerWidth)
    };

    window.addEventListener('resize', handleScreenWidth);
  
    return () => {
      window.removeEventListener('resize', handleScreenWidth);
    }
  }, [window.innerWidth])
  
  console.log(isOpen)

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

            </Menu>

          </>
        :
          <>

            <div className='w-[18rem] relative bg-[#F4F6F8] transition-all dark:bg-[#1E1F26] h-full flex flex-col items-center'>
                  
              <img className='w-16 h-16 mt-4' src={darkMode? PrincipalLogoDark : PrincipalLogoLight} alt="austronaut-logo" />

              <h1 className='text-center text-xl mt-3 font-orbitron font-bold text-[#333333] dark:text-[#EDEDED]'>AUSTRONAUT</h1>

              <div className='absolute w-full hover:bg-gray-200 dark:hover:bg-[#1a1d21] transition-colors flex items-center justify-center py-4 cursor-pointer gap-4 bottom-0'>
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                height="24px" 
                viewBox="0 -960 960 960" 
                width="24px" 
                fill={darkMode? '#EDEDED' : '#333333'}>
                  <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/>
                </svg>
                <h1 className='font-orbitron text-[0.8rem] text-[#333333] dark:text-[#EDEDED]'>Name LastName</h1>
                </div>

            </div>

          </>
      }  
        
    
    </>
  )
}
