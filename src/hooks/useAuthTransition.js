import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useDispatch, useSelector } from "react-redux";
import { setExpanded, setModalIsOpen, setShowAuth, setShowLoginButton } from "../store";




export const useAuthTransition = () => {


    const authTransitionState = useSelector(state => state.authTransition);
    const dispatch = useDispatch();

    const {status} = useAuth();
    

    const handleModalIsOpen = (value) => {
        dispatch(setModalIsOpen(value))
    }

    const onSetExpanded = () => {

    
        if(authTransitionState.expanded){
            dispatch(setShowAuth(false));

            setTimeout(() => {
                dispatch(setExpanded(false)); 
              }, 100); 
            setTimeout(() => {
                dispatch(setShowLoginButton(true));
            }, 300);
        } else {

            dispatch(setExpanded(true)); 
            dispatch(setShowLoginButton(false));
            setTimeout(() => {
                dispatch(setShowAuth(true));
            }, 400);
            
        }
        
      };


      const onSetModalIsOpen = () => {
        if(authTransitionState.modalIsOpen){
            dispatch(setModalIsOpen(false));
        }  
      }

      useEffect(() => {
        
        if(status === 'authenticated') {
            dispatch(setShowAuth(false));
            

            setTimeout(() => {
                dispatch(setExpanded(false));  
              }, 100); 
            setTimeout(() => {
                dispatch(setShowLoginButton(true));
            }, 300);
        } 

        if(status === 'not-authenticated') {
            dispatch(setModalIsOpen(false));
        }

      }, [status])
  

    return{
        ...authTransitionState,
        onSetExpanded,
        onSetModalIsOpen,
        handleModalIsOpen,
    }
}
