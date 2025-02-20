import { useDispatch, useSelector } from "react-redux"
import { chenckingCredentials, cleanActiveChat, login, loginWithoutUserLogged, logout, setChats, setDarkMode, setError } from "../store";
import { loginWithEmailPassword, registerUserWithEmailPassword, signInWithGoogle } from "../firebase/providers";
import {collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc} from 'firebase/firestore';
import { FirebaseDB } from "../firebase/config";
import { useEffect } from "react";

let globalTempUserValidation = true;

export const useAuth = () => {
    
    const authState = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const darkColorsToPhotoURL = [
        "#2C3E50",
        "#34495E",
        "#3D3D3D",
        "#212121",
      ];

    
    
    // REGISTER WITH EMAIL AND PASSWORD

    const onRegisterEmailPassword = async({email, password, displayName}) => {


        const res = await registerUserWithEmailPassword(email, displayName, password);
        
        const {uid, photoURL} = res;

        if(!res.ok) {
            dispatch(setError(res.msg));
            return;
        };

        const user = {
            displayName,
            email,
            uid,
            photoURL,
            noPhotoURLColor: darkColorsToPhotoURL[Math.floor(Math.random() * darkColorsToPhotoURL.length)],
        };

        const userRef = doc(FirebaseDB, 'users', uid);


        await setDoc(userRef, user);

        localStorage.setItem('user', JSON.stringify(user));

        await deleteTempUser();

        dispatch(login(user));

    }


    // LOGIN WITH EMAIL PASSWORD

    const onLoginEmailPassword = async({email, password}) => {
        dispatch(chenckingCredentials());


        const res = await loginWithEmailPassword(email, password);

        const {uid, displayName, photoURL} = res;



        if(!res.ok){
            dispatch(setError(res.msg));
            return;
        };

        const userRef = doc(FirebaseDB, 'users', uid);

        const userSnap = await getDoc(userRef);

        const noPhotoURLColor = userSnap.exists()? userSnap.data().noPhotoURLColor : null;

        const user = {
            email,
            displayName,
            uid,
            photoURL,
            noPhotoURLColor,
        }

        localStorage.setItem('user', JSON.stringify(user));

        await deleteTempUser();
        
        dispatch(login(user));
    };


    //  SIGN IN WITH GOOGLE

    const onSignInWithGoogle = async() => {
        dispatch(chenckingCredentials());
        const res = await signInWithGoogle();

        const {displayName, email, uid, photoURL} = res;

        let photoURLColor = null ;

        if(!res.ok) {
            dispatch(setError(res.msg));
            return;
        };

        const userRef = doc(FirebaseDB, 'users', uid);

        const userSnap = await getDoc(userRef);

        if(userSnap.exists()) {
            if(!userSnap.data().photoURLcolor){

                photoURLColor = darkColorsToPhotoURL[Math.floor(Math.random() * darkColorsToPhotoURL.length)];
                 
            } 
            else {
                photoURLColor = userSnap.data().photoURLcolor;
            };
        } else {
            photoURLColor = darkColorsToPhotoURL[Math.floor(Math.random() * darkColorsToPhotoURL.length)];
        }




        const user = {
            displayName,
            email,
            uid,
            photoURL: photoURL,
            noPhotoURLColor: photoURLColor,
        }

        

        await setDoc(userRef, user);

        localStorage.setItem('user', JSON.stringify(user));

        await deleteTempUser();

        dispatch(login(user));

    };


    // GET CHATS


    const getChats = () => {

        let chatsRef = null;
        
        if(authState.displayName === 'tempUser'){
            chatsRef = collection(FirebaseDB, `tempUsers/${authState.uid}/chats`);
        } else {
            chatsRef = collection(FirebaseDB, `users/${authState.uid}/chats`);
        }

        const q = query(chatsRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {

            const chats = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                };
            });

            dispatch(setChats(chats));

            const user = {
                ...authState,
                chats: chats,
            };

            if(authState.displayName !== 'tempUser'){
                localStorage.setItem('user', JSON.stringify(user));
            }
        });

        return unsubscribe;
    }



    // SET DARK MODE

    const onSetDarkMode = (toggle) => {
        dispatch(setDarkMode(toggle));
    };


    // LOGOUT

    const onLogout = () => {
        dispatch(logout());
        localStorage.removeItem('user');
        createTempUser();
    };



    // CREATE TEMP USER

    const createTempUser = async() => {

            await deleteTempUser();

            const tempUserID = crypto.randomUUID();

            localStorage.setItem('lastTempUserID', tempUserID);

            
            const tempUser = {
                displayName: 'tempUser',
                email: 'tempUser',
                uid: tempUserID,
            };

            const tempUserRef = doc(FirebaseDB, 'tempUsers', tempUserID);

            await setDoc(tempUserRef, tempUser);

            dispatch(loginWithoutUserLogged(tempUser));

            
          
    };



    //  DELETE TEMP USER

    const deleteTempUser = async() => {

        const tempUserID = localStorage.getItem('lastTempUserID') || '';

        if(!tempUserID) return;

        const tempUserRef = doc(FirebaseDB, `tempUsers/${tempUserID}`);

        const tempUserSnap = await getDoc(tempUserRef);
        
        if(tempUserSnap.exists()){

            const chatsRef = collection(FirebaseDB, `tempUsers/${tempUserID}/chats`);

            const chatsSnap = await getDocs(chatsRef);


            if(!chatsSnap.empty){
                const deleteMessagesPromises = chatsSnap.docs.map(async(chatDoc) => {

                    const messagesRef = collection(FirebaseDB, `tempUsers/${tempUserID}/chats/${chatDoc.id}/messages`);

                    const messagesSnap = await getDocs(messagesRef);

                    if(!messagesSnap.empty) {
                        const deleteMessages = messagesSnap.docs.map(doc => deleteDoc(doc.ref));
                        await Promise.all(deleteMessages);
                    };

                });

                await Promise.all(deleteMessagesPromises);

                const deleteChats = chatsSnap.docs.map(doc => deleteDoc(doc.ref));
                await Promise.all(deleteChats);
            }
            
            await deleteDoc(tempUserRef);
            
        };
        
    };


    useEffect(() => {
        const userLogged = JSON.parse(localStorage.getItem('user')) || '';
        if(userLogged && userLogged.displayName !== 'tempUser' && userLogged.uid) {
          dispatch(login(userLogged));
          return;
        }

      }, []);

      

      useEffect(() => {

        
        if(globalTempUserValidation){
            globalTempUserValidation = false;
            createTempUser();
        }

      }, [])
      


      


      useEffect(() => {
        
        if(!authState.uid) return;

        const unsubscribe = getChats();
      
        return () => {
          unsubscribe();
        }
      }, [authState.uid]);


      


    return {
        ...authState,
        onSetDarkMode,
        onLoginEmailPassword,
        onRegisterEmailPassword,
        onSignInWithGoogle,
        onLogout,
        createTempUser,
        deleteTempUser,
    }

}
