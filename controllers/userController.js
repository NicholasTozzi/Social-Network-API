const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

//aggregate function to get total number of users
const userCount = async () =>
  User.aggregate()
    .count("userCount")
    .then((numberofUsers) => numberOfUsers);

//do I need any other aggregate functions?

module.exports = {
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
          headCount: await headCount(),
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  getSingleUser(req, res) {
    User.findOne({ id: req.params.userId })
      .select("-__v")
      .then(async (user) => {
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({
              user,
              //TODO  populate thought and friend data
            });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No such user exists" })
          : Thought.findOneAndUpdate(
              { users: req.params.userId },
              { $pull: { users: req.params.userId } },
              { new: true }
            )
      )
      .then((Thought) =>
        !Thought
          ? res.status(404).json({
              message: "user deleted, but no Thoughts found",
            })
          : res.json({ message: "user successfully deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //TODO add thought and remove thought are wrong
  // Add an friend to a user
  addFriend(req, res) {
    console.log("You are adding a friend");
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { thoughts: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID 😱" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove thought from a user
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friend: { userId: req.params.userId } } }, //! does this need to be friendId? I don't think so
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
