const express = require("express");
const { Register, Login, getUsers, updateUser, deleteUser, changePassword } = require("../controller/UserController");
const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.post('/changePassword', changePassword);
router.get('/getUsers', getUsers);
router.put('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);

module.exports = router;
