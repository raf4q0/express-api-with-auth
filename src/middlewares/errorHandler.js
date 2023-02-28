import { DEBUG_MODE  } from "../config/environment";
import { ValidationError } from 'Joi';
import CustomErrorHandler from '../services/CustomErrorHandler';

const errorHandler = (error, request, response, next) => {
    let statusCode = 500; //By default for any error we need to sent statuscode and msg
    let data = {
        message: 'Internal server error',
        ...(DEBUG_MODE == 'true' && { originalError: error.message })
    }

    if (error instanceof ValidationError) { // Error class from Joi
        statusCode = 422
        data = {
            message: error.message
        }
    }

    if (error instanceof CustomErrorHandler) { // custom error 
        statusCode = error.status
        data = {
            message: error.message
        }
    }

    return response.status(statusCode).json(data)
}

export default errorHandler