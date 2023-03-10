const reactionSchema = require("./Reactions");
const { model, Schema } = require("mongoose"); 

const dateFormat = (createdAt) => {
  return new Date(createdAt).toLocaleString();
};

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxLength: 280,
      minLength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: dateFormat,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      timeStamps: true,
    },
  }
);

module.exports = model("thought", thoughtSchema);
