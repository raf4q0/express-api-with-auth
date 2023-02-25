import { Router } from 'express';
import { 
  createPost,
  getPosts,
  getPostById
} from '../controllers/postsController.js';

const router = Router();

router.route('/posts')
  .post(createPost)
  .get(getPosts);

router.route('/posts/:id')
  .get(getPostById)
//   .patch(updateUserById)
//   .delete(deleteUserById);

export default router;
