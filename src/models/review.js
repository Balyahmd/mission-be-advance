'use strict';
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       Review.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });

      Review.belongsTo(models.Kelas, {
        foreignKey: "kelas_id",
        as: "kelas",
      });
    }
  }
  Review.init({
    user_id: DataTypes.BIGINT,
    kelas_id: DataTypes.BIGINT,
    rating: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};