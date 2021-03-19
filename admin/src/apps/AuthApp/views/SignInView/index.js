import "./style.css"
import { useState } from "react"

export { SignInView }

function SignInView() {
    const [emailInp, setEmailInp] = useState()
    const [pwInp, setPwInp]       = useState()
    
    return (
        <div className="sign-in-view">
            <h1 className="logo">CONNAPPTIVITY</h1>
            <div className="sign-in-container">
                <div className="sign-in-element">
                    <h1>Sign In</h1>

                    <div className="input-container">
                        <label>E-Mail</label>
                        <input type="email" ref={ setEmailInp }/>
                    </div>
                    <div className="input-container">
                        <label>Password</label><br/>
                        <input type="password" ref={ setPwInp }/>
                    </div>

                    <button className="sign-in-button">Sign In</button>
                    <button className="forgot-pw-button">Forgot Password</button>
                </div>
            </div>
        </div>
    )
}