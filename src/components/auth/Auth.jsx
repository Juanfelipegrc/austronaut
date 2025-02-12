import React from 'react'
import { GoogleGLogotype } from '../../assets'
import { useAuth } from '../../hooks'
import * as Yup from 'yup';
import { useFormik } from 'formik';

export const Auth = ({onSetExpanded}) => {

    const {darkMode, onSignInWithGoogle, onLoginEmailPassword} = useAuth();

    const formikLogin = useFormik({
        initialValues: {password: '', email: ''},
        validationSchema: Yup.object({
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters') // 👈 Mínimo 6 caracteres
                .matches(/[A-Z]/, 'Password must have at least one uppercase letter') // 👈 Al menos una mayúscula
                .matches(/[0-9]/, 'Password must have at least one number')
                .required('name is obligatory'),

            email: Yup.string()
                .email('email format invalid')
                .required('email is obligatory'),

        }),
        onSubmit: async(values) => {
            await onLoginEmailPassword(values)
        }    
    })
    

  return (
    <>

        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            height="1.5rem" 
            viewBox="0 -960 960 960" 
            width="1.5rem" 
            fill={darkMode? '#fff' : "#333333"}
            className='fixed top-8 left-8 cursor-pointer z-50'
            onClick={onSetExpanded}
            >
                <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/>
        </svg>
    
        <div className='bg-white lg:bg-[#F4F6F8] dark:lg:bg-[#1E1F26] dark:bg-black w-full h-svh flex justify-center items-center animate__animated animate__fadeIn'>
        
            <div className='w-[70%] lg:w-[30%]'>
                <h1 className='text-center text-[#333333] dark:text-white text-[1.2rem] lg:text-[2.5rem] font-orbitron font-bold'>AUSTRONAUT</h1>

                <form 
                    className='mt-5 flex flex-col gap-4'
                    onSubmit={formikLogin.handleSubmit}
                >
                <div>
                    <input 
                        type="text"
                        placeholder='email'
                        name='email'
                        value={formikLogin.values.email}
                        onChange={formikLogin.handleChange}
                        onBlur={formikLogin.handleBlur}
                        className='rounded-2xl bg-white w-full shadow-[0_0.1rem_0.6rem_rgba(0,0,0,0.25)] dark:shadow-[0_0.1rem_0.8rem_rgba(255,255,255,0.25)] px-3 py-3 focus-visible:outline-0' 
                    />
                    {
                        (formikLogin.touched.email && formikLogin.errors.email 
                            
                            ?
                                <p className='mt-1 ms-1 dark:text-white text-[0.8rem] text-red-500'>{formikLogin.errors.email}</p>
                            :
                            null
                        )
                    }
                </div>

                <div>
                    <input 
                        type="password"
                        placeholder='password'
                        name='password'
                        value={formikLogin.values.password}
                        onBlur={formikLogin.handleBlur}
                        onChange={formikLogin.handleChange}
                        className='rounded-2xl w-full bg-white shadow-[0_0.1rem_0.6rem_rgba(0,0,0,0.25)] dark:shadow-[0_0.1rem_0.8rem_rgba(255,255,255,0.25)] px-3 py-3 focus-visible:outline-0' 
                    />

                    {
                        (formikLogin.touched.password && formikLogin.errors.password 
                            
                            ?
                                <p className='mt-1 ms-1 dark:text-white text-[0.8rem] text-red-500'>{formikLogin.errors.password}</p>
                            :
                            null
                        )
                    }
                </div>



                <input 
                    type='submit'
                    className='py-3 cursor-pointer px-4 mt-3 dark:lg:shadow-[0_0.1rem_0.5rem_rgba(255,255,255,0.25)] bg-[#121417] dark:bg-[#1E1F26] dark:lg:bg-black text-[0.9rem] text-white rounded-xl'
                    value='Sign In'
                />
                </form>
                <div className='flex justify-between mt-3 items-center w-full'>
                <hr className='w-[40%] text-[#333333] dark:text-white'/>
                <p className='text-[#333333] dark:text-white text-[0.9rem]'>OR</p>
                <hr className='w-[40%] text-[#333333] dark:text-white'/>
                </div>

                <button 
                    className='border bg-white cursor-pointer border-gray-500/75 w-full px-3 py-2 rounded-xl mt-3 flex justify-center items-center'
                    onClick={onSignInWithGoogle}    
                >
                <img 
                    src={GoogleGLogotype} 
                    alt="google-g-logotype" 
                    className='h-4 w-4'
                />
                &nbsp;
                Continue with Google
                </button>

            </div>
        
        </div>
    
    </>
  )
}
