import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "../Styles/auth.css"
import  Axios  from 'axios'

const cssCDN = "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"

const ForgetPasswordPage = () => {
    useEffect(() => {
        let _headContent = document.querySelector("head").innerHTML

        document.querySelector("head").innerHTML =
            `<link  rel="stylesheet" href=${cssCDN} />` + _headContent

        return () => document.querySelector("head link:first-child").remove()

    }, [])

const [Email, setEmail] = useState("");
//state for erreurs
const [ErrorMsg, setErrorMsg] = useState("");




const infovalidation = (e) =>{
     
    e.preventDefault()


   //Username Email

   let pattern_email = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/


  if (
     pattern_email.test(Email) === false
     
   ) {
       
     setErrorMsg("Email Should be like : Example@Example.com");
     return;
   }

      if(ErrorMsg === "") { Axios.post(`http://localhost:9000/api/fogot_password/${Email}`)
      .then(data => console.log(data))
      .catch(err => console.log(err))
}

} 



    return (
        <div className="container">
            <div className="d-flex justify-content-center h-100">
                <div className="card card-custom">
                    <div className="card-header">
                        <h3 style={{ marginTop: 15 }}>Forget Password</h3>
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
                                    <span className="input-group-text"><i className="fas fa-at" ></i></span>
                                </div>
                                <input type="email" className="form-control" placeholder="Confirm Your Email" onChange={(e)=> setEmail(e.target.value)} onFocus={()=> setErrorMsg("")}/>
                            </div>
                            <div className="form-group">
                                <input type="submit" value="Send" className="btn float-right login_btn" />
                            </div>
                        </form>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex justify-content-center links">
                            Don't have an account ? <Link to="/register">
                                <a>Sign Up</a></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ForgetPasswordPage