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
		}
	},{
    timestamps: false,
  })
	
}