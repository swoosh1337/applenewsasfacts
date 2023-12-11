const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sequelize = require('./config/database');
const User = require("./models/user")

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json()); 
const PORT = process.env.PORT || 3001;


sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

sequelize.sync();

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            username: username,
            password: hashedPassword
        });

        res.status(201).json({ message: "User Created!" });

    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ error: "Username already exists." });
        } else {
            console.log(error);
            res.status(500).json({ error: "Error occurred during registration." });
        }
    }
});



app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username: username } });

        if (!user) {
            return res.status(401).send("Invalid credentials");
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).send("Invalid credentials");
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token: token });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error during login");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
