const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

// Aggregate function to get the number of Users overall
const headCount = async () =>
  User.aggregate()
    .count('userCount')
    .then((numberOfUsers) => numberOfUsers);

// Aggregate function for getting the overall grade using $avg


module.exports = {
  // Get all Users
  getUsers(req, res) {
    User.find()
      .then(async (Users) => {
        
        return res.json(Users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single User
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.UserId })
      .select('-__v')
      .populate("thoughts")
      .populate("friends")
      .then( (User) =>
        !User
          ? res.status(404).json({ message: 'No User with that ID' })
          : res.json(User)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new User
  createUser(req, res) {
    User.create(req.body)
      .then((User) => res.json(User))
      .catch((err) => res.status(500).json(err));
  },

updateUser(req, res) {
    User.findOneAndUpdate(
        {
            _id: req.params.UserId
        },
        {
            $set: req.body
        },
        {
            runValidators: true,
            new: true
        }
    ).then((upDateUser) => {
        res.json(upDateUser)
    }).catch((err) => res.status(500).json(err))
},

  // Delete a User and remove them from the Thought
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.UserId })
      .then((User) =>
        !User
          ? res.status(404).json({ message: 'No such User exists' })
          : Thought.findOneAndUpdate(
              { Users: req.params.UserId },
              { $pull: { Users: req.params.UserId } },
              { new: true }
            )
      )
      .then((Thought) =>
        !Thought
          ? res.status(404).json({
              message: 'User deleted, but no Thoughts found',
            })
          : res.json({ message: 'User successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add an assignment to a User
  addFriend(req, res) {
    console.log('You are adding an assignment');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.UserId },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    )
      .then((User) =>
        !User
          ? res
              .status(404)
              .json({ message: 'No User found with that ID :(' })
          : res.json(User)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove assignment from a User
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.UserId },
      { $pull: { assignment: { friendId: req.params.friendId } } },
      { runValidators: true, new: true }
    )
      .then((User) =>
        !User
          ? res
              .status(404)
              .json({ message: 'No User found with that ID :(' })
          : res.json(User)
      )
      .catch((err) => res.status(500).json(err));
  },
};
