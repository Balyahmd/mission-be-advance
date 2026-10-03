"use strict";
import { Model } from "sequelize";
export default  (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });

      Order.belongsTo(models.Kelas, {
        foreignKey: "kelas_id",
        as: "kelas",
      });

      Order.hasOne(models.Pembayaran, {
        foreignKey: "order_id",
        as: "pembayaran",
      });

      Order.hasOne(models.KelasSaya, {
        foreignKey: "order_id",
        as: "kelasSaya",
      });
    }
  }
  Order.init(
    {
      user_id: DataTypes.BIGINT,
      kelas_id: DataTypes.BIGINT,
      total_amount: DataTypes.DECIMAL,
      status_order: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    },
  );
  return Order;
};
