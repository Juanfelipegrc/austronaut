import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth"
import { FirebaseAuth } from "./config"


const googleProvider = new GoogleAuthProvider();


export const registerUserWithEmailPassword = async(email, displayName, password) => {


    try {

        const res = await createUserWithEmailAndPassword(FirebaseAuth, email, password);

        const {uid} = res.user;

        await updateProfile(FirebaseAuth.currentUser, displayName);

        return {
            ok: true,
            email,
            displayName,
            uid,
        };
        
    } catch (error) {
        
        console.error(error);

        return {
            ok: false,
            msg: 'User already exists'
        }

    };

};



export const loginWithEmailPassword = async(email, password) => {


    try {

        const res = await signInWithEmailAndPassword(FirebaseAuth, email, password);

        const {uid, displayName, email} = res.user;

        return {
            ok: true,
            displayName,
            email,
            uid,
        }

        
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            msg: "User doesn't exist"
        }
    }


}


export const signInWithGoogle = async() => {

    try {
        const res = await signInWithPopup(FirebaseAuth, googleProvider);

        const {displayName, email, uid} = res.user;

        return {
            ok: true,
            displayName,
            email,
            uid,
        }
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            msg: 'Login Failed'
        }
    }

}