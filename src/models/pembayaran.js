'use strict';
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Pembayaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pembayaran.belongsTo(models.Order, {
        foreignKey: "order_id",
        as: "order",
      });
    }
  }
  Pembayaran.init({
    order_id: DataTypes.BIGINT,
    amount_payment: DataTypes.DECIMAL,
    method_payment: DataTypes.STRING,
    status: DataTypes.STRING,
    paid_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Pembayaran',
  });
  return Pembayaran;
};