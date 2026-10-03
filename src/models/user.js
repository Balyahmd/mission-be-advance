'use strict';
import { Model } from "sequelize";
export default(sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Tutor, {
        foreignKey: "user_id",
        as: "tutor",
      });

      // User 1:N Review
      User.hasMany(models.Review, {
        foreignKey: "user_id",
        as: "reviews",
      });

      User.hasMany(models.Order, {
        foreignKey: "user_id",
        as: "orders",
      });

      User.hasMany(models.KelasSaya, {
        foreignKey: "user_id",
        as: "kelasSaya",
      });

      User.belongsToMany(models.Kelas, {
        through: models.KelasSaya,
        foreignKey: "user_id",
        otherKey: "kelas_id",
        as: "kelas",
      });
    }
  }
  User.init({
    full_name: DataTypes.STRING,
    username: DataTypes.STRING,
    number_phone: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    foto_profile: DataTypes.STRING,
    gender: DataTypes.ENUM("male", "female"),
    role: DataTypes.ENUM("user", "tutor", "admin"),
    verification_token: DataTypes.STRING,
    is_verified: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};