const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const userRouter = require('./routes/authRoutes')
const studentRouter = require('./routes/studentRoutes')
const cors = require('cors')
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }));
app.use(bodyParser.json())
app.use("/auth",userRouter)
app.use('/student',studentRouter)

const {sequelize} = require('./models')
sequelize.sync({alter:true})
.then(()=>{
  console.log("Database connected successfully")
  app.listen(9090)
}) .catch(err => {
  console.log(err);
});
