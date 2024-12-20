import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import './login.css'
import { useNavigate, Link } from 'react-router-dom'
import { MyContext } from '../MyContext';
const Login = () => {
  const history = useNavigate();
  let {flag,setFlag}=useContext(MyContext);
  let {userEmail,setUserEmail}=useContext(MyContext);
  let {userflag,setUserflag}=useContext(MyContext);
  let {adminflag,setAdminflag}=useContext(MyContext);
  let { cartfoods, setCartfoods } = useContext(MyContext);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  useEffect (()=>{
    
    if(flag&&(email==='zh.rahman.2002@gmail.com'||email==="u1904095@student.cuet.ac.bd"||email==="u1904071@student.cuet.ac.bd")) {
      localStorage.setItem("adminloggedIn","true");
      setUserEmail(email);
      setAdminflag(1);
      history("/Admin");
    }
    else if(flag){
      localStorage.setItem("userloggedIn","true");
      setUserEmail(email);
      setUserflag(1);
      history("/Foods");
      
    }
    
  },[email,flag])
  useEffect(()=>{
    if(flag===false)
      setCartfoods([]);
  },[flag])
  async function submit(e) {
    e.preventDefault();

    try {
      if(email===""||password===""){
        alert("Fill all the fields");
        return ;
      }
      await axios.post("https://cafeteria-tsc-9lik.onrender.com/login", {
        email, password
      })
        .then(res => {
          if (res.data === "exist") {
            setFlag(1);
            localStorage.setItem("userloggedIn","false");
            localStorage.setItem("adminloggedIn","false");
          }
          else if (res.data === "notexist") {
            alert("User have not sign up")
          }
        })
        .catch(e => {
          alert("wrong details")
          console.log(e);
        })
    }
    catch (e) {
      console.log(e);

    }

  }
  return (
    <div className='d-flex justify-content-center '>
      <section >
        <form method='post' className='d-flex flex-column gap-2' id='loginsection'>
          <div class="form-group row  ">
            <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
              <input type="email" class="ms-2 form-control" id="inputEmail3" placeholder="Email" onChange={(e) => { setEmail(e.target.value);  }} />
            </div>
          </div>
          <div class="form-group row">
            <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
            <div class="col-sm-10">
              <input type="password" class="ms-2 form-control" id="inputPassword3" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
            </div>
          </div>
          <div >
            <p>Forget Password? <Link className='link' to="/password-reset" ><b>Click here to reset password</b></Link></p>
          </div>

          <div class="form-group row ">
            <div class="col-sm-10">
              <button type="submit" class="btn button-style" onClick={submit}>Log in</button>
            </div>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Login
