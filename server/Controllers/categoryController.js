const categorySchema = require("../models/categorySchema")
const { uplodecloudinary } = require("../services/cloudinaryServices")


const createNewCategory = async(req,res)=>{
    try {
        const {name ,description} = req.body


        if(!name) return res.status(400).send({message :" Category name is required"})
        if(!req.file) return res.status(400).send({message :" Category thumbnail is required"})


        const existingCategory = await categorySchema.findOne({name})
        if(existingCategory) return res.status(400).send({message :" Category already exists"})


     const response =await uplodecloudinary(req.file ,"thumbnail")

       const  category = new categorySchema({
        name,
        description,
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