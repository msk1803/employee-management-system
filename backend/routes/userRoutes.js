const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getUsers);
router.post("/create", userController.createUser);
router.put("/update", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);
router.get("/analytics", userController.getAnalytics);
router.post("/notify", userController.sendEmail);

module.exports = router;
