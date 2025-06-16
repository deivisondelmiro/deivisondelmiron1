const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Filme', {
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        diretor: DataTypes.STRING,
        ano: DataTypes.INTEGER,
        genero: DataTypes.STRING,
        assistiu: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};