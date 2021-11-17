const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('support',{
		content: {
			type: DataTypes.STRING,
            allowNull: false
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
    idSupport:{
        allowNull: false,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
       
    },
    postReported: {
        type: DataTypes.UUID,
    },
    commentReported: {
        type: DataTypes.UUID,
    },
    userReported: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: {
          args: true,
          msg: "The username must contain only letters and numbers.",
        },
        len: {
          args: [3, 16],
          msg: "The username must be a minimum of three characters and a maximum of sixteen.",
        },
      }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
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
    }),
        {
            timestamps: false,
        }
}
