import {auth,createUserDocumentFromAuth,  signInWithGooglePopup , signInWithGoogleRedirect} from "../utils/firebase/firebase.utils"; 
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth"; 
import SignUpForm from "../component/sign-up-form/sign-up-form.component";

const SignIn = () => {
//     useEffect( () => {
//         async function getData(){
//             const response = await getRedirectResult(auth);
//             console.log(response);
//         }
//         getData();
//    } , []); //happens when we mount
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        console.log(user);
        const userDocRef = await createUserDocumentFromAuth(user);
    } 
    const logGoogleRedirect = async () => {
        const {user} = await signInWithGoogleRedirect();
        console.log(user);
        const userDocRef = await createUserDocumentFromAuth(user);
    } // no need for this function


    return (
        <div>
            <h1>Sign in page</h1>
            <button onClick = {logGoogleUser}>
                Sign in with google popup
            </button>
            <SignUpForm/>
        </div>
    );
}
export default SignIn