import { useDispatch, useSelector } from "react-redux"
import {addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query} from 'firebase/firestore';
import { FirebaseDB } from "../firebase/config";
import { useAuth } from "./useAuth";
import { createAnswer } from "../helpers";
import { setActiveChat } from "../store";


export const useActiveChat = () => {

    const activeChatState = useSelector(state => state.activeChat);
    const dispatch = useDispatch();
    const {uid} = useAuth();



    const onSetActiveChat = async(chat) => {

        let newChat = null;
        if(!chat.title && chat.messages?.length === 0){
            console.log('sellama')
            const res = await createNewChat(chat.newMessage);
            newChat = res.chatWithMessages;
        } else {
            newChat = {title: chat.title, messages: chat.messages};
        };



        dispatch(setActiveChat({title: newChat.title, messages: newChat.messages}));

        localStorage.setItem('activeChat', JSON.stringify(newChat));

    } 


    const createNewChat = async(message) => {


        const {text, title} = await createAnswer(message);

        const chatsRef = collection(FirebaseDB, `users/${uid}/chats`);

        const newChatRef = await addDoc(chatsRef, {
            title: title,
            createdAt: new Date(),
        });


        const messagesRef = collection(newChatRef, 'messages');


        await addDoc(messagesRef, {
            sender: 'user',
            message: message,
            timestamp: new Date(),
        });


        if(text) {
            await addDoc(messagesRef, {
                sender: 'austronaut',
                message: text,
                timestamp: new Date(),
            })
        };   
        
        const chatCreatedSnap = await getDoc(doc(FirebaseDB, `users/${uid}/chats/${newChatRef.id}`));

        const chatCreated = chatCreatedSnap.exists()? {id:chatCreatedSnap.id, ...chatCreatedSnap.data()} : null; 

        const messagesCreatedRef = collection(FirebaseDB, `users/${uid}/chats/${newChatRef.id}/messages`);

        const messagesQuery = query(messagesCreatedRef, orderBy('timestamp', 'asc'));

        const messagesCreatedSnap = await getDocs(messagesQuery);

        const messagesCreated = !messagesCreatedSnap.empty? messagesCreatedSnap.docs.map(doc => ({id: doc.id, ...doc.data()})) : null;

        const chatWithMessages = {...chatCreated, messages: messagesCreated}

        console.log(chatWithMessages)
        
        return {
            chatWithMessages
        }


    };

    const getMessages = () => {

        const messagesRef = collection(FirebaseDB, `users/${uid}/chats/messages`);

        const q = query(messagesRef, orderBy('timestamp', 'asc'))

        const unsubscribe = onSnapshot(q, (snapshot) => {
            
            const messages = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data(),
                }
            });




        })

        return unsubscribe;

    }


    return {
        ...activeChatState,
        createNewChat,
        onSetActiveChat
    }
}