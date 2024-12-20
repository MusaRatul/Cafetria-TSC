import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Food from './Food';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, Outlet } from 'react-router-dom'
const Foods = () => {
    let [foods, setFoods] = useState([]);
    let [type, setType] = useState("");
    let [flag, setFlag] = useState(true);
    let [fetchedfoods, setFetchedfoods] = useState([]);
    useEffect(() => {
        getAllfoods();
    }, []);
    useEffect(() => {
        if (type !== '') {
            const categorizedFoods = fetchedfoods.filter(food => food.tag.toLowerCase() === type);
            setFoods(categorizedFoods);
        } else {
            setFoods(fetchedfoods); // Reset the foods when type is empty
        }
    }, [type, fetchedfoods]);
    // setFoods(fetchedfoods);
    // const handleClick=()=>{
    //     if(flag===true){
    //         const categorizedFoods = fetchedfoods.filter(food => food.tag.toLowerCase() === type);
    //         setFoods(categorizedFoods);
    //         setFlag(false);
    //     }
    // }
    async function getAllfoods() {
        try {
            await axios.get("https://cafeteria-tsc-9lik.onrender.com/foods")
                .then(res => {
                    setFetchedfoods(res.data);
                })
                .catch(err => {

                })
        }
        catch (e) {

        }
    }
    return (
        <div className='container'>
            <Dropdown>
                <Dropdown.Toggle variant="" id="dropdown-basic" >
                    Categories
                </Dropdown.Toggle>
                <Dropdown.Menu className='no-bg'>
                    <div className='d-flex flex-column align-items-center gap-1'>
                        <button className='categorybutton w-100' onClick={() => { setType("breakfast"); setFlag(true); }}>Breakfast</button>
                        <button className='categorybutton w-100' onClick={() => { setType("launch"); setFlag(true); }}>Launch</button>
                        <button className='categorybutton w-100' onClick={() => { setType("dinner"); setFlag(true); }} >Dinner</button>
                        <button className='categorybutton w-100' onClick={() => { setType("snacks"); setFlag(true);  }} >Snacks</button>
                        <button className='categorybutton w-100' onClick={() => { setType("soft drinks"); setFlag(true); }} >Soft Drinks</button>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
            <div className='row'>{
                foods.map((food) => (
                    <div className='col-sm-6 col-md-6 col-lg-4'>
                        <Food foods={food}></Food>
                    </div>
                ))
            }
            </div>
        </div>
    )
}
export default Foods;