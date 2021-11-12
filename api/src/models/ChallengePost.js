// Modelo de Challenge-Post
const { DataTypes, Sequelize } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "ChallengePost",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "The post title must contain between 5 and 40 characters",
          },
          len: {
            args: [5, 40],
            msg: "The post title must contain between 5 and 40 characters",
          },
        },
      },

      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "The body of the post must contain between 5 and 1000 characters.",
          },
          len: {
            args: [5, 1000],
            msg: "The body of the post must contain between 5 and 1000 characters.",
          },
        },
      },

      tag: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },

      idPost: {
        unique: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      likes: {
        type: DataTypes.INTEGER,
      },
    });
};
