import React from 'react'
import { useAuth } from '../hooks'
import Modal from 'react-modal';
import { AnimatePresence, motion } from 'framer-motion';

export const UserModal = ({modalIsOpen, onSetModalIsOpen}) => {

    const {displayName, darkMode, onLogout} = useAuth();

    Modal.setAppElement('#root');

 
  return (
        
        <>
        
           <AnimatePresence>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => onSetModalIsOpen(false)}
                className='fixed inset-0 flex flex-col justify-center items-center dark:bg-black/25 bg-black/50'
                overlayClassName='fixed inset-0 bg-black/50 z-[9999]'
                    
                >
                    
                    <motion.div 
                    initial={{opacity:0, scale: 0.9, y:-20}}
                    animate={{opacity:1, scale: 1, y: 0}}
                    transition={{duration: 0.3, ease: 'easeInOut'}}
                    className='relative bg-white dark:bg-[#1E1F26] dark:shadow-[0_0.1rem_0.5rem_rgba(255,255,255,0.25)] w-[80%] h-[40%] lg:w-[40%] shadow rounded-md'
                    >

                        <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        height="1.2rem" 
                        viewBox="0 -960 960 960" 
                        width="1.2rem" 
                        fill={darkMode? '#fff' :"#333333"}
                        className='absolute top-4 left-4 cursor-pointer'
                        onClick={() => onSetModalIsOpen()}
                        >
                            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/>
                        </svg>
                        <h1 className='font-orbitron font-medium mt-3 text-black dark:text-white text-[1rem] text-center'>{displayName}</h1>



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

                </Modal>
           </AnimatePresence>

        </>
  )
}
