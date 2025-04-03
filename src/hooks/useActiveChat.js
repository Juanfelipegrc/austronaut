import { useDispatch, useSelector } from "react-redux"
import {collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, updateDoc} from 'firebase/firestore';
import { FirebaseDB } from "../firebase/config";
import { useAuth } from "./useAuth";
import { createAnswer } from "../helpers";
import { cleanActiveChat, setActiveChat, setLoadingResponse, setMemory, setMessages } from "../store";
import { useEffect } from "react";


export const useActiveChat = () => {

    const activeChatState = useSelector(state => state.activeChat);
    const dispatch = useDispatch();
    const {uid} = useAuth();



    // ON CLEAN ACTIVE CHAT

    const onCleanActiveChat = () => {
        dispatch(cleanActiveChat());        
    }




    // ON SET ACTIVE CHAT

    const onSetActiveChat = async(chat) => {

        
        dispatch(setActiveChat(chat));


    };




    // ON SET MESSAGES

    const onSetMessages = (messages) => {
        dispatch(setMessages(messages));
    };



    // DELETE CHAT

    const deleteChat = async(chatID) => {

        const chatRef = doc(FirebaseDB, `users/${uid}/chats/${chatID}`);

        const messagesRef = collection(FirebaseDB, `users/${uid}/chats/${chatID}/messages`);

        const chatSnap = await getDoc(chatRef);

        if(!chatSnap.exists()){
            console.error("chat doesn't exists");
            return;
        };

        const messagesSnap = await getDocs(messagesRef);
        
        onCleanActiveChat();

        if(!messagesSnap.empty) {
            const deleteMessages = messagesSnap.docs.map(doc => deleteDoc(doc.ref));
            await Promise.all(deleteMessages);
        }
        

        await deleteDoc(chatRef);

    }



    // CREATE A NEW CHAT

    const createNewChat = async(message) => {


        const chatID = crypto.randomUUID();

        
        const chatRef = doc(FirebaseDB, `users/${uid}/chats/${chatID}`);

        const chat = {
            title: '',
            createdAt: new Date(),
            id: chatID,
            memory: '',
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
        
        const {text, title} = await createAnswer(message, activeChatState.memory);

        onSetActiveChat({...chat, title});
        

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






    // ADD A MESSAGE

    const addMessage = async(message) => {

        const chatID = activeChatState.id;



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
        
        const {text} = await createAnswer(message, activeChatState.memory);
        

        if(text) {
            await setDoc(austronautMessageRef, {
                sender: 'austronaut',
                message: text,
                timestamp: new Date(),
                id: austronautMessageID,
            })
        };
        
        dispatch(setLoadingResponse({idUser: '', state: false, idAustronaut: ''}));


    };


    // UPDATE MEMORY


    const updateMemory = async(messages) => {
        let finalMessage = '';
        
        messages.forEach(message => {
            
            finalMessage = `${finalMessage} ${message.sender === 'austronaut'? 'IA:' : 'user:'} ${message.message}
            `;
        });

        const chatRef = doc(FirebaseDB, `users/${uid}/chats/${activeChatState.id}`);

        const chatSnap = await getDoc(chatRef);

        if(!chatSnap.exists) return;

        const chat = {
            ...chatSnap.data(),
            memory: finalMessage,
        }
        dispatch(setMemory(finalMessage))
        await setDoc(chatRef, chat)
    }



    // GET MESSAGES


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
            updateMemory(messages)


        })

        return unsubscribe;

    };

    const getMemory = () => {

        const messagesRef = collection(FirebaseDB, `users/${uid}/chats/${activeChatState.id}/messages`);

        const q = query(messagesRef, orderBy('timestamp', 'asc'))

        const unsubscribe = onSnapshot(q, (snapshot) => {
            
            const messages = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                };
            });
            
            updateMemory(messages)


        })

        return unsubscribe;

    };






    // USE EFFECTS


    useEffect(() => {

        if(!uid || !activeChatState.id) return;

        const unsubscribe = getMessages();
    
        return () => {
            unsubscribe();
        }
    }, [activeChatState.id])


    useEffect(() => {

        if(!uid || !activeChatState.id) return;

        const unsubscribe = getMemory();
    
        return () => {
            unsubscribe();
        }
    }, [activeChatState.messages])


    useEffect(() => {
      
        if(!uid){
            onCleanActiveChat();
        }
        
    }, [uid])
    
    


    return {
        ...activeChatState,
        createNewChat,
        deleteChat,
        onSetActiveChat,
        onCleanActiveChat,
        addMessage,
    }
}