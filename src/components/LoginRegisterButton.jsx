import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion';
import { useAuth } from '../hooks';
import { Auth } from './auth';
import { UserModal } from './UserModal';

export const LoginRegisterButton = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [showAuth, setShowAuth] = useState(false);
    const [showLoginButton, setShowLoginButton] = useState(true);
    const {status, darkMode, displayName, photoURL, noPhotoURLColor} = useAuth();
    const username = `${displayName.split(' ')[0]} ${displayName.split(' ')[1]}`;

    
      

    const onSetExpanded = () => {

    
        if(expanded){
            setShowAuth(false);

            setTimeout(() => {
                setExpanded(false); 
              }, 100); 
            setTimeout(() => {
                setShowLoginButton(true);
            }, 300);
        } else {

            setExpanded(true);
            setShowLoginButton(false);
            setTimeout(() => {
                setShowAuth(true);
            }, 400);
            
        }
        
      };


      const onSetModalIsOpen = () => {
        if(modalIsOpen){
            setModalIsOpen(false);
        }  
      }

      useEffect(() => {
        
        if(status === 'authenticated') {
            setShowAuth(false);
            

            setTimeout(() => {
                setExpanded(false); 
              }, 100); 
            setTimeout(() => {
                setShowLoginButton(true);
            }, 300);
        } 

        if(status === 'not-authenticated') {
            setModalIsOpen(false);
        }

      }, [status])
      

   
   

  return (
    <>
    
        <motion.div 
            className={`absolute ${expanded? 'bg-white lg:bg-[#F4F6F8] dark:lg:bg-[#1E1F26] dark:bg-black' : 'bg-[#F4F6F8] dark:bg-[#1E1F26] cursor-pointer hover:bg-gray-200 dark:hover:bg-[#181b1f]'} transition-colors flex items-center bg-[#F4F6F8] justify-center gap-4 bottom-0 z-50`}
            initial={{width: '100%', height: '3.2rem'}}
            animate={
                expanded
                ? {width: '100vw', height: '100vh', top: 0, left:0, transition: {duration: 0.4, ease: 'easeInOut'}}
                : {width: '100%', height: '3.2rem', bottom: 0, transition: {duration: 0.4, ease: 'easeInOut'}}
            }
            onClick={() => {
                if(status === 'authenticated'){
                    setModalIsOpen(true);
                } else if (!expanded) {
                    onSetExpanded();
                }
                    
            }}
        >
            {
              
                    !expanded?
                        showLoginButton?
                            status === 'authenticated'?
                                
                                <>  
                                    {
                                        !photoURL?
                                        <div 
                                            className='h-8 w-8 text-white flex justify-center items-center rounded-full'
                                            style={{backgroundColor: noPhotoURLColor}}
                                        >
                                            <span className='font-medium text-[1rem]'>{displayName[0]?.toUpperCase()}</span>
                                        </div>
                                        :
                                        <img 
                                            src={photoURL} 
                                            alt="photoURL" 
                                            className='h-8 w-8 rounded-full'
                                        /> 
                                    }
                                    
                                    
                                    
                                
                                    <h1 className='font-orbitron text-[0.8rem] text-[#333333] dark:text-[#EDEDED]'>{status === 'authenticated'? username : 'Login / Register'}</h1>
                                </>
                                
                            :
                            <>
                                
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    height="1.6rem" 
                                    viewBox="0 -960 960 960" 
                                    width="1.6rem" 
                                    fill={darkMode?"#EDEDED" : '#333333'}>
                                        <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/>
                                </svg>
                                <h1 className='font-orbitron text-[0.8rem] text-[#333333] dark:text-[#EDEDED]'>{status === 'authenticated'? username : 'Login / Register'}</h1>

                            
                            </>
                        
                        :
                        <></>

                    :
                    showAuth && status === 'not-authenticated'
                    ?
                    <Auth onSetExpanded={onSetExpanded}/>
                    :
                    <></>
                
            }
        </motion.div>

        <UserModal modalIsOpen={modalIsOpen} onSetModalIsOpen={onSetModalIsOpen}/>

    </>
  )
}
