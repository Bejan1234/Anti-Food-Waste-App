const { Sequelize } = require('sequelize');
require('dotenv').config();

// connect to cloud db
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: process.env.NODE_ENV === 'production' ? {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    } : {},
    logging: false // set to true to show sql logs
});

module.exports = sequelize;