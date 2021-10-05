const { Op } = require("sequelize");
const db = require("../models").default;
const Todo = db.todo;
const User = db.user;
const Comment = db.comments


const createTodo = async (req,res)=>{
    try{
        let { id } = req.user
        console.log(id)
        let isPaid = await User.findOne({where: {id:id}})
        const { paidUser } = isPaid
        if (paidUser === "true"){ 
            const {userName, todoTitle, todoCompleted, todoCategory,userId} = req.body
            let todo = await Todo.findOne({where:{todoTitle:todoTitle}})
            if(todo) return res.status(403).json({message:'todo already exists',})

            const newTodo = Todo.create({userName:userName,todoTitle:todoTitle,todoCategory:todoCategory,todoCompleted:todoCompleted,userId:userId})
            if(newTodo != null) return res.status(201).json({status: 'success',message: newTodo})
        }
        else{
            let todos = await Todo.findByPk({ where:{ id: id }})
            if (todos.length < 5){
                const {userName, todoTitle, todoCompleted, todoCategory,userId} = req.body
                let todo = await Todo.findOne({where:{todoTitle:todoTitle}})
                if(todo) return res.status(403).json({message:'todo already exists',})
    
                const newTodo = Todo.create({userName:userName,todoTitle:todoTitle,todoCategory:todoCategory,todoCompleted:todoCompleted,userId:userId})
                if(newTodo != null) return res.status(201).json({status: 'success',message: newTodo})
            }
            else{
                return res.status(404).json({message:"todos lengths exceeded as per you plan to add more please upgrade your plane"})
            }
        }
        
    }
    catch(err){
        console.log(err);
    }
}
// Add capability to sort the data by created_at

const getTodos = async (req,res) => {
    try{
       let todos = await Todo.findAll()
        if(todos.length == 0) return res.json({message:' no todos created'});
        res.status(200).json({data:todos,metadata:todos.length});
    }
    catch(err){
        console.log(err)
    }
}

const getTodoById = async (req,res) => {
    try{
        const {todo_id} = req.body
       let todos = await Todo.findByPk(todo_id, { include: { association: 'comments',required:true } });
        // if(todos.length == 0) return res.json({message:' no todos created'});
        res.status(200).json({data:todos,metadata:todos.length});
    }
    catch(err){
        console.log(err)
    }
}


const updateTodo = async (req,res) => {
    try{
        const {todoTitle, todoCompleted, todoCategory,todo_id} = req.body
        let todo = await Todo.Update({todoTitle, todoCompleted, todoCategory},{where:{todo_id:todo_id}})
        if (todo === null) res.status(403).json({ status: 'error', message: 'failed to update todo' })
        else res.status(200).json({ status: 'success', message: 'successfully Updated' })
    }
    catch(err){
        console.log(err)
    }
}



module.exports = { createTodo, getTodos, getTodoById, updateTodo }