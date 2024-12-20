import React, { useRef, useState } from 'react'
import axios from 'axios';
import './admin.css';
const Admin = () => {
    let [id, setId] = useState("");
    let [name, setName] = useState("");
    let [price, setPrice] = useState("");
    let [description, setDescription] = useState("");
    let [tag, setTag] = useState("");
    let [image, setImage] = useState(null);

    let [id1, setId1] = useState("");
    let [name1, setName1] = useState("");
    let [price1, setPrice1] = useState("");
    let [image1, setImage1] = useState(null);
    let [description1, setDescription1] = useState("");
    let [tag1, setTag1] = useState("");
    let [showuser, setShowuser] = useState(false);
    let [users, setUsers] = useState([]);
    let [showOrders, setShowOrders] = useState(false);
    let [orders, setOrders] = useState([]);
    const inputRef = useRef(null);
    const handleImage1Change = (e) => {
        setImage1(e.target.files[0]);
    }
    async function AddFoodSubmit(e) {
        e.preventDefault();

        try {
            if (id1 === "" || name1 === "" || price1 === "" || image1 === null || description1 === "" || tag1 === "") {
                alert("Fill all the fields")
                return;
            }
            let formData = new FormData();
            formData.append('id1', id1);
            formData.append('name1', name1);
            formData.append('price1', price1);
            formData.append('image1', image1);
            formData.append('description1', description1);
            formData.append('tag1', tag1);
            console.log(formData);
            await axios.post("https://cafeteria-tsc-9lik.onrender.com/controlFoods", formData)
                .then(res => {
                    if (res.data === "exist") {
                        alert("Food Already exists!");
                    }
                    else if (res.data === "notexist") {
                        alert("Food added successfully!")
                        setId1("");
                        setName1("");
                        setPrice1("");
                        setImage1(null);
                        setDescription1("");
                        setTag1("");

                    }
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
    async function UpdateFoodSubmit(e) {
        e.preventDefault();
        const temp = inputRef.current.value;
        setId(temp);
        if (id === "") {
            alert("You must provide a id to update or, delete the food.")
            return;
        }
        let formData = new FormData();
        formData.append('id', id);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('image1', image1);
        formData.append('description', description);
        formData.append('tag', tag);
        try {
            await axios.put(`https://cafeteria-tsc-9lik.onrender.com/controlFoods?id=${id}`, formData)
                .then(res => {
                    alert("Food item updated successfully!");
                })
                .catch(e => {
                    alert("Updation failed!")
                    console.log(e);
                })
        }
        catch (e) {
            alert("Error occured");
        }
    }
    async function checkfood(e) {
        e.preventDefault();
        try {
            const temp = inputRef.current.value;
            setId(temp);
            if (id === "") {
                alert("You must provide a id to update or, delete the food.")
                return;
            }
            await axios.get(`https://cafeteria-tsc-9lik.onrender.com/controlFoods?id=${id}`)
                .then(res => {
                    if (res.data === "notexist") {
                        alert("There is no food with this ID")
                    }
                    else {
                        setId(res.data.id);
                        setName(res.data.name);
                        setPrice(res.data.price);
                        setImage(res.data.image);
                        setDescription(res.data.description);
                        setTag(res.data.tag);
                    }
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
    async function DeleteFoodSubmit(e) {
        e.preventDefault();
        const temp = inputRef.current.value;
        setId(temp);

        if (id === "") {
            alert("You must provide a id to update or, delete the food.")
            return;
        }
        const confirm = window.confirm("Are you sure want to delete it?");
        if (confirm) {
            try {
                await axios.delete(`https://cafeteria-tsc-9lik.onrender.com/controlFoods?id=${id}`)
                    .then(res => {
                        window.confirm("Food item deleted!");
                        setId("");
                        setName("");
                        setPrice("");
                        setImage("");
                        setDescription("");
                        setTag("");
                    })
                    .catch(e => {
                        alert("Deletion failed!")
                    })
            }
            catch (e) {
                alert("Error occured");
            }
        }
        else {
            return;
        }

    }
    async function showAllUsers() {
        setShowuser(!showuser);
        try {
            await axios.get("https://cafeteria-tsc-9lik.onrender.com/users")
                .then(res => {
                    setUsers(res.data);
                })
                .catch(err => {
                })
        }
        catch (err) {
            alert("Error caught");
        }
    }
    async function deleteUser(user_id) {
        const confirm = window.confirm("Are you sure want to delete this user?")
        if (confirm) {
            try {
                await axios.delete(`https://cafeteria-tsc-9lik.onrender.com/users?id=${user_id}`)
                    .then(res => {
                        showAllUsers();
                    })
                    .catch(err => {

                    })
            }
            catch (err) {
                alert("Error caught");
            }
        }
        else {
            return;
        }

    }
    async function showAllOrder() {
        setShowOrders(!showOrders)
        try {
            await axios.get("https://cafeteria-tsc-9lik.onrender.com/orderdetails")
                .then(res => {
                    setOrders(res.data);
                })
                .catch(err => {
                })
        }
        catch (err) {
            alert("Error caught");
        }
    }
    return (
        <div className='m-4'>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6'>
                        <h3>Create your food item</h3>
                        <form method='post' enctype="multipart/form-data">
                            <div class="form-group">
                                <label >Food ID:</label>
                                <input type="text" class="form-control w-50" placeholder="ID" value={id1} onChange={(e) => { setId1(e.target.value) }} required />
                            </div>
                            <div class="form-group">
                                <label >Food Name:</label>
                                <input type="text" class="form-control w-50" placeholder="Enter Name" value={name1} onChange={(e) => { setName1(e.target.value) }} required />
                            </div>
                            <div class="form-group">
                                <label >Price:</label>
                                <input type="text" class="form-control w-50" placeholder="Food Price" value={price1} required onChange={(e) => { setPrice1(e.target.value) }} />
                            </div>
                            <div class="form-group">
                                <label >Image</label>
                                <input type="file" name='image1' class="form-control w-50" onChange={handleImage1Change} required />
                            </div>
                            <div class="form-group">
                                <label >Description:</label>
                                <input type="text" class="form-control w-50" placeholder="Food description" value={description1} onChange={(e) => { setDescription1(e.target.value) }} required />
                            </div>
                            <div class="form-group">
                                <label >Tag:</label>
                                <input type="text" class="form-control w-50" placeholder="Food Tag" value={tag1} onChange={(e) => { setTag1(e.target.value) }} required />
                            </div>
                            <button type="submit" class="btn btn-primary mt-2" onClick={AddFoodSubmit} >Add Food</button>
                        </form>
                    </div>
                    <div className='col-sm-12 col-md-6 mt-3'>
                        <h3>Customize your food item</h3>
                        <div>
                            <input type='text' placeholder=' Search by food ID' ref={inputRef}></input>
                            <button type="submit" class="btn btn-primary ms-2" onClick={checkfood}>Search</button>
                        </div>

                        <form method='POST' enctype="multipart/form-data">
                            <div class="form-group">
                                <label >Food Name:</label>
                                <input type="text" class="form-control w-50" placeholder="Enter Name" onChange={(e) => { setName(e.target.value) }} required value={name} />
                            </div>
                            <div class="form-group">
                                <label >Price:</label>
                                <input type="text" class="form-control w-50" placeholder="Food Price" required onChange={(e) => { setPrice(e.target.value) }} value={price} />
                            </div>
                            <div class="form-group">
                                <label >Image</label>
                                <input type="file" class="form-control w-50" placeholder="Image" name='image1' onChange={handleImage1Change} required />
                            </div>
                            <div class="form-group">
                                <label >Description:</label>
                                <input type="text" class="form-control w-50" placeholder="Food description" onChange={(e) => { setDescription(e.target.value) }} required value={description} />
                            </div>
                            <div class="form-group">
                                <label >Tag:</label>
                                <input type="text" class="form-control w-50" placeholder="Food Tag" onChange={(e) => { setTag(e.target.value) }} required value={tag} />
                            </div>
                            <button type="submit" class="btn btn-primary mt-2" onClick={UpdateFoodSubmit} >Update Food</button>
                            <button type="submit" class="ms-4 btn btn-danger mt-2" onClick={DeleteFoodSubmit} >Delete Food</button>
                        </form>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6 col-sm  bg-light'>
                        <button className='btn-info btn mt-4' onClick={showAllUsers}>{showuser ? "Hide Users" : "Show Users"}</button>
                        <button className='btn-info btn mt-4' style={{ position: "absolute", right: "50px" }} onClick={showAllOrder}>{showOrders ? "Hide Order Details" : "Show Order Details"}</button>
                        {showuser && (
                            users.map((user) => (

                                <div className='col-md-7 col-sm- bg-dark bg-gradient m-3 p-2' key={user._id}>
                                    <div className='d-flex flex-row justify-content-between '>
                                        <div>
                                            <p className='box'>Email: {user.email}</p>
                                            <p className='box'>: {user._id}</p>
                                        </div>
                                        <img className='mt-3' src='Images/icons/user.png' style={{ height: "50px", width: "50px" }} alt=''></img>
                                    </div>

                                    <button className='btn btn-danger mb-2' onClick={() => { deleteUser(user._id) }}>Delete</button>

                                </div>
                            ))


                        )}
                    </div>
                    <div className='col-md-6'>
                        
                        {showOrders && (

                            
                                orders.map((order) => (
                                    <div className='row'>
                                        <div className='col-md-6 bg-dark bg-gradient m-3 p-2' key={order._id}>
                                            <div className='d-flex flex-row justify-content-between '>
                                                <div>
                                                    <p className='box'>Email: {order.email}</p>
                                                    <p className='box'>Address: {order.address}</p>
                                                    <p className='box'>Phone: {order.phone}</p>
                                                    <p className='box'>Amount of order: {order.amount}</p>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            

                        )
                        }</div>
                </div>
            </div>
        </div>

    )
}
export default Admin
