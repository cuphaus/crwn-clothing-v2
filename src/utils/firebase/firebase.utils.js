import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyASS0EFS1QUF2C0h5_ThuYzAoTIfjqdJ_M",
    authDomain: "crwn-clothing-db-8a2f4.firebaseapp.com",
    projectId: "crwn-clothing-db-8a2f4",
    storageBucket: "crwn-clothing-db-8a2f4.appspot.com",
    messagingSenderId: "964348348106",
    appId: "1:964348348106:web:fdaeeb11e47bd57975d633"
  };
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    // check if there's an existing doc ref
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    
    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch(error){
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
};