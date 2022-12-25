import {useState} from 'react';

const defaultFormFields = {
    displayName : '',
    email : '',
    password : '',
    confirmPassword : '',
}

const SignUpForm = () => {
    const [formFields , setFormFields] = useState(defaultFormFields);
    const {displayName,email,password,confirmPassword} = formFields;

    console.log(formFields);

    const handleChange = (event) => {
        const {name , value} = event.target;
        setFormFields({...formFields , [name]:value}); // spread formfields and update the key that has the string stored in variable name by the value vlaue
        
    }
    return (
        <div>
            <h1>
                Sign up
            </h1>
            <form onSubmit={() => {}}>
                <label>Display name</label>
                <input required type = "text" onChange={handleChange} name = "displayName" value = {displayName}/>
                <label>Email</label>
                <input required type = "email" onChange={handleChange} name = "email"  value = {email}/>
                <label>Password</label>
                <input required type = "password" onChange={handleChange} name = "password"  value = {password}/>
                <label>Confirm Password</label>
                <input required type = "password" onChange={handleChange} name = "confirmPassword"  value = {confirmPassword}/>
                <button type = "submit">Sign Up</button>
            </form>
        </div>
    );
}
export default SignUpForm;
