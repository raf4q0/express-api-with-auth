import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtService from "../services/JwtService";


const auth = async (request, response, next) => {
  //Step 1 - Get authorization header from request
  let authHeader = request.headers.authorization;

  // Step 2: If header not exist
  if (!authHeader) {
    return next(CustomErrorHandler.unAuthorized())
  }

  //Step 3: If header exist split bearer and token
  // Apply middleman auth in 
  const token = authHeader.split(' ')[1];
  
  // Step 4: Verify token
  try {
      const { _id, role } = await JwtService.verify(token);
      const user = { _id, role }
      request.user = user; 
    // Setting user on req, so we can valid token user in usersController
      next();

  } catch(err) {
    return next(CustomErrorHandler.unAuthorized())
  }
}

export default auth
