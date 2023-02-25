import bcrypt from 'bcrypt'
import User from '../models/User'
import RefreshToken from '../models/RefreshToken'
import JwtService from '../services/JwtService'
import CustomErrorHandler from '../services/CustomErrorHandler'

import { REFRESH_SECRET } from '../config/environment'


export const register = async (request, response, next) => {
  try {
    // Validate user exists
    
    const exist = await User.exists({ email: request.body.email })
    
    if (exist) {
      return next(CustomErrorHandler.alreadyExist('This email is already taken'))
    }

    // Create an user
    const { name, email, password } = request.body
    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10) // SaltRound
    const user = new User({
      name,
      email,
      password: hashedPassword
    })

    // let accessToken;
    // let refreshToken;

    const createdUser = await user.save()
    
    response.status(201).send(createdUser)

    // accessToken = JwtService.sign({ _id: createdUser._id })
    // refreshToken = JwtService.sign({ _id: createdUser._id }, '1y', REFRESH_SECRET);

    // await RefreshToken.create({ token: accessToken })

    // response.status(201).send({
    //   access_token: accessToken,
    //   refresh_token: refreshToken
    // })
  } catch (error) {
    next(error)
  }
}
