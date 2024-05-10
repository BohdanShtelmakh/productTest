const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');
const authUtil = require('../util/authUtil');
const customError = require('../util/exeptionUtil');

class User extends Model {

  async generateToken(user, password) {
    const isMatch = await user.checkPassword(password);
    if (isMatch) {
      const token = await authUtil.jwtSign({ id: user.id, email: user.email });
      return token;
    } else {
      return false;
    }
  }

  async checkToken(token) {
    const decoded = await authUtil.jwtCheck(token);
    return decoded;
  }

  async checkPassword(password) {
    const isMatch = await authUtil.passwordCompare(password, this.password);
    return isMatch;
  }
}

function initUserModel() {
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        async validateEmail(email) {
          const isValid = await authUtil.emailValidate(email);
          if (isValid !== true) {
            throw new customError('Invalid email', 406);
          }
          return true;
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        async validatePassword(password) {
          const isValid = await authUtil.passwordValidate(password);
          if (isValid !== true) {
            throw new customError(isValid, 406);
          }
          return true;
        }
      }
    },
  },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      hooks: {
        beforeSave: async (user, options) => {
          return bcrypt.hash(user.password, 10).then(hash => {
            user.password = hash;
          })
        },
      },
    }
  );
}

module.exports = { User, initUserModel }