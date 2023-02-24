import { Router } from 'express';
import { 
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  userPosts
} from '../controllers/usersController';

import auth from '../middlewares/auth'

const router = Router();

router.route('/users')
  .post(createUser)
  .get(auth, getUsers);

router.route('/users/:id')
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById)

router.route('/users/:id/posts')
  .get(userPosts)

export default router;
