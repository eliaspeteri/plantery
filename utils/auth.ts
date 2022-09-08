import { PermissionDeniedError } from './constants/errors';
import TokenServ from './token';

function hasPermission(allowedroles, actualRole) {
  if (!allowedroles) {
    return false;
  }
  return allowedroles.includes(actualRole);
}

function authorize(allowedroles = []) {
  return async (req, res, next) => {
    const token = (req.headers.authorization || req.headers.Authorization || '')
      .split('Bearer ')
      .pop();

    if (!token) {
      const error = new Error('Token Does Not Exist');
      error.status = 401;
      return next(error);
    }

    try {
      const decodedData = await TokenServ.verify(token);
      req.tokenData = decodedData;
      const actualRole = decodedData.role;

      if (allowedroles.length === 0) return next();

      if (!hasPermission(allowedroles, actualRole)) {
        return new PermissionDeniedError();
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}

export { authorize, hasPermission };
