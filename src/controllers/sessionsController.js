import bcrypt from 'bcrypt'
import User from '../models/User'
import RefreshToken from '../models/RefreshToken'
import JwtService from '../services/JwtService'
import CustomErrorHandler from '../services/CustomErrorHandler'

import { REFRESH_SECRET } from '../config/environment'

export const login = async (request, response, next) => {
  try {
    const { email, password } = request.body

    // check if email exists
    const user = await User.findOne({ email })

    if (!user) {
      return next(CustomErrorHandler.wrongCredential())
    }

    // compare password

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return next(CustomErrorHandler.wrongCredential())
    }

    const accessToken = JwtService.sign({ _id: user._id });
    const refreshToken = JwtService.sign({ _id: user._id }, '1y', REFRESH_SECRET);

    await RefreshToken.create({ token: refreshToken })

    response.status(201).send({ access_token: accessToken, refresh_token: refreshToken })
  } catch (error) {
    next(error)
  }

}

export const logout = async (request, response, next) => {
  try {
    const { refresh_token } = request.body

    await RefreshToken.deleteOne({ token: refresh_token })

    response.status(200).send({ message: 'Good bye' })
  } catch (error) {
    return next(new Error('Something went wrong in the database'))
  }
}
