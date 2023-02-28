import { Router } from 'express';
import { 
  createPost,
  getPosts,
  getPostById,
  postComments
} from '../controllers/postsController.js';

const router = Router();

router.route('/posts')
  .post(createPost)
  .get(getPosts);

router.route('/posts/:id')
  .get(getPostById)
//   .patch(updateUserById)
//   .delete(deleteUserById);

router.route('/posts/:id/comments')
  .post(postComments)

export default router;
