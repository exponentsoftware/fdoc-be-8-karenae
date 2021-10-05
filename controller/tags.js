const db = require('../models').default;
const Tag = db.tags

const createTag = async (req,res)=>{
    try{
        const { todo_id, posted_by, title, category} = req.body
        const tag = await Tag.create({ todo_id:todo_id, posted_by:posted_by, title:title, category:category })
        if(tag != undefined) return res.status(201).json({status: 'success',message: tag})
    }
    catch(err){
        console.log(err);
    }
}

const getTags = async (req,res) => {
    try{
       let tag = await Tag.findAll()
        if(tag.length == 0) return res.json({message:' no tag created'});
        res.status(200).json({data:tag,metadata:tag.length});
    }
    catch(err){
        console.log(err)
    }
}

const getTagById = async (req,res)=>{
    try{
        const {id} = req.body
        let tag = await Tag.findByPk(id, { include: ["tutorial"] })
        res.send(tag)
    }
    catch(err){
        console.log(err)
    }
}

const updateTag = async (req,res) => {
    try{
        const { todo_id, posted_by, title, category } = req.body
        let tag = await Tag.Update({todo_id, posted_by, title, category }, {
            where: { id: id }
          })
        if (tag === null) res.status(403).json({ status: 'error', message: 'failed to update tag' })
        else res.json({ status: 'success', message: 'successfully Updated' })
    }
    catch(err){
        console.log(err)
    }
}

const deleteTag = async (req, res) => {
    try{
        const { id} = req.body
        let tag = await Tag.destroy({ where: { id: id }})
        if (tag === null) res.status(404).json({ status: 'error', message: 'failed to delete tag' })
        else res.json({ status: 'success', message: 'successfully deleted' })
    }
    catch(err){
        console.log(err)
    }
}


module.exports = { createTag, getTags, updateTag, deleteTag, getTagById, }