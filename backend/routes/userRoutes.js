import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  logoutUser,
} from '../controllers/userController.js';
import {Protect,admin} from '../middlewares/authMiddleware.js'

const router = express.Router();

router.route('/').post(registerUser).get(Protect, admin, getUsers);
router.post('/auth', authUser);
router.post('/logout',logoutUser);
router.route('/profile').get(Protect, getUserProfile).put(Protect, updateUserProfile);

router.route('/:id').delete(Protect, admin, deleteUser).get(Protect, admin, getUserById).put(Protect, admin, updateUser);

export default router;