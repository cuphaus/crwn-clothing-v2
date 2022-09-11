import { auth, signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect } from "../../../utils/firebase/firebase.utils";
import { useEffect } from "react";
import { getRedirectResult } from 'firebase/auth';
import SignUpForm from "../../sign-up-form/sign-up-form.component";

const SignIn = () => {
    // useEffect(async () => {
    //     const response = await getRedirectResult(auth);

    //     if(response){
    //         const userDocRef = await createUserDocumentFromAuth(response.user);
    //     }
    //     console.log(response);
    // }, [])
    
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        //console.log(response);
        const userDocRef = await createUserDocumentFromAuth(response.user);
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            <SignUpForm />
        </div>
    );
};

export default SignIn;