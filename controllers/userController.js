const { User, Thought } = require("../models");

//aggregate function to get total number of friends of a users
const friendCount = async () =>
  User.aggregate()
    .count("friendCount")
    .then((numberOfFriends) => numberOfFriends);

//?Where do I put reactionCount aggregate function?

module.exports = {
  //!       get all users, and utilize aggregate function friendCount
  getUsers(req, res) {
    User.find()
      .populate("thoughts")
      .then(async (users) => {
        const userObj = {
          users,
          friendCount: await friendCount(),
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //!       get single user based off required parameter UserId
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("friends")
      .populate("thoughts")
      .then(async (user) => {
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({ user });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  //!       create new User
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  //!       update User with a required parameter of the userId
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID 😱" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //!       Delete user with a required parameter of the userId
  async deleteUser(req, res) {
    let user = await User.findOne({ _id: req.params.userId });
    for (var i = 0; i < user.thoughts.length; i++) {
      await Thought.findOneAndDelete({ _id: user.thoughts[i]._id });
    }
    user = await User.findOneAndDelete({ _id: req.params.userId });

    !user
      ? res.status(404).json({
          message: "user deleted, but no Thoughts found",
        })
      : res.json({ message: "user successfully deleted" });
  },

  //!       Add an friend to a user
  addFriend(req, res) {
    console.log("You are adding a friend");
    console.log(req.body.friendId);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID 😱" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //!       Remove thought from a user
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
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
