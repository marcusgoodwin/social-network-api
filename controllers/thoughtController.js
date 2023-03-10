const { User, Thought } = require("../models");

module.exports = {
   
// Get all thoughts
getAllThoughts : async (req, res) => {
  try {
    const thoughts = await Thought.find({});
    res.json(thoughts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
},

// Get a single thought by id
getThoughtById : async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      return res.status(404).json({ error: "Thought not found" });
    }
    res.json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
},

// Create a new thought
createThought : async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    const userId = thought.userId;

    // Add the thought to the user's thoughts array
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { thoughts: thought._id } },
      { new: true }
    );

    res.json({ message: "Thought created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
},

// Update a thought by id
updateThought : async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!thought) {
      return res.status(404).json({ error: "Thought not found" });
    }

    // Retrieve the thought's user ID
    const userId = thought.userId;

    // Add the thought ID to the user's thoughts array
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { thoughts: thought._id } },
      { new: true }
    );

    res.json({ message: "Thought updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
},

// Delete a thought by id
deleteThought : async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    if (!thought) {
      return res.status(404).json({ error: "Thought not found" });
    }

    // Remove the thought from the user's thoughts array
    await User.updateOne(
      { _id: thought.userId },
      { $pull: { thoughts: thought._id } }
    );

    res.json({ message: "Thought deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
 
  }
},

 // Create a new reaction on a thought
 createReaction: async (req, res) => {
  try {
    const thoughtId = req.params.thoughtId;
    const reaction = await Reaction.create(req.body);
    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: reaction._id } },
      { new: true }
    );
    if (!thought) {
      return res.status(404).json({ error: "Thought not found" });
    }
    res.json(reaction);
  } catch (err){
  res.status(500).json({ error: "Server error" });
}
 },
 
// Get a reaction by id
getReaction: async (req, res) => {
  try {
    const reaction = await Reaction.findById(req.params.reactionId);
    if (!reaction) {
      return res.status(404).json({ error: "Reaction not found" });
    }
    res.json(reaction);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
},

// Delete a reaction by id
deleteReaction: async (req, res) => {
  try {
    const reaction = await Reaction.findByIdAndDelete(req.params.reactionId);
    if (!reaction) {
      return res.status(404).json({ error: "Reaction not found" });
    }

    // Remove the reaction from the thought's reactions array
    await Thought.updateOne(
      { _id: reaction.thoughtId },
      { $pull: { reactions: reaction._id } }
    );

    res.json({ message: "Reaction deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
},
};