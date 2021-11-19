// Modelo del usuario
const { DataTypes, Sequelize } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "user",
    {
      id: {
        allowNull: false,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          isAlpha: {
            args: true,
            msg: "The name must contain only letters.",
          },
          len: {
            args: [2, 30],
            msg: "The name must have a minimum of two characters and a maximum of thirty.",
          },
        },
      },
      lastname: {
        type: DataTypes.STRING,
        validate: {
          isAlpha: {
            args: true,
            msg: "The lastname must contain only letters.",
          },
          len: {
            args: [2, 30],
            msg: "The lastname must have a minimum of two characters and a maximum of thirty.",
          },
        },
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
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, Infinity],
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
      gitaccount: {
        type: DataTypes.STRING,
        validate: {
          validateGit: function (account) {
            if (!account.match(/github.com/)) {
              throw new Error("git account invalidate");
            }
          },
        },
      },
      image: {
        type: DataTypes.STRING,
        validate: {
          validateImage: function (image) {
            if (!image.match(/\.(gif|jpg|jpeg|tiff|png)$/i)) {
              throw new Error("image invalide");
            }
          },
        },
      },

      imageType: { type: DataTypes.STRING, allowNull: true },

      imageName: { type: DataTypes.STRING, allowNull: true },

      imageData: { type: DataTypes.BLOB, allowNull: true },
      
      about: {
        type: DataTypes.STRING,
        validate: {
          len: [5, 1000],
        },
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        validate: {
          validateArr: function (arr) {
            if (!Array.isArray(arr)) throw new Error("tags invalide");
          },
        },
      },
      strike:{
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull:true,
      },
      dayBan:{
        type: DataTypes.DATE,
        allowNull: true,
      }
    
    },
    {
      timestamps: false,
    }
  );
};
