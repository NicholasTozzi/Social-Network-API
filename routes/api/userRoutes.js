const router = require('express').Router();
const {
getUsers,
getSingleUser,
createUser,
deleteUser    
} = require('../../controllers/userController');


//!          /api/users
router.route('/').get(getUsers).post(createUser);
//!          /api/users/:userId
router.route('/:userId').get(getSingleUser);

router.route('/:userId').delete(deleteUser);
//!          /api/users/:userId/friend/:friendId
router.route(':userId/friend/:friendId').post(addFriend);

router.route(':userId/friend/:friendId').delete(removeFriend);

module.exports = router;
