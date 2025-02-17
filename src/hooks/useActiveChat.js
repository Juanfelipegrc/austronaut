import { useDispatch, useSelector } from "react-redux"
import {addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, updateDoc} from 'firebase/firestore';
import { FirebaseDB } from "../firebase/config";
import { useAuth } from "./useAuth";
import { createAnswer } from "../helpers";
import { setActiveChat, setLoadingResponse, setMessages } from "../store";
import { useEffect } from "react";


export const useActiveChat = () => {

    const activeChatState = useSelector(state => state.activeChat);
    const dispatch = useDispatch();
    const {uid} = useAuth();



    const onSetActiveChat = async(chat) => {

        dispatch(setActiveChat(chat));

        localStorage.setItem('activeChat', JSON.stringify(chat));


    };


    const onSetMessages = (messages) => {
        dispatch(setMessages(messages));
    };


    const createNewChat = async(message) => {


        const chatID = crypto.randomUUID();

        
        const chatRef = doc(FirebaseDB, `users/${uid}/chats/${chatID}`);

        const chat = {
            title: '',
            createdAt: new Date(),
            id: chatID,
        }
        
        await setDoc(chatRef, chat);

        onSetActiveChat(chat);

        
        const messagesRef = collection(FirebaseDB, `users/${uid}/chats/${chatID}/messages`);

        const userMessage = {
            sender: 'user',
            message: message,
            timestamp: new Date(),
        }
        
        await addDoc(messagesRef, userMessage);
        


        
        const {text, title} = await createAnswer(message);
        

        if(text) {
            await addDoc(messagesRef, {
                sender: 'austronaut',
                message: text,
                timestamp: new Date(),
            })
        };
        
        await updateDoc(chatRef, {
            title: title,
        })


    };




    const getMessages = () => {

        const messagesRef = collection(FirebaseDB, `users/${uid}/chats/${activeChatState.id}/messages`);

        const q = query(messagesRef, orderBy('timestamp', 'asc'))

        const unsubscribe = onSnapshot(q, (snapshot) => {
            
            const messages = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data(),
                };
            });

            onSetMessages(messages);


        })

        return unsubscribe;

    };


    useEffect(() => {

        if(!uid && !activeChatState.id) return;

        const unsubscribe = getMessages();
    
        return () => {
            unsubscribe();
        }
    }, [activeChatState.id])
    


    return {
        ...activeChatState,
        createNewChat,
        onSetActiveChat
    }
}