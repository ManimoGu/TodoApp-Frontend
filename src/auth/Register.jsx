import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "/src/Styles/auth.css"
import  Axios from 'axios'

const cssCDN = "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"

class user {

constructor(firstname="", lastname="", email="", password="", passconfirm=""){

    this.firstname = firstname,
    this.lastname = lastname,
    this.email = email,
    this.password = password,
    this.passconfirm = passconfirm

}

}

const RegisterPage =() => {

    useEffect(() => {
        let _headContent = document.querySelector("head").innerHTML

        document.querySelector("head").innerHTML =
            `<link  rel="stylesheet" href=${cssCDN} />` + _headContent

        return () => document.querySelector("head link:first-child").remove()

    }, [])


    // where to stock inputs 
    const [newuser, setNewuser] = useState(new user());
    //state for erreurs
    const [ErrorMsg, setErrorMsg] = useState("");

    const HandelInputChange = (event) =>{

     setNewuser({...newuser, [event.target.name] : event.target.value})

    }
    // data validation 



    const infovalidation = (e) =>{
     
       e.preventDefault()
   
        // FirstName

    /*    let firstnamePattern = /^.{4,12}$/

    if (!firstnamePattern.test(newuser.firstname)) {
        setErrorMsg("firstname should contain from 4 to 20 caracters");
        return;
      }
  
      //LastName
      let lastnamePattern = /^.{4,12}$/
      if (! lastnamePattern.test(newuser.lastname)) {
        setErrorMsg("lastname should contain from 4 to 20 caracters");
        return;
      }
  
      //PassWord
      let pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/
  
      if (
        pattern.test(newuser.password) === false
        
      ) {
          
        setErrorMsg("The password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special characte");
        return;
      }
  
      //Username Email

      let pattern_email = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  
  
     if (
        pattern_email.test(newuser.email) === false
        
      ) {
          
        setErrorMsg("Email Should be like : Example@Example.com");
        return;
      }*/
  

      if(ErrorMsg==""){
        Axios.post('http://localhost:9000/api/auth/register',newuser)
        .then(data=>console.log(data))
        .catch(err=> setErrorMsg(err?.response?.data?.message))
      }

    }

      console.log(window.location.href)

    return (
        <div className="container">
            <div className="d-flex justify-content-center h-100">
                <div className="card">
                    <div className="card-header">
                        <h3>Sign Up</h3>
                        <div className="d-flex justify-content-end social_icon">
                            <span><i className="fab fa-facebook-square" ></i></span>
                            <span><i className="fab fa-google-plus-square" ></i></span>
                            <span><i className="fab fa-twitter-square" ></i></span>
                        </div>
                    </div>
                    <div className={ErrorMsg == "" ? "d-none" : "alert alert-danger"}>

                    {ErrorMsg}
                    
                    </div>
                    <div className="card-body">
                        <form onSubmit={infovalidation}>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-user" ></i>
                                    </span>
                                </div>
                                <input type="text" className="form-control" name = "firstname" placeholder="Firstname" onFocus={()=>setErrorMsg("")} onChange={HandelInputChange}/>
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-user" ></i>
                                    </span>
                                </div>
                                <input type="text" className="form-control" name = "lastname" placeholder="Lastname" onFocus={()=>setErrorMsg("")} onChange={HandelInputChange}/>
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="fas fa-at" ></i>
                                    </span>
                                </div>
                                <input type="text" className="form-control" name = "email" placeholder="Email" onFocus={()=>setErrorMsg("")} onChange={HandelInputChange} />
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-key" ></i></span>
                                </div>
                                <input type="password" className="form-control" name = "password" placeholder="Password" onFocus={()=>setErrorMsg("")} onChange={HandelInputChange}/>
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-key" ></i></span>
                                </div>
                                <input type="password" className="form-control" name = "passconfirm" placeholder="Confirm Password" onFocus={()=>setErrorMsg("")} onChange={HandelInputChange}/>
                            </div>
                            <div className="form-group">
                                <input nFocus={()=> 
                                    setErrorMsg("")
                                } type="submit" value="Register" className="btn float-right login_btn" />
                            </div>
                        </form>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex justify-content-center links">
                            Already have an account ? <Link to="/Login">  <a > Sign In</a> </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default RegisterPage