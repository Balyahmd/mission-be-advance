'use strict';
import { Model } from "sequelize";
export default  (sequelize, DataTypes) => {
  class Tutor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Tutor.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });

      // Tutor 1:N Kelas
      Tutor.hasMany(models.Kelas, {
        foreignKey: "tutor_id",
        as: "kelas",
      });
    }
  }
  Tutor.init({
    user_id: DataTypes.BIGINT,
    expertise: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tutor',
  });
  return Tutor;
};