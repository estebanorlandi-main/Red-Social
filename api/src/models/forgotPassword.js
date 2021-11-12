// Modelo del usuario
const { DataTypes, Sequelize } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "forgotPassword",
    {
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlphanumeric: {
            args: true,
            msg: "The username must contain only letters and numbers.",
          },
          len: {
            args: [3, 16],
            msg: "The username must be a minimum of three characters and a maximum of sixteen.",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: "must be an email.",
          },
        },
      },
    },
    {
      timestamps: true,
    }
  );
};
