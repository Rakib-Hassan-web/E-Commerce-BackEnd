const categorySchema = require("../models/categorySchema")
const { uplodecloudinary } = require("../services/cloudinaryServices")
const { sendSuccess } = require("../services/responseHandler")


const createNewCategory = async(req,res)=>{
    try {
        const {name ,description,slug} = req.body


        if(!name) return  sendSuccess(res , " Category name is required" ,200)
        if(!slug) return  sendSuccess(res , " slug is required" ,200)
        if(!req.file) return res.status(400).send({message :" Category thumbnail is required"})


        const existingCategoryslug = await categorySchema.findOne({slug})
        if(existingCategoryslug) return res.status(400).send({message :" Category already exists"})


     const response =await uplodecloudinary(req.file ,"thumbnail")

       const  category = new categorySchema({
        name,
        description,
        slug,
        thumbnail:response.secure_url
       })

       category.save()

        res.status(201).send({message :" Category created successfully"})


    } catch (error) {
        res.status(500).send({message:"Internal server error"})
        console.log(error)
    }
}


module.exports={createNewCategory}