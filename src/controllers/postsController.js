import Post from '../models/Post'
import User from '../models/User'
import Comment from '../models/Comment'

export const getPosts = async (request, response, next) => {
  try {
    const posts = await Post.find({}).populate('author').populate('comments')
    
    response.status(200).send(posts)

  } catch (error) {
    next(error)
  }

}

export const createPost = async (request, response, next) => {
  try {
    const { title, content, author } = request.body
    const newPost = new Post({
      title,
      content,
      author
    })

    await newPost.save()

    const user = await User.findById({ _id: newPost.author })
    user.posts.push(newPost)


    
    await user.save({ validateBeforeSave: false })

    response.status(201).send(newPost)
  } catch (error) {
    next(error)
  }
}

export const getPostById = async (request, response, next) => {
  try {
    const { id } = request.params;
    const post = await Post.findById(id).populate('author').populate('comments')

    if (!post) {
      response.status(404).send({ 
        error: 'No se encontro ningún registro en la base de datos'
      })
    }
    
    response.status(200).send(post)
  } catch (error) {
    next(error)  
  }
}

export const postComments = async (request, response) => {
  try {
    const { id } = request.params
    const post = await Post.findById(id)
    
    if (!post) {
      response.status(404).send({ error: 'no existe ningun registro en la base de datos con este ID'})
    } 

    const { content, user } = request.body

    const newComment = new Comment({
      content,
      user
    })

    const comment = await newComment.save()

    post.comments.push(comment)

    await post.save({ validateBeforeSave: false })

    response.status(201).send(comment)
  } catch (error) {
    next(error)
  }
}

// export const updateUserById = async (request, response, next) => {
//   try {
//     const { id } = request.params
//     const bodyParams = { ...request.body }

//     const updatedUser = await User.findByIdAndUpdate(id, bodyParams, { new: true })

//     response.status(201).send(updatedUser)
//   } catch(error) {
//     next(error)
//   }
// };

// export const deleteUserById = async (request, response, next) => {
//   try {
//     const { id } = request.params;

//     const deletedUser = await User.findByIdAndDelete(id)
    
//     if (!deletedUser) {
//       response.status(404).send({ 
//         error: 'No se encontro ningún registro en la base de datos'
//       })
//     }
    
//     response.sendStatus(204);
//   } catch(error) {
//     next(error)
//   }
// };
