const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
  getReaction
} = require("../../controllers/controller");

// Route for all thoughts
router.route("/")
  .get(getAllThoughts)
  .post(createThought);

// Route for a single thought
router.route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// Route for reactions on a single thought
router.route("/:thoughtId/reactions")
  .post(createReaction)
  .get(getReaction)
  .delete(deleteReaction);

module.exports = router;

