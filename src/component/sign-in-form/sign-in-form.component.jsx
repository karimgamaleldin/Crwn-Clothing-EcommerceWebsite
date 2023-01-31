import {useState , useContext} from 'react';
import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss';
import Button from '../button/button.component';
import {auth,createUserDocumentFromAuth,  signInWithGooglePopup , signInAuthInWithEmailAndPassword} from "../../utils/firebase/firebase.utils"; 
import { UserContext } from '../../contexts/user.context';

const defaultFormFields = {
    email : '',
    password : '',
}

const SignInForm = () => {
    const [formFields , setFormFields] = useState(defaultFormFields);
    const {email,password} = formFields;
    const {setCurrentUser} = useContext(UserContext);

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
            const {user} = await signInAuthInWithEmailAndPassword(email,password);
            setCurrentUser(user);
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
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
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
