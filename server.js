import express from 'express';
import mysql from 'mysql'
import 'dotenv/config'
import cors from 'cors';

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

var app = express();
app.use(express.json())
const corsOptions = {
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions))

app.get('/', (req, res) => {
    con.query("SELECT * FROM user", (err, result) => {
        res.send(result);
    })
  })

app.post('/', async (req,res) => {
    const email = req.body.email
    const password = req.body.password
    con.query(`INSERT INTO user (email, password) VALUES (?, ?)`,[email,password]);
})

app.listen(8081);