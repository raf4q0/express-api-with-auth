import bcrypt from 'bcrypt'
import User from '../models/User'
import RefreshToken from '../models/RefreshToken'
import JwtService from '../services/JwtService'
import CustomErrorHandler from '../services/CustomErrorHandler'
import { REFRESH_SECRET } from '../config/environment'


export const getUsers = async (request, response, next) => {
  try {
    const { role } = request.user

    if (role != 'admin') {
      response.status(403).send({ error: 'Usuario no autorizado, para realizar esta acción'})
    }
    const users = await User.find({}).populate('posts')
    
    response.status(200).send(users)

  } catch (error) {
    next(error)
  }

}

export const createUser = async (request, response, next) => {
  try {
    // obtenemos los datos de la solicitud
    const { name, email, password } = request.body
    // preparamos los datos que vienen del cliente en nuestro modelo
    const newUser = new User({
      name,
      email,
      password
    })
    // salvamos en nuestra base de datos
    await newUser.save()
    // enviamos la respuesta al cliente
    response.status(201).send(newUser)

  } catch(error) {
    next(error)
  }
}

export const getUserById = async (request, response, next) => {
  try {
    const { id } = request.params;
    const user = await User.findById(id).populate('posts')

    if (!user) {
      response.status(404).send({ 
        error: 'No se encontro ningún registro en la base de datos'
      })
    }
    
    response.status(200).send(user)
  } catch (error) {
    next(error)  
  }
}

export const updateUserById = async (request, response, next) => {
  try {
    const { id } = request.params
    const bodyParams = { ...request.body }

    const updatedUser = await User.findByIdAndUpdate(id, bodyParams, { new: true })

    response.status(201).send(updatedUser)
  } catch(error) {
    next(error)
  }
};

export const deleteUserById = async (request, response, next) => {
  try {
    const { id } = request.params;

    const deletedUser = await User.findByIdAndDelete(id)
    
    if (!deletedUser) {
      response.status(404).send({ 
        error: 'No se encontro ningún registro en la base de datos'
      })
    }
    
    response.sendStatus(204);
  } catch(error) {
    next(error)
  }
}

export const userPosts = async (request, response, next) => {
  try {
    const { id } = request.params;
    const user = await User.findById(id).populate('posts')

    if (!user) {
      response.status(404).send({ 
        error: 'No se encontro ningún registro en la base de datos'
      })
    }
    
    response.status(200).send(user)
  } catch (error) {
    next(error)  
  }
}
