'use strict';
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Pretest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pretest.belongsTo(models.Material, {
        foreignKey: "material_id",
        as: "material",
      });
    }
  }
  Pretest.init({
    material_id: DataTypes.BIGINT,
    question: DataTypes.TEXT,
    options: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Pretest',
  });
  return Pretest;
};