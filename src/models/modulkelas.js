'use strict';
import { Model } from "sequelize";
export default  (sequelize, DataTypes) => {
  class ModulKelas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       ModulKelas.belongsTo(models.Kelas, {
        foreignKey: "kelas_id",
        as: "kelas",
      });

      ModulKelas.hasMany(models.Material, {
        foreignKey: "modul_id",
        as: "materials",
      });
    }
  }
  ModulKelas.init({
    kelas_id: DataTypes.BIGINT,
    title_modul: DataTypes.STRING,
    description_modul: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ModulKelas',
  });
  return ModulKelas;
};