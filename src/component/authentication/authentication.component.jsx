import SignUpForm from "../sign-up-form/sign-up-form.component";
import SignInForm from "../sign-in-form/sign-in-form.component";
import "./authentication.styles.scss";
const Authentication = () => {
//     useEffect( () => {
//         async function getData(){
//             const response = await getRedirectResult(auth);
//             console.log(response);
//         }
//         getData();
//    } , []); //happens when we mount

    return (
        <div className = 'authentication-container'>
            <SignInForm/>
            <SignUpForm/>
        </div>
    );
}
export default Authentication