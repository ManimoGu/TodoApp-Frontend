import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import "../Styles/auth.css"
import Axios from 'axios'
import { Pass } from '../models/PassConfirm'
import { info } from '../models/reset'

const cssCDN = "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"

const ResetPasswordPage=() =>{


const [verifInfo,setverifInfo] = useState(new info())


    useEffect(() => {
        let _headContent = document.querySelector("head").innerHTML

        document.querySelector("head").innerHTML =
            `<link  rel="stylesheet" href=${cssCDN} />` + _headContent

            let lin = window.location.href.split('/')
            setverifInfo({email: lin[4], token : lin[6]})


        return () => document.querySelector("head link:first-child").remove()

    }, [])

    const [PassInfo, setPassInfo] = useState(new Pass())

     //state for erreurs
    const [ErrorMsg, setErrorMsg] = useState("");

 const HandelInputChange = (event) =>{

    setPassInfo({...PassInfo, [event.target.name] : event.target.value})

   }

   const infovalidation = (e) =>{
     
    e.preventDefault()

  
   //PassWord
   let pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/

   if (
     pattern.test(PassInfo.password) === false || pattern.test(PassInfo.passconfirm) === false
     
   ) {
       
     setErrorMsg("The password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special characte");
     return;
   }

      if(ErrorMsg === "") { Axios.post(`http://localhost:9000/api/resetpassword/${verifInfo.email}/code/${verifInfo.token}`, PassInfo)
      .then(data => console.log(data))
      .catch(err => console.log(err))
}

} 


    return (
        <div className="container">
            <div className="d-flex justify-content-center h-100">
                <div className="card card-custom">
                    <div className="card-header">
                        <h3 style={{ marginTop: 15 }}>Reset Password</h3>
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
                                    <span className="input-group-text"><i className="fas fa-key" ></i></span>
                                </div>
                                <input type="password" className="form-control" placeholder="New Password" name = "password" onFocus={()=>setErrorMsg("")} onChange={HandelInputChange}/>
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-key" ></i></span>
                                </div>
                                <input type="password" className="form-control" placeholder="Confirm New Password" name= "passconfirm" onFocus={()=>setErrorMsg("")} onChange={HandelInputChange}/>
                            </div>
                            <div className="form-group">
                                <input type="submit" value="Change " className="btn float-right login_btn" />
                            </div>
                        </form>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex justify-content-center links">
                            Already have an account ? <Link to="/"><a>Sign In</a></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ResetPasswordPage