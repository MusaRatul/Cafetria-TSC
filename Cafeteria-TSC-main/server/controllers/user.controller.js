const user = require("../models/user.model");
const foods = require("../models/foods.model");
const orderdetails = require("../models/order-details")
const multer = require('multer');
const signinUser = async (req, res) => {
    const { email, password } = req.body;
    const data = {
        email: email,
        password: password
    }
    try {
        const check = await user.findOne({ email: email })
        if (check&&check.email===email) {
            res.json("exist")
        }
        else {
            res.json("notexist")
        }
    }
    catch (err) {
        res.json("fail");
    }
}
const signupUser = async (req, res) => {
    const { email, password } = req.body;
    const data = {
        email: email,
        password: password
    }
    try {
        const check = await user.findOne({ email: email })
        if (check) {
            res.json("exist")
        }
        else {
            res.json("notexist")
            await user.insertMany([data]);
        }
    }
    catch (err) {
        res.json("fail");
    }
}
const getAllusers = async (req, res) => {
    try {
        const users = await user.find();
        if (users) {
            res.json(users);
        }
        else {
            res.json("No users");
        }
    }
    catch (err) {

    }
}
const deleteUser = async (req, res) => {
    const id = req.query.id;
    try {
        const deletedUser = await user.deleteOne({ _id: id });
        if (deletedUser) {
            res.json(deletedUser);
        }
        else {
            res.json("Error");
        }
    }
    catch (err) {
        res.json(err);
    }
}
const addFoods = async (req, res) => {
    const { id1, name1, price1, description1, tag1 } = req.body;
    const imagePath = req.file.filename;
    const data = {
        id: id1,
        name: name1,
        price: price1,
        image1: imagePath,
        description: description1,
        tag: tag1
    }
    try {
        const check = await foods.findOne({ id: id1 });
        if (check) {
            res.json("exist");
        }
        else {
            res.json("notexist");
            await foods.insertMany([data]);
        }
    }
    catch (err) {
        res.json("fail");
    }

}
const updateFoods = async (req, res) => {
    const id = req.query.id;
    const { id1, name1, price1, description1, tag1 } = req.body;
    const imagePath = req.file.filename;
    const updatefood = {
        id: id1,
        name: name1,
        price: price1,
        image1: imagePath,
        description: description1,
        tag: tag1
    }
    try {
        const updatedFood = await foods.findOneAndUpdate({ id: id }, updatefood, { new: true });
        if (updatedFood) {
            res.json(updatedFood);
        }
        else {
            res.json("Error");
        }
    }
    catch (err) {
        res.json(err);
    }
}
const deleteFoods = async (req, res) => {
    const id = req.query.id;
    try {
        const deletedFood = await foods.findOneAndDelete(id);
        if (deletedFood) {
            res.json(deletedFood.value);
        }
        else {
            res.json("Error");
        }
    }
    catch (err) {
        res.json(err);
    }
}
const getFoods = async (req, res) => {
    const id = req.query.id;
    try {
        const foundFood = await foods.findOne({ id: id });

        if (foundFood) {
            res.json(foundFood);
        }
        else {
            res.json("notexist");
        }
    }
    catch (err) {
        res.json("error")
    }

}
const showAllfoods = async (req, res) => {
    try {
        const food = await foods.find();
        res.json(food);
    }
    catch {
        res.json("error");
    }
}
const postOrderdetails = async (req, res) => {
    const { userEmail, phone, totalprice, address} = req.body;
    const data = {
        email: userEmail,
        phone: phone,
        amount: totalprice,
        address: address,
        date: Date.now(),
    }
    try {
        await orderdetails.insertMany([data]);
        res.json(req.body)
    }
    catch (err) {
        res.json("err");
    }
}
const showAllorders=async(req,res)=>{
    try {
        const order = await orderdetails.find();
        res.json(order);
    }
    catch {
        res.json("error");
    }
}
const sendpassword=async(req,res)=>{
    
}
module.exports = { signinUser, signupUser, addFoods, deleteFoods, getFoods, updateFoods, getAllusers, deleteUser, showAllfoods,postOrderdetails, showAllorders,sendpassword }