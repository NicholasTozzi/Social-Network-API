const { User, Thought, Reaction } = require("../models");

module.exports = {
  //!       Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  //!       create new thought
  createThought(req, res) {
    Thought.create(req.body) // add userId to the thought object
      .then((thought) => {
        User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: thought._id } }
        )
          .then((userData) => {
            if (!userData) {
              res.status(404).send("username does not exist");
            } else {
              console.log(userData);
              res.json(thought);
            }
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //!       Get single Thought by using required parameter thoughtId
  getSingleThought(req, res) {
    Thought.findOne({ id: req.params.thoughtId })
      .select("-__v")
      .populate("reactions")
      .then(async (thought) => {
        !user
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json({ thought });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //!       Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: required.params.thoughtId })
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "Ran into trouble deleting your thought" })
          : Thought.deleteMany({ _id: { $in: thought.users } })
      )
      .then(() => res.json({ message: "Thought deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  //!       Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.res
              .status(404)
              .json({ message: "uhhhh, had trouble updating your thought" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a reaction

  createReaction(req, res) {
    Reaction.create(req.body) // add userId to the thought object
      .then((reaction) => {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: reaction._id } }
        )
          .then((thoughtData) => {
            if (!thoughtData) {
              res.status(404).send("thought does not exist");
            } else {
              console.log(thoughtData);
              res.json(reaction);
            }
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Delete a reaction

  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.params.reactionId } } // fix here
    )
      .then((reaction) =>
        !reaction
          ? res
              .status(404)
              .json({ message: "No reaction found with that ID :(" })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },
};
