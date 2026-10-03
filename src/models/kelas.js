'use strict';
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Kelas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Kelas.belongsTo(models.KategoriKelas, {
        foreignKey: "kategori_id",
        as: "kategori",
      });

      Kelas.belongsTo(models.Tutor, {
        foreignKey: "tutor_id",
        as: "tutor",
      });

      // Kelas hasMany Review
      Kelas.hasMany(models.Review, {
        foreignKey: "kelas_id",
        as: "reviews",
      });

      Kelas.hasMany(models.Order, {
        foreignKey: "kelas_id",
        as: "orders",
      });

      Kelas.hasMany(models.ModulKelas, {
        foreignKey: "kelas_id",
        as: "modul",
      });

    
      Kelas.hasMany(models.KelasSaya, {
        foreignKey: "kelas_id",
        as: "kelasSaya",
      });

      Kelas.belongsToMany(models.User, {
        through: models.KelasSaya,
        foreignKey: "kelas_id",
        otherKey: "user_id",
        as: "users",
      });
    }
  }
  Kelas.init({
    kategori_id: DataTypes.BIGINT,
    tutor_id: DataTypes.BIGINT,
    title: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    description: DataTypes.TEXT,
    normal_price: DataTypes.DECIMAL,
    discount_price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Kelas',
  });
  return Kelas;
};