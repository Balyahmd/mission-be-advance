'use strict';
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Material extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       Material.belongsTo(models.ModulKelas, {
        foreignKey: "modul_id",
        as: "modul",
      });
      
      Material.hasMany(models.Pretest, {
        foreignKey: "material_id",
        as: "pretests",
      });
    }
  }
  Material.init({
    modul_id: DataTypes.BIGINT,
    type_material: DataTypes.STRING,
    title_material: DataTypes.STRING,
    material_url: DataTypes.STRING,
    duration_minute: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Material',
  });
  return Material;
};