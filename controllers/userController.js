const { User } = require('../models/user');

class UserController {
  async register(req, res, next) {
    try {
      const { email, username, password } = req.body;
      const user = await User.create({ email, username, password });

      res.status(200).json({
        success: true,
        user
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (user) {
        const token = await user.generateToken(user, password);
        if (token) {
          res.status(200).json({
            success: true,
            token,
            user
          });
        } else {
          res.status(401).json({
            success: false,
            message: 'Invalid credentials'
          })
        }
      } else {
        res.status(401).json({
          success: false,
          message: 'No such user'
        })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new UserController();