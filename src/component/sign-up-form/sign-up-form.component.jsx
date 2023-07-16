import {useState} from 'react';
import { createAuthUserEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-up.styles.scss';
import Button from '../button/button.component';


const defaultFormFields = {
    displayName : '',
    email : '',
    password : '',
    confirmPassword : '',
}

const SignUpForm = () => {
    const [formFields , setFormFields] = useState(defaultFormFields);
    const {displayName,email,password,confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleChange = (event) => {
        const {name , value} = event.target;
        setFormFields({...formFields , [name]:value}); // spread formfields and update the key that has the string stored in variable name by the value vlaue
        
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // to prevent any behaviour
        if(password !== confirmPassword ){
            alert("password do not match");
            return;
        }
        try {
            const {user} = await createAuthUserEmailAndPassword(email , password);
            await createUserDocumentFromAuth(user, {displayName}); // as Signinh in with email and password doesnot return a displayName
            resetFormFields();
        }
        catch(error){
            if(error.code === 'auth/email-already-in-use')
                alert('Cannot create user, email already in use');
            else 
            console.log('userCreationEncounteredanError');
        }
    }; 
    return (
        <div className = 'sign-up-container'>
            <h2>Don't have an account</h2>
            <span>
                Sign up
            </span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                required 
                label = "Display Name"
                type = "text" 
                onChange={handleChange} 
                name = "displayName" 
                value = {displayName}/>
                <FormInput 
                required 
                label = "email"
                type = "email" 
                onChange={handleChange} 
                name = "email"  
                value = {email}
                />
                <FormInput 
                required 
                label = "password"
                type = "password" 
                onChange={handleChange} 
                name = "password"  
                value = {password}/>
                <FormInput 
                required 
                label = "password"
                type = "password" 
                onChange={handleChange} 
                name = "confirmPassword"  
                value = {confirmPassword}/>
                <Button buttonType = 'inverted' type = "submit">Sign Up</Button>
            </form>
        </div>
    ); //h2 used for webscreapping
}
export default SignUpForm;
