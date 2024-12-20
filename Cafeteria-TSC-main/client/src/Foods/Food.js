import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './foods.css'
import { MyContext } from '../MyContext';
export default function Food({ foods }) {
    let { cartfoods, setCartfoods } = useContext(MyContext);
    let { userEmail, setUserEmail } = useContext(MyContext);
    let { userflag, setUserflag } = useContext(MyContext);
    let { adminflag, setAdminflag } = useContext(MyContext);
    const [quantity, setQuantity] = useState(1);
    const [show, setShow] = useState(false);
    let imageUrl = `/Images/ForAllFood/uploads/${foods.image1}`;
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const addFoodtoCart = () => {
        const food = {
            id: foods.id,
            name: foods.name,
            price: foods.price,
            image: foods.image1,
        }
        cartfoods.push(food);
    }
    return (
        <div className='m-4 p-4 d-flex flex-column card custom-card'>
            <div onClick={handleShow}>
                <img src={imageUrl} className="img-fluid" style={{ height: "200px", width: "450px" }} alt='' id='food-image' />
            </div>
            <h2 className='text-center'>{foods.name}</h2>
            <div className='d-flex justify-content-between mt-2'>
                <div className=''>
                    <h3>Price: {foods.price} </h3>
                </div>
                <div className=''>
                    <button className='btn button-style' onClick={addFoodtoCart} >ADD TO CART</button>
                </div>
            </div>

        </div>
    );
}
