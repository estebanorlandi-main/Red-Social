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
            type: DataTypes.UUID
        }
    }),
        {
            timestamps: false,
        }
}