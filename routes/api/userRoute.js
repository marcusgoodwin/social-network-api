const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  addFriend,
  removeFriend,
  deleteUserById,
} = require("../../controllers/userController");

router.route("/")
  .get(getAllUsers)
  .post(createUser);

router.route("/:id")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

router.route("/:userId/friends/:friendId")
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;
