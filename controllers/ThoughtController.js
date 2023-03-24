const { User, Thought } = require("../models");

module.exports = {
  //!       Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  //!       create new thought
  createThought(req, res) {
    console.log(req.body);
    Thought.create({ ...req.body, userId: req.params.userId }) // add userId to the thought object
      .then((thought) => {
        console.log(thought);
        console.log(thought._id);
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { thoughts: thought._id } },
          { runValidators: true, new: true }
        )
          .then(() => res.json(thought))
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
          : Student.deleteMany({ _id: { $in: thought.users } })
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
};
