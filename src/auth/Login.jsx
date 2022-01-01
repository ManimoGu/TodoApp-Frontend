import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { credentials } from '../models/Credentials'
import Axios from 'axios'


import "../Styles/auth.css"

const cssCDN = "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"

function LoginPage() {

    useEffect(() => {
        let _headContent = document.querySelector("head").innerHTML

        document.querySelector("head").innerHTML =
            `<link  rel="stylesheet" href=${cssCDN} />` + _headContent

        return () => document.querySelector("head link:first-child").remove()

    }, [])


    // where to stock inputs 
    const [LoginInfos, setLoginInfos] = useState(new credentials());
    //state for erreurs
    const [ErrorMsg, setErrorMsg] = useState("");

    const HandelInputChange = (event) =>{

        setLoginInfos({...LoginInfos, [event.target.name] : event.target.value})
   
       }

    const infovalidation = (e) =>{
     
        e.preventDefault()
    
   
       //PassWord
       let pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/
   
       if (
         pattern.test(LoginInfos.password) === false
         
       ) {
           
         setErrorMsg("The password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special characte");
         return;
       }
   
       //Username Email
 
       let pattern_email = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
   
   
      if (
         pattern_email.test(LoginInfos.email) === false
         
       ) {
           
         setErrorMsg("Email Should be like : Example@Example.com");
         return;
       }

          if(ErrorMsg === "") { Axios.post(`http://localhost:9000/api/Login/${LoginInfos.email}/pass/${LoginInfos.password}`, LoginInfos)
          .then(data => console.log(data))
          .catch(err => console.log(err))
    }

    } 



    return (
        <div className="container">
            <div className="d-flex justify-content-center h-100">
                <div className="card">
                    <div className="card-header">
                        <h3>Sign In</h3>
                        <div className="d-flex justify-content-end social_icon">
                            <span><i className="fab fa-facebook-square" ></i></span>
                            <span><i className="fab fa-google-plus-square" ></i></span>
                            <span><i className="fab fa-twitter-square" ></i></span>
                        </div>
                    </div>
                    <div className="card-body">
                        <form onSubmit={infovalidation}>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="fas fa-user" ></i></span>
                                </div>
                                <input type="text" className="form-control" placeholder="username" name = "email" onFocus={()=>setErrorMsg("")} onChange={HandelInputChange}/>
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-key" ></i></span>
                                </div>
                                <input type="password" className="form-control" placeholder="password" name ="password" onFocus={()=>setErrorMsg("")} onChange={HandelInputChange}/>
                            </div>
                            <div className="row align-items-center remember">
                                <input type="checkbox" />Remember Me
                            </div>
                            <div className="form-group">
                                <input type="submit" value="Login" className="btn float-right login_btn" />
                            </div>
                        </form>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex justify-content-center links">
                            Don't have an account ? <Link to="/register"><a>Sign Up</a></Link>
                        </div>
                        <div className="d-flex justify-content-center">
                            <Link to="/ForgottenPass">
                                <a>Forgot your password?</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LoginPage