'use strict';
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class KategoriKelas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        KategoriKelas.hasMany(models.Kelas, {
        foreignKey: "kategori_id",
        as: "kelas",
      });
    }
  }
  KategoriKelas.init({
    name_kategori: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'KategoriKelas',
  });
  return KategoriKelas;
};