const express = require('express')
const Db = require('./BlogOperation')
const router = express.Router()

router.get('/',async (req,res)=>{
    // res.send(blogList)
    try{
        const response = await Db.getAllBlogDetails()
        return res.status(201).send({
            statusCode : 1000,
            data : response,            
            message:"List of all blog"            
        })
    }catch(error){
        return res.status(500).send({
            statusCode : 2000,
            data : error,
            message:"Some Error Occure"            
        })
    }
})

router.get('/:blogId',async (req,res)=>{
    const blogId= req.params.blogId
    // const blog = blogList.find(x=>x.id == blogId) 
    try{
        const response = await Db.getSingleBlogDetails(blogId)
        return res.status(201).send({
            statusCode : 1000,
            data : response,            
            message:"Detail of single blog"            
        })
    }catch(error){
        return res.status(201).send({
            statusCode : 2000,
            data : error,            
            message:"User Not Found"            
        })
    }        
})

router.post('/',async (req,res)=>{
    const BlogData = req.body
    if(BlogData!=''){
        try{
            const response = await Db.insertBlogDetail(BlogData)
            return res.status(201).send({
                statusCode : 2000,
                data : response,            
                message:"Blog Create Successfully"            
            })
        }catch(error){
            return res.status(201).send({
                statusCode : 1000,
                data : error,            
                message:"Some error occure"            
            })
        }
    }    
    return res.status(400).send("Blog desc field is require")
})

router.put('/:blogId',async (req,res)=>{
    const blogDetails = req.body
    const id = req.params.blogId
    try{
        let response = await Db.updateBlogDetail(blogDetails,id)
        return res.status(201).send({
            statusCode : 1000,
            data : response,            
            message:"Blog updated successfully"            
        })
    }catch(error){
        return res.status(500).send({
            statusCode : 2000,
            data : error,
            message:"Some Error Occure"            
        })
    }
    
})

router.delete('/:blogId',async (req,res)=>{
    const blogId = req.params.blogId
    try{
        const repsone = await Db.deleteSingleBlog(blogId)
        console.log(repsone)
        return res.status(201).send({
            statusCode : 1000,
            data : repsone,            
            message:"Blog deleted successfully"            
        })
    }catch(error){
        return res.status(500).send({
            statusCode : 2000,
            data : error,
            message:"Blog id is not found"            
        })
    }
})

module.exports = router