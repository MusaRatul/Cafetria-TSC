import React, { useState } from 'react'

const ResetPass = () => {
    const [email, setEmail] = useState("");

    const [message, setMessage] = useState("");

    const setVal = (e) => {
        setEmail(e.target.value)
    }

    const sendLink = async (e) => {
        e.preventDefault();

        if (email === "") {
            alert("Email is required!")
        }
        else {
            const res = await fetch("/sendpasswordlink", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            const data = await res.json();

            if (data.status === 201) {
                setEmail("");
                setMessage(true)
            } 
        }
    }
    return (
        <div className='d-flex justify-content-center'>
            <form method='post' className='d-flex flex-column gap-2' id='loginsection'>
            {message ? <p style={{ color: "green", fontWeight: "bold" }}>pasword reset link send Succsfully in Your Email</p> : ""}
                <div class="form-group row  ">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                        <input type="email" class="ms-2 form-control" onChange={setVal} name="email" id="email" placeholder='Enter Your Email Address' />
                    </div>
                </div>
                
                <div class="form-group row ">
                    <div class="col-sm-10">
                        <button type="submit" class="btn button-style" onClick={sendLink}>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ResetPass
