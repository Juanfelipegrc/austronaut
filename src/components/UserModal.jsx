import React from 'react'
import { useAuth } from '../hooks'
import { AnimatePresence, motion } from 'framer-motion';

export const UserModal = ({modalIsOpen, onSetModalIsOpen}) => {

    const {displayName, email, darkMode, onLogout} = useAuth();


 
  return (
        
        <>
        
           <AnimatePresence>
            {
                modalIsOpen && 
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0, transition: {duration: 0.5, delay: 0.4, ease: 'easeInOut'}}}
                    transition={{duration: 0.3, ease: 'easeInOut'}}
                    className='fixed inset-0 flex flex-col justify-center z-[9999] items-center dark:bg-black/25 bg-black/50'
                    
                >
                    
                    <motion.div 
                    initial={{opacity:0, scale: 0, y:-20}}
                    animate={{opacity:1, scale: 1, y: 0}}
                    exit={{opacity:0, scale: 0, y:-20, transition: {duration: 0.4, ease: 'easeInOut'}}}
                    transition={{duration: 0.4, delay: 0.2, ease: 'easeInOut'}}
                    className='relative bg-white dark:bg-[#1E1F26] dark:shadow-[0_0.1rem_0.5rem_rgba(255,255,255,0.25)] w-[80%] h-[40%] lg:w-[32%] shadow rounded-md'
                    >

                        <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        height="1.2rem" 
                        viewBox="0 -960 960 960" 
                        width="1.2rem" 
                        fill={darkMode? '#fff' :"#333333"}
                        className='absolute top-4 left-4 cursor-pointer z-50'
                        onClick={onSetModalIsOpen}
                        >
                            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/>
                        </svg>
                            <div className='absolute w-full flex justify-center top-4'>
                                <h1 className='font-orbitron font-medium text-black dark:text-white text-[1rem] text-center'>USER INFO</h1>
                            </div>

                            <div className='flex flex-col h-full items-center justify-center'>
                                
                                <div className='flex flex-col gap-2'>
                                    <div className='flex items-center'>

                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            height="1.2rem" 
                                            viewBox="0 -960 960 960" 
                                            width="1.2rem" 
                                            fill={darkMode? '#fff' : "#333333"}>
                                                <path d="m226-559 78 33q14-28 29-54t33-52l-56-11-84 84Zm142 83 114 113q42-16 90-49t90-75q70-70 109.5-155.5T806-800q-72-5-158 34.5T492-656q-42 42-75 90t-49 90Zm178-65q-23-23-23-56.5t23-56.5q23-23 57-23t57 23q23 23 23 56.5T660-541q-23 23-57 23t-57-23Zm19 321 84-84-11-56q-26 18-52 32.5T532-299l33 79Zm313-653q19 121-23.5 235.5T708-419l20 99q4 20-2 39t-20 33L538-80l-84-197-171-171-197-84 167-168q14-14 33.5-20t39.5-2l99 20q104-104 218-147t235-24ZM157-321q35-35 85.5-35.5T328-322q35 35 34.5 85.5T327-151q-25 25-83.5 43T82-76q14-103 32-161.5t43-83.5Zm57 56q-10 10-20 36.5T180-175q27-4 53.5-13.5T270-208q12-12 13-29t-11-29q-12-12-29-11.5T214-265Z"/>
                                        </svg>
                                        &nbsp;
                                        <p className='text-[#333333] dark:text-white font-medium lg:text-[1.1rem]'>{`PLAN - Free`}</p>
                                    </div>

                                    <div className='flex items-center'>

                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            height="1.2rem" 
                                            viewBox="0 -960 960 960" 
                                            width="1.2rem" 
                                            fill={darkMode? '#fff' : "#333333"}>
                                                <path d="m226-559 78 33q14-28 29-54t33-52l-56-11-84 84Zm142 83 114 113q42-16 90-49t90-75q70-70 109.5-155.5T806-800q-72-5-158 34.5T492-656q-42 42-75 90t-49 90Zm178-65q-23-23-23-56.5t23-56.5q23-23 57-23t57 23q23 23 23 56.5T660-541q-23 23-57 23t-57-23Zm19 321 84-84-11-56q-26 18-52 32.5T532-299l33 79Zm313-653q19 121-23.5 235.5T708-419l20 99q4 20-2 39t-20 33L538-80l-84-197-171-171-197-84 167-168q14-14 33.5-20t39.5-2l99 20q104-104 218-147t235-24ZM157-321q35-35 85.5-35.5T328-322q35 35 34.5 85.5T327-151q-25 25-83.5 43T82-76q14-103 32-161.5t43-83.5Zm57 56q-10 10-20 36.5T180-175q27-4 53.5-13.5T270-208q12-12 13-29t-11-29q-12-12-29-11.5T214-265Z"/>
                                        </svg>
                                        &nbsp;
                                        <p className='text-[#333333] dark:text-white font-medium lg:text-[1.1rem]'>{`NAME - ${displayName}`}</p>
                                    </div>

                                    <div className='flex items-center'>

                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            height="1.2rem" 
                                            viewBox="0 -960 960 960" 
                                            width="1.2rem" 
                                            fill={darkMode? '#fff' : "#333333"}>
                                                <path d="m226-559 78 33q14-28 29-54t33-52l-56-11-84 84Zm142 83 114 113q42-16 90-49t90-75q70-70 109.5-155.5T806-800q-72-5-158 34.5T492-656q-42 42-75 90t-49 90Zm178-65q-23-23-23-56.5t23-56.5q23-23 57-23t57 23q23 23 23 56.5T660-541q-23 23-57 23t-57-23Zm19 321 84-84-11-56q-26 18-52 32.5T532-299l33 79Zm313-653q19 121-23.5 235.5T708-419l20 99q4 20-2 39t-20 33L538-80l-84-197-171-171-197-84 167-168q14-14 33.5-20t39.5-2l99 20q104-104 218-147t235-24ZM157-321q35-35 85.5-35.5T328-322q35 35 34.5 85.5T327-151q-25 25-83.5 43T82-76q14-103 32-161.5t43-83.5Zm57 56q-10 10-20 36.5T180-175q27-4 53.5-13.5T270-208q12-12 13-29t-11-29q-12-12-29-11.5T214-265Z"/>
                                        </svg>
                                        &nbsp;
                                        <p className='text-[#333333] dark:text-white font-medium lg:text-[1.1rem]'>{`EMAIL - ${email}`}</p>
                                    </div>

                                    <div className='flex items-center'>

                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            height="1.2rem" 
                                            viewBox="0 -960 960 960" 
                                            width="1.2rem" 
                                            fill={darkMode? '#fff' : "#333333"}>
                                                <path d="m226-559 78 33q14-28 29-54t33-52l-56-11-84 84Zm142 83 114 113q42-16 90-49t90-75q70-70 109.5-155.5T806-800q-72-5-158 34.5T492-656q-42 42-75 90t-49 90Zm178-65q-23-23-23-56.5t23-56.5q23-23 57-23t57 23q23 23 23 56.5T660-541q-23 23-57 23t-57-23Zm19 321 84-84-11-56q-26 18-52 32.5T532-299l33 79Zm313-653q19 121-23.5 235.5T708-419l20 99q4 20-2 39t-20 33L538-80l-84-197-171-171-197-84 167-168q14-14 33.5-20t39.5-2l99 20q104-104 218-147t235-24ZM157-321q35-35 85.5-35.5T328-322q35 35 34.5 85.5T327-151q-25 25-83.5 43T82-76q14-103 32-161.5t43-83.5Zm57 56q-10 10-20 36.5T180-175q27-4 53.5-13.5T270-208q12-12 13-29t-11-29q-12-12-29-11.5T214-265Z"/>
                                        </svg>
                                        &nbsp;
                                        <p className='text-[#333333] dark:text-white font-medium lg:text-[1.1rem]'>{`MODEL - Austronaut 1.0`}</p>
                                    </div>
                                </div>
                            </div>


                        <div 
                            className='absolute cursor-pointer bottom-4 right-4 flex items-center'
                            onClick={onLogout}
                        >
                            
                            <p className='font-medium dark:text-white text-black text-[0.9rem]'>Logout</p>
                            &nbsp;
                            <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            height="1rem" 
                            viewBox="0 -960 960 960" 
                            width="1rem" 
                            fill={darkMode? '#fff' :"#333333"}>
                                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
                            </svg>

                        </div>


                    </motion.div>

                </motion.div>
            }
           </AnimatePresence>

        </>
  )
}
