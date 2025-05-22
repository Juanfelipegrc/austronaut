import React, { useRef } from 'react'
import { useActiveChat, useAuth, useAuthTransition } from '../hooks'
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const ChatInput = () => {



    const {darkMode, status} = useAuth();
    const {createNewChat, addMessage, id, messages} = useActiveChat();
    const {onSetExpanded} = useAuthTransition();
    const textareaRef = useRef();

    const formik = useFormik({
        initialValues: {message: ''},
        validationSchema: Yup.object({
            message: Yup.string()
                    .min(1, 'Message must be at least 1 character'),
        }),
        onSubmit: async(values, {resetForm}) => {
            if(values?.message?.length === 0) return;
            const savedMessage = values.message
            resetForm();
            if(status === 'authenticated'){
                if(messages?.length != 0 && id) {
                    await addMessage(savedMessage);
                } else {
                    await createNewChat(savedMessage);
                }
            } else {
                onSetExpanded();
            }
            
        }
    });


    const adjustTextareaHeght = () => {
        const textarea = textareaRef.current;

        if(textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, 267.2)}px`;
        }
    }
    



  return (
    <>
    
        <form onSubmit={formik.handleSubmit} className='fixed bottom-10 w-[90%] lg:w-[60%]'>
            <div className='relative'>
                <textarea 
                    value={formik.values.message}
                    ref={textareaRef}
                    name='message'
                    onChange={(e) => {
                        formik.handleChange(e); 
                        adjustTextareaHeght();
                    }}
                    onBlur={formik.handleBlur}
                    wrap="soft"
                    rows='1'
                    placeholder='Message Austronaut'
                    className='custom-scrollbar min-h-24 max-h-[16.7rem] w-full resize-none shadow-[0_0.1rem_0.6rem_rgba(0,0,0,0.25)] dark:shadow-[0_0.1rem_0.6rem_rgba(255,255,255,0.25)] lg:dark:shadow-[0_0.1rem_0.8rem_rgba(255,255,255,0.25)] bg-gray-100 dark:bg-[#202129] rounded-3xl ps-4 pe-14 placeholder-gray-600 dark:placeholder-gray-50 dark:text-white focus-visible:outline-0 pt-4 transition-all' 
                />
                <button 
                    type='submit'
                    className='rounded-full w-9 h-9 flex items-center justify-center absolute right-3 bottom-4 bg-black dark:bg-[#EDEDED] cursor-pointer'
                >
                
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        height="1.2rem" 
                        viewBox="0 -960 960 960" 
                        width="1.2rem" 
                        fill={darkMode? '#000' : "#fff"}
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
