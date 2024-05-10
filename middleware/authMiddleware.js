const CustomError = require('../util/exeptionUtil');
const authUtil = require('../util/authUtil');
module.exports = async (req, res, next) => {
  try {
    const header = req.headers['authorization'];
    const token = header ? header.split(' ')[1] : null;
    if (token === null) throw new CustomError('No token provided', 401);

    const user = await authUtil.jwtCheck(token).catch(err => { throw new CustomError(err.message, 401); });
    req.user = { ...user, token };

    next();
  } catch (error) {
    next(error)
  }
}