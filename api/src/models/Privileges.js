// Modelo de privilegios
const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('privileges',{
		Pk: {
			type: DataTypes.UUID,
			allowNull: false,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			defaultValue: 'Admin',
		},
		checked: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false,
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
	},{
    timestamps: false,
  })
	
}