import {useState} from 'react';
import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss';
import Button from '../button/button.component';
import {signInWithGooglePopup , signInAuthInWithEmailAndPassword} from "../../utils/firebase/firebase.utils"; 

const defaultFormFields = {
    email : '',
    password : '',
}

const SignInForm = () => {
    const [formFields , setFormFields] = useState(defaultFormFields);
    const {email,password} = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleChange = (event) => {
        const {name , value} = event.target;
        setFormFields({...formFields , [name]:value}); // spread formfields and update the key that has the string stored in variable name by the value vlaue
        
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // to prevent any behaviour
        try {
            await signInAuthInWithEmailAndPassword(email,password);
            resetFormFields();
        }catch(error)
        {
            switch(error.code){
                case 'auth/wrong-password' : alert("incorrect password"); return;
                default : alert ("user isn't registered");
            }  
        }
    }; 
    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    } 
    // const logGoogleRedirect = async () => {
    //     const {user} = await signInWithGoogleRedirect();
    //     console.log(user);
    //     const userDocRef = await createUserDocumentFromAuth(user);
    // } // no need for this function

    return (
        <div className = 'sign-up-container'>
            <h2>Already have an account</h2>
            <span>
                Sign in with your email and password
            </span>
            <form onSubmit={handleSubmit}>
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
                <div className='buttons-container'>
                <Button  type = "submit" >Sign in</Button>
                <Button type = 'button' buttonType = 'google' onClick = {signInWithGoogle}>Google Sign in</Button>
                </div>
             </form>
        </div>
    ); //h2 used for webscreapping
}
export default SignInForm;
