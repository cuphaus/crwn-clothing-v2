import { useState } from "react";
import {  
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
 } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

const SignInForm = () => {
    const defaultFormFields = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
            
        try {
            await signInAuthUserWithEmailAndPassword(email, password);

            //console.log(user);
            resetFormFields();
        } catch (err) {
            switch(err.code){
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                default:
                    console.log(err);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    };

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                    type="email"
                />
                <FormInput 
                    label="Password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                    type="password"
                />
                <div className="buttons-container">
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;