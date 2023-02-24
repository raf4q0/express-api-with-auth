import { Router } from 'express';
import { 
  createPost,
  getPosts
} from '../controllers/postsController.js';

const router = Router();

router.route('/posts')
  .post(createPost)
  .get(getPosts);

// router.route('/users/:id')
//   .get(getUserById)
//   .patch(updateUserById)
//   .delete(deleteUserById);

export default router;
