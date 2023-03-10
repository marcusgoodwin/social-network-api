const { User } = require("../models");

module.exports = {
// Get all users
getAllUsers : async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get all users" });
  }
},

// Get a single user by ID
getUserById : async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get user by id" });
  }
},

// Create a user
createUser : async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create user" });
  }
},

// Update a user by ID
updateUserById : async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // return the updated document
        runValidators: true, // validate the updates against the schema
      }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update user by id" });
  }
},
// Add a friend
addFriend : async (req, res) => {
    try {
      const { userId, friendId } = req.params;
      const [user, friend] = await Promise.all([
        User.findById(userId),
        User.findById(friendId),
      ]);
      if (!user || !friend) {
        return res.status(404).json({ message: "User or friend not found" });
      }
      if (user.friends.includes(friend._id)) {
        return res
          .status(400)
          .json({ message: "User is already friends with this person" });
      }
      user.friends.push(friend);
      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  
  // Remove a friend
removeFriend : async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.friends.includes(friendId)) {
      return res.status(400).json({ message: "User is not friends with this person" });
    }
    user.friends = user.friends.filter(friend => friend.toString() !== friendId);
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
},


// Delete a user by ID
deleteUserById : async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete user by id" });
  }
}

};
