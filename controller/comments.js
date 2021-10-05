const db = require('../models').default;
const Comment = db.comments

const createComment = async (req,res)=>{
    try{
        const { todo_id, posted_by, comment_text} = req.body
        const comment = await Comment.create({ todo_id:todo_id, posted_by:posted_by, comment_text:comment_text })
        if(comment != undefined) return res.status(201).json({status: 'success',message: comment})
    }
    catch(err){
        console.log(err);
    }
}

const getComments = async (req,res) => {
    try{
       let comments = await Comment.findAll()
        if(comments.length == 0) return res.json({message:' no comments created'});
        res.status(200).json({data:comments,metadata:comments.length});
    }
    catch(err){
        console.log(err)
    }
}

const getCommentById = async (req,res)=>{
    try{
        const {id} = req.body
        let comment = await Comment.findByPk(id, { include: ["tutorial"] })
        res.send(comment)
    }
    catch(err){
        console.log(err)
    }
}

const updateComment = async (req,res) => {
    try{
        const { todo_id, posted_by, comment_text} = req.body
        let comment = await Comment.Update({todo_id, posted_by, comment_text}, {
            where: { id: id }
          })
        if (comment === null) res.status(403).json({ status: 'error', message: 'failed to update comment' })
        else res.json({ status: 'success', message: 'successfully Updated' })
    }
    catch(err){
        console.log(err)
    }
}

const deleteComment = async (req, res) => {
    try{
        const { id} = req.body
        let comment = await Comment.destroy({ where: { id: id }})
        if (comment === null) res.status(404).json({ status: 'error', message: 'failed to delete comment' })
        else res.json({ status: 'success', message: 'successfully deleted' })
    }
    catch(err){
        console.log(err)
    }
}


module.exports = { createComment, getComments, updateComment, deleteComment, getCommentById, }