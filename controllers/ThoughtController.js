const { User, Thought } = require("../models");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  //Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((course) => res.json(course))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //Delete a thought
  DeleteThought(req, res) {
    Thought.findOneAndDelete({ _id: required.params.thoughtId })
      .then((thought) =>
        !course
          ? res
              .status(404)
              .json({ message: "Ran into trouble deleting your thought" })
          : Student.deleteMany({ _id: { $in: thought.users } })
      )
      .then(() => res.json({ message: "Thought deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  //Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.courseId },
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
