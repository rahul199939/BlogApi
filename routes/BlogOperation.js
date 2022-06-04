const sql = require('mssql')
const config = require('../utils/config')

async function getAllBlogDetails(){
    try{
        let pool = await sql.connect(config)
        let blogDetails = await pool.request().query("select * from BlogDetails where ISActive = 0")        
        return blogDetails.recordsets
    }catch(error){
        return error
    }
}

async function getSingleBlogDetails(blogId){
    try{
        let pool = await sql.connect(config)
        let singleBlogDetails = await pool.request()
            .input('input_parameter',sql.Int,blogId)
            .query("select * from BlogDetails where BlogID=@input_parameter and ISActive = 0")        
        return singleBlogDetails.recordset
    }catch(err){
        return err
    }
}

async function insertBlogDetail(blogDetail){
    try{
        let pool = await sql.connect(config)
        let insertBlog = await pool.request()
            .input('BlogTitle',sql.VarChar,blogDetail.BlogTitle)
            .input('BlogDesc',sql.VarChar,blogDetail.BlogDesc)
            .input('AuthorName',sql.VarChar,blogDetail.AuthorName)
            .input('ISActive',sql.Int,blogDetail.ISActive)
            .query('insert into BlogDetails values(@BlogTitle,@BlogDesc,@AuthorName,@ISActive)')
        return insertBlog.recordset
    }catch(err){        
        return err
    }
}

async function updateBlogDetail(blogDetail,blogId){
    try{
        let pool = await sql.connect(config)
        let Data = await pool.request()
            .input('id',sql.Int,blogId)
            .input('BlogTitle',sql.VarChar,blogDetail.BlogTitle)
            .input('BlogDesc',sql.VarChar,blogDetail.BlogDesc)
            .input('AuthorName',sql.VarChar,blogDetail.AuthorName)
            .query('update BlogDetails SET BlogTitle=@BlogTitle,BlogDesc=@BlogDesc,AuthorName=@AuthorName where BlogID = @id')
        return Data.recordset
    }catch(err){
        return err
    }
}

async function deleteSingleBlog(blogId){
    try{
        let pool = await sql.connect(config)
        let data = await pool.request()
            .input('id',sql.Int,blogId)
            .query('update BlogDetails SET ISACtive = 1 where BlogID=@id')        
        return data.recordsets
    }catch(err){
        return err
    }
}

module.exports= {
    getAllBlogDetails : getAllBlogDetails,
    getSingleBlogDetails : getSingleBlogDetails,
    insertBlogDetail : insertBlogDetail,
    updateBlogDetail : updateBlogDetail,
    deleteSingleBlog : deleteSingleBlog
}