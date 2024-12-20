import React, { useContext, useState } from 'react'
import { MyContext } from '../MyContext';

const Cartfoods = ({ food }) => {
  const imageUrl = `Images/ForAllFood/uploads/${food.image}`
  let [quantity, setQuantity] = useState(0);
  let { totalprice, setTotalprice } = useContext(MyContext);
  const addPrice = () => {
    setTotalprice(totalprice + (quantity) * food.price);
    setQuantity(0);
  }

  return (
    <div className=' d-flex flex-wrap mt-3 ms-3 pb-2 align-items-center' style={{ backgroundColor: "beige" }}>
      <div className='ms-3 mt-3'>
        <img src={imageUrl} style={{ width: "80px", height: "80px" }} alt=' '></img>
        <h3>{food.name}</h3>
      </div>
      <div>
        <div>
          <h3 className='mt-2 ms-3'>Quantity: <input type='number' value={quantity} style={{ width: "50%" }} min='0' onChange={(e) => { setQuantity(e.target.value) }}></input></h3>
        </div>
        <div className='ms-3'>
          <h3 >Price: {(quantity) * food.price}</h3>
          <button className='btn' style={{ backgroundColor: "rgb(86 175 98)" }} onClick={addPrice} >Add</button>
        </div>
      </div>
    </div>
  )
}

export default Cartfoods
