const mongoose = require("mongoose");
const User = require("../models/user");
const Thought = require("../models/thought");
const Reaction = require("../models/reaction");

const { connect, connection } = require("mongoose");

connect("mongodb://127.0.0.1:27017/social-network-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userData = [
  {
    username: "JohnDoe",
    email: "john@example.com",
  },
  {
    username: "JaneDoe",
    email: "jane@example.com",
  },
  {
    username: "BobSmith",
    email: "bob@example.com",
  },
  {
    username: "AliceLee",
    email: "alice@example.com",
  },
  {
    username: "GraceKim",
    email: "grace@example.com",
  },
];

const thoughtData = [
  {
    thoughtText: "Hello world!",
    username: "JohnDoe",
  },
  {
    thoughtText: "Lorem ipsum dolor sit amet",
    username: "JaneDoe",
  },
  {
    thoughtText: "Eureka!",
    username: "BobSmith",
  },
  {
    thoughtText: "Analytical Engine FTW!",
    username: "AliceLee",
  },
  {
    thoughtText: "We can do it!",
    username: "GraceKim",
  },
];

const reactionData = [
  {
    reactionBody: "I love it!",
    username: "JohnDoe",
    reactionId: new mongoose.Types.ObjectId(),
  },
  {
    reactionBody: "Cool!",
    username: "JaneDoe",
    reactionId: new mongoose.Types.ObjectId(),
  },
  {
    reactionBody: "Science rules!",
    username: "BobSmith",
    reactionId: new mongoose.Types.ObjectId(),
  },
  {
    reactionBody: "Yes, please!",
    username: "AliceLee",
    reactionId: new mongoose.Types.ObjectId(),
  },
  {
    reactionBody: "We can do it!",
    username: "GraceKim",
    reactionId: new mongoose.Types.ObjectId(),
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connection.dropDatabase();

    const users = await User.create(userData);
    const thoughts = await Thought.create(thoughtData);

    // create the reactions with a new ObjectId
    const reactions = await Reaction.create(
      reactionData.map((reaction) => ({
        ...reaction,
        reactionId: new mongoose.Types.ObjectId(),
      }))
    );

    for (const thought of thoughts) {
      const user = users.find((u) => u.username === thought.username);
      user.thoughts.push(thought);
      await user.save();
    }

    for (const reaction of reactions) {
      const thought = thoughts[Math.floor(Math.random() * thoughts.length)];
      thought.reactions.push(reaction);
      await thought.save();
    }

    console.log("thoughtHIVE database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDatabase();
