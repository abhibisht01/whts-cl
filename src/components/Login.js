import { Button } from '@mui/material';
import React from 'react'
import '../css/login.css'
import { auth, provider } from '../firebase';
import { useStateValue } from '../StateProvider';
import { actionTypes } from './reducer';

function Login() {

    const [{ }, dispatch] = useStateValue('')


    const signIn = () => {

        auth.signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user
                })

            })
            .catch((error) => {

                alert(error.message)
            })



    }
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="" />
                <div className="login__text">
                    <p className='para'>
                        Welcome to the What's App Clone. You can securely login  with Google Account and after logging in
                        you can create groups and chat privately .Don't worry this has nothing to do with your current What's App as the real Whatspp uses Mobile Number to Login In!! and this will autmatically logout once you refresh the Page . Just Login and Please keep the Chats Clean!! Enjoy

                    </p>
                </div>
                <Button type="submit" onClick={signIn} >Sign in With Google</Button>
            </div>
        </div>
    );
}

export default Login