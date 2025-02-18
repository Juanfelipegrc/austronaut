import { useDispatch, useSelector } from "react-redux"
import {collection, doc, onSnapshot, orderBy, query, setDoc, updateDoc} from 'firebase/firestore';
import { FirebaseDB } from "../firebase/config";
import { useAuth } from "./useAuth";
import { createAnswer } from "../helpers";
import { cleanActiveChat, setActiveChat, setLoadingResponse, setMessages } from "../store";
import { useEffect } from "react";


export const useActiveChat = () => {

    const activeChatState = useSelector(state => state.activeChat);
    const dispatch = useDispatch();
    const {uid} = useAuth();



    const onCleanActiveChat = () => {
        dispatch(cleanActiveChat());        
    }

    const onSetActiveChat = async(chat) => {

        dispatch(setActiveChat(chat));


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

        

        const userMessageID = crypto.randomUUID();

        const userMessageRef = doc(FirebaseDB, `users/${uid}/chats/${chatID}/messages/${userMessageID}`);

        const userMessage = {
            sender: 'user',
            message: message,
            timestamp: new Date(),
            id: userMessageID,
        }
        
        await setDoc(userMessageRef, userMessage);

        const austronautMessageID = crypto.randomUUID();
        
        const austronautMessageRef = doc(FirebaseDB, `users/${uid}/chats/${chatID}/messages/${austronautMessageID}`);

        dispatch(setLoadingResponse({idUser: userMessageID, state: true, idAustronaut: austronautMessageID}));
        
        const {text, title} = await createAnswer(message);
        

        if(text) {
            await setDoc(austronautMessageRef, {
                sender: 'austronaut',
                message: text,
                timestamp: new Date(),
                id: austronautMessageID,
            })
        };
        
        await updateDoc(chatRef, {
            title: title,
        })

        dispatch(setLoadingResponse({idUser: '', state: false, idAustronaut: ''}));
        
    };

    const addMessage = async(message) => {

        const chatID = activeChatState.id;

        const chatRef = doc(FirebaseDB, `users/${uid}/chats/${chatID}`);



        const userMessageID = crypto.randomUUID();

        const userMessageRef = doc(FirebaseDB, `users/${uid}/chats/${chatID}/messages/${userMessageID}`);

        const userMessage = {
            sender: 'user',
            message: message,
            timestamp: new Date(),
            id: userMessageID,
        }
        
        await setDoc(userMessageRef, userMessage);

        const austronautMessageID = crypto.randomUUID();
        
        const austronautMessageRef = doc(FirebaseDB, `users/${uid}/chats/${chatID}/messages/${austronautMessageID}`);

        dispatch(setLoadingResponse({idUser: userMessageID, state: true, idAustronaut: austronautMessageID}));
        
        const {text} = await createAnswer(message);
        

        if(text) {
            await setDoc(austronautMessageRef, {
                sender: 'austronaut',
                message: text,
                timestamp: new Date(),
                id: austronautMessageID,
            })
        };
        
        dispatch(setLoadingResponse({idUser: '', state: false, idAustronaut: ''}));


    }




    const getMessages = () => {

        const messagesRef = collection(FirebaseDB, `users/${uid}/chats/${activeChatState.id}/messages`);

        const q = query(messagesRef, orderBy('timestamp', 'asc'))

        const unsubscribe = onSnapshot(q, (snapshot) => {
            
            const messages = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                };
            });

            onSetMessages(messages);


        })

        return unsubscribe;

    };


    useEffect(() => {

        if(!uid || !activeChatState.id) return;

        const unsubscribe = getMessages();
    
        return () => {
            unsubscribe();
        }
    }, [activeChatState.id])


    useEffect(() => {
      
        if(!uid){
            onCleanActiveChat();
        }
        
    }, [uid])
    
    


    return {
        ...activeChatState,
        createNewChat,
        onSetActiveChat,
        onCleanActiveChat,
        addMessage,
    }
}