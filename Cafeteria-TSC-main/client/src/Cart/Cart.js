import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../MyContext'
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Cartfoods from './Cartfoods';
import Button from 'react-bootstrap/Button';
const Cart = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  let { flag, setFlag } = useContext(MyContext);
  let { adminflag, setAdminflag } = useContext(MyContext);
  let { cartfoods, setCartfoods } = useContext(MyContext);
  let { totalprice, setTotalprice } = useContext(MyContext);
  let { userflag, setUserflag } = useContext(MyContext);
  let {userEmail,setUserEmail}=useContext(MyContext);
  
  let [confirm, setConfirm] = useState(false);
  let [phone,setPhone]=useState("");
  let [address,setAddress]=useState("");
  const confirmOrder = async (e) => {
    setShow(true);
    setTotalprice(0);
    e.preventDefault();
    try {
      if (phone===""|| address==="") {
        alert("Fill all the fields");
        setShow(false);
        return;
      }
      await axios.post("https://cafeteria-tsc-9lik.onrender.com/orderdetails", {
        userEmail,phone,totalprice,address
      })
        .then(res => {
          setPhone("");
          setAddress("");
        })
        .catch(e => {
          alert("wrong details")
          console.log(e);
        })
    }
    catch (e) {
      alert("Error occured");
    }
  }
  useEffect(() => {
    if (flag === false)
      setCartfoods([]);
  }, [flag])
  const cancelOrder = () => {
    const confirm = window.confirm("Are you sure want to cancel order?")
    if (confirm)
      setTotalprice(0);
  }
  return (
    <div >
      <div className='row '>
        <div className='col-6 bg-light'>
          <div style={{ width: "70%", margin: "0 auto" }}>
            <h1 className='ms-3'>Chosen foods:</h1>
            {
              cartfoods.map(food => (
                <Cartfoods food={food}></Cartfoods>
              ))
            }
          </div>

        </div>
        <div className='col-6  ' style={{ height: "100vh" }}>
          <div className='ms-2' style={{ position: "fixed" }}>
            <h1>Total Cost:{totalprice}</h1>
          </div>
          {
            !(userflag || adminflag) && (
              <div style={{ position: "fixed", bottom: "100px", border: "1px dotted black" }}>
                <h3>You must login to give order.</h3>
              </div>
            )
          }
          {(userflag || adminflag) && (<div className='p-3' style={{ position: "fixed", bottom: "100px", border: "1px solid black" }}>
            <h3>Fill this form to confirm order:</h3>
            <form method='post'>
              <div>
                <label>Phone: <input className='ms-3' type='text' value={phone} onChange={(e)=>{setPhone(e.target.value)}}></input></label>
              </div>
              <div className='mt-2'>
                <label>Address:<input className='ms-2' type='text' placeholder="Must be in CUET "  onChange={(e)=>{setAddress(e.target.value)}}></input></label>
              </div>
            </form>
            <div className='mt-2'>
              <button className='btn btn-primary' onClick={confirmOrder}>Confirm Order</button>
              <button className='btn btn-danger ms-2' onClick={cancelOrder}>Cancel Order</button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Thank You! Your order is on process!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  We will contact you in 10 mintues. Stay with us.
                </Modal.Body>
              </Modal>
            </div>
          </div>)}
          
        </div>
      </div>

    </div>
  )
}

export default Cart
