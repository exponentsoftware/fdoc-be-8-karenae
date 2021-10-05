const express = require('express');
const app = express();
const db = require("./models");
const Role = db.role;

const Port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync().then(()=>{
    console.log("db connected");
    initial()
});


// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//     initial()
// });

function initial(){
    Role.create({
        id:1,
        name:"user"
    })
    Role.create({
        id:2,
        name:"admin"
    })
}

app.get('/', (req, res) => {
    res.send('hello')
})

require('./routes/auth')(app);
require('./routes/user')(app);


const todoRouter = require('./routes/todo')
const commentRouter = require('./routes/comments')
const tagRouter = require('./routes/tags')
// const userRouter = require('./routes/userAuth')

app.use('/api',todoRouter)
app.use('/api',commentRouter)
app.use('/api',tagRouter)
// app.use('/api',userRouter)

app.listen(Port,()=>{console.log('listening on 8080')})



