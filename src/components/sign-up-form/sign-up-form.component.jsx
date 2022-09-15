import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";

const SignUpForm = () => {
    const defaultFormFields = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // check that passwords are equivalent
        if(password !== confirmPassword){
            alert("passwords do not match");
            return;
        } 
            
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (err) {
            if(err.code === "auth/email-already-in-use"){
                alert("Cannnot create user, email already in use");
            } else {
                console.log(err);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Display Name"
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={displayName}
                    type="text"
                />
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
                <FormInput 
                    label="Confirm Password"
                    required
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                    type="password"
                />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;