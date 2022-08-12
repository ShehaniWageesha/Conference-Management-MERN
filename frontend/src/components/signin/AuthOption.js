import React, {useContext} from 'react'
import './AuthOption.css'
import userContext from '../../context/userContext'
import { useHistory } from 'react-router-dom';

// const STYLES = [
//     'btn--primary',
//     'btn--outline'
// ]

// const SIZE = [
//     'btn--medium',
//     'btn--large'
// ]

// export const Button = ({
//     children,
//     type,
//     onclick,
//     buttonStyle,
//     buttonSize
// }) => {

//     const checkBtnStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]
//     const checkBtnSize = SIZE.includes(buttonSize) ? buttonSize : SIZE[0]

//     return (
//         <button className={'btn ${checkBtnStyle} ${checkBtnSize}'} onClick={onclick}
//         type={type}>
//             {children}
//         </button>
//     )
// }

export default function AuthOption(){

    const {userData, setUserData} = useContext(userContext);
    const history =useHistory();

    const signin = () => history.push("/login");
    const signout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", "")
    };

    return(
        <nav className="authOp">
            {userData.user ? (
                <button id="btnlog" className="btnLo" onClick={signout}>Sign Out</button>
            ) : (
                <>
                <button id="btnlog" className="btnLo" onClick={signin}>Sign In</button>
                </>
            
            )}
            
        </nav>
    );
}