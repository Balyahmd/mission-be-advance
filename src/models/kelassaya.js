"use strict";
import { Model } from "sequelize";

export default  (sequelize, DataTypes) => {
  class KelasSaya extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      KelasSaya.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });

      KelasSaya.belongsTo(models.Kelas, {
        foreignKey: "kelas_id",
        as: "kelas",
      });

      KelasSaya.belongsTo(models.Order, {
        foreignKey: "order_id",
        as: "order",
      });
    }
  }
  KelasSaya.init(
    {
      user_id: DataTypes.BIGINT,
      kelas_id: DataTypes.BIGINT,
      order_id: DataTypes.BIGINT,
      total_module: DataTypes.INTEGER,
      completed_modules: DataTypes.INTEGER,
      progress_percent: DataTypes.DECIMAL,
      started_at: DataTypes.DATE,
      completed_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "KelasSaya",
    },
  );
  return KelasSaya;
};
