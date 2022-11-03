const router = require('express').Router();

const{
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller')

router
    .route('/')
    .get(getUsers)
    .post(createUser)

router
    .route('/:UserId')
    .get(getSingleUser)
    .delete(deleteUser)
    .put(updateUser)

router
    .route("/:id/friends/:friendId")
    .post(addFriend)
    .delete(removeFriend);


    module.exports = router;