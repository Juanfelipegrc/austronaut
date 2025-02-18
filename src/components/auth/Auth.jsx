import React, { useState } from 'react'
import { GoogleGLogotype } from '../../assets'
import { useAuth } from '../../hooks'
import * as Yup from 'yup';
import { useFormik } from 'formik';

export const Auth = ({onSetExpanded}) => {

    const {darkMode, onSignInWithGoogle, onLoginEmailPassword, onRegisterEmailPassword} = useAuth();

    const [authScreenActive, setAuthScreenActive] = useState('login');

    const formikLogin = useFormik({
        initialValues: {password: '', email: ''},
        validationSchema: Yup.object({
            password: Yup.string()
                .min(6, 'password must be at least 6 characters') 
                .matches(/[A-Z]/, 'password must have at least one uppercase letter') 
                .matches(/[0-9]/, 'password must have at least one number')
                .required('password is obligatory'),

            email: Yup.string()
                .email('email format invalid')
                .required('email is obligatory'),

        }),
        onSubmit: async(values) => {
            await onLoginEmailPassword({email: values.email, password: values.password})
        }    
    });

    const formikRegister = useFormik({
        initialValues: {displayName: '', password: '', email: ''},
        validationSchema: Yup.object({
            password: Yup.string()
                .min(6, 'password must be at least 6 characters') 
                .matches(/[A-Z]/, 'password must have at least one uppercase letter') 
                .matches(/[0-9]/, 'password must have at least one number')
                .required('password is obligatory'),

            email: Yup.string()
                .email('email format invalid')
                .required('email is obligatory'),
            
            displayName: Yup.string()
                .required('name is obligatory'),

        }),
        onSubmit: async(values) => {
            await onRegisterEmailPassword({
                email: values.email,
                password: values.password,
                displayName: values.displayName
            })
        }    
    });
    

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
    
        {
            authScreenActive === 'login'?
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
                            className='rounded-2xl bg-[#F4F6F8] lg:bg-white w-full shadow-[0_0.1rem_0.6rem_rgba(0,0,0,0.25)] dark:shadow-[0_0.1rem_0.8rem_rgba(255,255,255,0.25)] px-3 py-3 focus-visible:outline-0' 
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
                            className='rounded-2xl w-full bg-[#F4F6F8] lg:bg-white shadow-[0_0.1rem_0.6rem_rgba(0,0,0,0.25)] dark:shadow-[0_0.1rem_0.8rem_rgba(255,255,255,0.25)] px-3 py-3 focus-visible:outline-0' 
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
                    <p className='font-medium text-[#333333] dark:text-[#EDEDED] mt-3 text-end text-[0.9rem]'>
                        Don't have an account? 
                        &nbsp; 
                        <span 
                            className='text-blue-500 font-normal underline cursor-pointer'
                            onClick={() => setAuthScreenActive('register')}
                        >
                            Sign up
                        </span>
                    </p>

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

            :

            <div className='bg-white lg:bg-[#F4F6F8] dark:lg:bg-[#1E1F26] dark:bg-black w-full h-svh flex justify-center items-center animate__animated animate__fadeIn'>
        
            <div className='w-[70%] lg:w-[30%]'>
                <h1 className='text-center text-[#333333] dark:text-white text-[1.2rem] lg:text-[2.5rem] font-orbitron font-bold'>AUSTRONAUT</h1>

                <form 
                    className='mt-5 flex flex-col gap-4'
                    onSubmit={formikRegister.handleSubmit}
                >

                <div>
                    <input 
                        type="text"
                        placeholder='name'
                        name='displayName'
                        value={formikRegister.values.displayName}
                        onChange={formikRegister.handleChange}
                        onBlur={formikRegister.handleBlur}
                        className='rounded-2xl bg-[#F4F6F8] lg:bg-white w-full shadow-[0_0.1rem_0.6rem_rgba(0,0,0,0.25)] dark:shadow-[0_0.1rem_0.8rem_rgba(255,255,255,0.25)] px-3 py-3 focus-visible:outline-0' 
                    />
                    {
                        (formikRegister.touched.displayName && formikRegister.errors.displayName 
                            
                            ?
                                <p className='mt-1 ms-1 dark:text-white text-[0.8rem] text-red-500'>{formikRegister.errors.displayName}</p>
                            :
                            null
                        )
                    }
                </div>

                <div>
                    <input 
                        type="text"
                        placeholder='email'
                        name='email'
                        value={formikRegister.values.email}
                        onChange={formikRegister.handleChange}
                        onBlur={formikRegister.handleBlur}
                        className='rounded-2xl bg-[#F4F6F8] lg:bg-white w-full shadow-[0_0.1rem_0.6rem_rgba(0,0,0,0.25)] dark:shadow-[0_0.1rem_0.8rem_rgba(255,255,255,0.25)] px-3 py-3 focus-visible:outline-0' 
                    />
                    {
                        (formikRegister.touched.email && formikRegister.errors.email 
                            
                            ?
                                <p className='mt-1 ms-1 dark:text-white text-[0.8rem] text-red-500'>{formikRegister.errors.email}</p>
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
                        value={formikRegister.values.password}
                        onBlur={formikRegister.handleBlur}
                        onChange={formikRegister.handleChange}
                        className='rounded-2xl w-full bg-[#F4F6F8] lg:bg-white shadow-[0_0.1rem_0.6rem_rgba(0,0,0,0.25)] dark:shadow-[0_0.1rem_0.8rem_rgba(255,255,255,0.25)] px-3 py-3 focus-visible:outline-0' 
                    />

                    {
                        (formikRegister.touched.password && formikRegister.errors.password 
                            
                            ?
                                <p className='mt-1 ms-1 dark:text-white text-[0.8rem] text-red-500'>{formikRegister.errors.password}</p>
                            :
                            null
                        )
                    }
                </div>



                <input 
                    type='submit'
                    className='py-3 cursor-pointer px-4 mt-3 dark:lg:shadow-[0_0.1rem_0.5rem_rgba(255,255,255,0.25)] bg-[#121417] dark:bg-[#1E1F26] dark:lg:bg-black text-[0.9rem] text-white rounded-xl'
                    value='Sign Up'
                />
                </form>
                <p className='font-medium text-[#333333] dark:text-[#EDEDED] mt-3 text-end text-[0.9rem]'>
                    Already have an account? 
                    &nbsp; 
                    <span 
                        className='text-blue-500 font-normal underline cursor-pointer'
                        onClick={() => setAuthScreenActive('login')}
                    >
                        Sign in
                    </span>
                </p>

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
        }
    
    </>
  )
}
