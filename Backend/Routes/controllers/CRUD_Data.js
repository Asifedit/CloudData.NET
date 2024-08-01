const express = require("express");
const User = require("../../models/User");
const verifyUser = require("../../middleware/veryfiUser");
const router = express.Router();

// Route to update user data
router.post("/adddata", verifyUser, async (req, res) => {
	const { topic, value } = req.body;
	const UserID = req.tokenvalueandid
	try {
		const user = await User.findById(UserID);
		if (!user) {
			res.status(400).json({ message: "Bad Request please login fast" });
			return;
		}
		user.userData.push({ topic, value });
		await user.save();
		res.status(200).json({ message: "Data added successfully" });
	} catch (error) {
		console.error("Error from /adddata user:", error);
		res.status(500).json({ message: "Server error found"});
	}
});

// Route to delete user data
router.delete("/delete/:id", verifyUser, async (req, res) => {
	const { id } = req.params;
	const UserID = req.tokenvalueandid;
	try {
		const user = await User.findById(UserID);
		if (!user) {
			res.status(400).json({ message: "Bad Request please login fast" });
			return;
		}
		const oldlength = user.userData.length;
		user.userData = user.userData.filter(
			(item) => item._id.toString() !== id
		);

		await user.save();
		const newlength = user.userData.length;
		if (oldlength > newlength) {
			res.status(200).json({
				message: "Data deleted successfully",
			});
			return;
		} else {
			res.status(200).json({
				message: "Data not found",
			});
			return;
		}
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
});

// Router to fatch all data
router.get("/readall", verifyUser, async (req, res) => {
	const UserID = req.tokenvalueandid;
	try {
		const user = await User.findById(UserID);
		if (!user) {
			res.status(400).json({ message: "Bad Request please login fast" });
			return;
		}
		res.status(200).json(user.userData);
	} catch (error) {
		console.log("the errot to fatch data ", error);
	}
});

// update existing data
router.post("/update/:id", verifyUser, async (req, res) => {
	const { topic, value } = req.body;
	const UserID = req.tokenvalueandid;
	const itemId = req.params.id;
	try {
		const user = await User.findById(UserID);
		if (!user) {
			res.status(400).json({ message: "Bad Request please login fast" });
			return;
        }
		await user.userData.map(async (itemsid) => {
			if (itemsid._id.toString() === itemId) {
				itemsid.topic = topic;
				itemsid.value = value;
				await user.save();
				res.status(200).json({ message: "data updated" });
				return true;
			}
		});
	} catch (error) {
		console.error("Error updating user:", error);
		res.status(500).json({ message: "Server error" });
	}
});

module.exports = router;