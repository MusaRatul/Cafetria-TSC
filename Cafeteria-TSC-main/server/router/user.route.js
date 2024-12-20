const express = require("express");
const { signinUser, signupUser, addFoods, deleteFoods, getFoods, updateFoods, getAllusers, deleteUser, showAllfoods, postOrderdetails, showAllorders, sendpassword } = require("../controllers/user.controller");
const routes = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/Images/ForAllFood/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });
routes.post("/login", signinUser);
routes.post("/signup", signupUser);

routes.get("/users", getAllusers);
routes.delete("/users", deleteUser);

routes.get("/foods", showAllfoods)

routes.post("/orderdetails",postOrderdetails)
routes.get("/orderdetails",showAllorders)

routes.get("/controlFoods", getFoods);
routes.put("/controlFoods", upload.single('image1'), updateFoods);
routes.post("/controlFoods", upload.single('image1'), addFoods);
routes.delete("/controlFoods", deleteFoods);

routes.post("/sendpasswordlink", sendpassword);
module.exports = routes;      