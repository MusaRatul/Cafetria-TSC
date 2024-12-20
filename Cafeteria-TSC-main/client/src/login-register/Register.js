import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios"
const Register = () => {
  const history = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function submit(e) {
    e.preventDefault();

    try {
      if(email===""||password===""){
        alert("Fill all the fields");
        return ;
      }
      await axios.post("https://cafeteria-tsc-9lik.onrender.com/signup", {
        email, password
      })
        .then(res => {
          if (res.data ==="exist") {
            alert("User already exists")
          }
          else if(res.data === "notexist") {
              alert("You have successfully signed up! Now log in to proceed.")
             history("/login")
          }
        })
        .catch(e =>{
          alert(e.message)
          console.log(e.message);
        })

    }
    catch (e) {
      console.log(e);

    }

  }

  return (
    <div className='d-flex justify-content-center '>
      <section >
        <form className='d-flex flex-column gap-2' id='loginsection'>
      
          <div class="form-group row  ">
            <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
              <input type="email" class="ms-3 form-control" id="inputEmail3" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }}/>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
            <div class="col-sm-10">
              <input type="password" class="ms-3 form-control" id="inputPassword3" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
            </div>
          </div>
          <div class="form-group row ">
            <div class="col-sm-10">
              <button type="submit" class="btn btn-lg button-style" onClick={submit}>Submit</button>
            </div>
          </div>


        </form>
      </section>
    </div>
  )
}

export default Register
