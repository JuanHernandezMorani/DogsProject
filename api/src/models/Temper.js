const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Temper', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
    },
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }
  },
  {
    timestamps: false
  });
};