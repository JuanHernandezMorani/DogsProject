const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    heightMin:{
      type: DataTypes.STRING
    },    
    heightMax:{
      type: DataTypes.STRING
    },
    weightMin:{
      type: DataTypes.STRING
    },
    weightMax:{
      type: DataTypes.STRING
    },
    life_ageMin:{
      type: DataTypes.STRING
    },
    life_ageMax:{
      type: DataTypes.STRING
    },
    fan:{
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    origin:{
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    bred_for:{
      type: DataTypes.STRING
    },
  },
  {
    timestamps: false
  });
};