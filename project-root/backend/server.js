// main entry point for the backend
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./configuration/database');

// import models
const User = require('./database/User');
const Product = require('./database/ProductSchema');
const Group = require('./database/GroupSchema');

// import routes
const productRoutes = require('./routes/productRoutes');
const authController = require('./routes/authController');
const groupController = require('./routes/groupController');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// routes configuration
app.use('/api/products', productRoutes);
app.use('/api/auth', authController);
app.use('/api/groups', groupController);
app.use('/api/users', userRoutes);

// base route
app.get('/', (req, res) => {
    res.send('food waste app backend works!');
});

// start server
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected successfully.');

        // keeps models in sync with db structure
        await sequelize.sync({ alter: true });
        console.log('✅ Data successfully synchronized');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
};

startServer();