import { useSelector } from "react-redux"
import {doc, setDoc} from 'firebase/firestore';
import { FirebaseDB } from "../firebase/config";


export const useActiveChat = () => {

    const activeChatState = useSelector(state => state.activeChat);


    const createNewChat = async() => {
        const chatRef = doc(FirebaseDB, 'chats');

        
    }


    return {
        ...activeChatState

    }
}