const categorySchema = require("../models/categorySchema");
const productSchema = require("../models/productSchema");
const { uplodecloudinary } = require("../services/cloudinaryServices");
const { sendError, sendSuccess } = require("../services/responseHandler");
const ENUM_SIZE = ["s", "m", "l", "xl", "2xl", "3xl"];

const createNewProduct = async (req,res)=>{
    try {
        const {title,slug,description,category,price,discountPercentage,variants,tags} = req.body;
         const thumbnail =req.files?.thumbnail
         const images =req.files?.images

        //  ------------- basic validations------------
         if (!title) return sendError(res, "title is Required", 400);
         if (!slug) return sendError(res, "slug is Required", 400);
         const ExistingSlug = await productSchema.findOne({ slug:slug.toLowerCase().trim()})
         if (ExistingSlug) return sendError(res, "slug already exists", 400);
         if (!description) return sendError(res, "description is Required", 400);
         if (!category) return sendError(res, "category is Required", 400);
         const ExistingCategory = await categorySchema.findById(category);
         if (!ExistingCategory) return sendError(res, "Invalid category", 400);
         if (!price) return sendError(res, "price is Required", 400);
        
// ------------------variants validatoin-------------------

       const varientdata = JSON.parse(variants)
       if (!Array.isArray(varientdata) || varientdata.length === 0) return  sendError(res, "Minimum 1 variant is required.", 400); 
       for (const element of varientdata) {
        
        if(!element.sku) return sendError(res, "Each variant must have a SKU.", 400);
        if(!element.color) return sendError(res, "Each variant must have a color.", 400);
        if(!element.size) return sendError(res, "Each variant must have a size.", 400);
        if(!ENUM_SIZE.includes(element.size)) return sendError(res, "Invalid size.", 400);
        if(!element.stock || element.stock < 1) return sendError(res, "Each variant must have a valid stock value.", 400);
        
        const ALL_Sku = varientdata.map(v=>v.sku)
        if( new Set(ALL_Sku).size !== ALL_Sku.length) return sendError(res, "Duplicate SKU found.", 400);
        
      }

// -----------------thumbnail validation----------------

  if (!thumbnail || thumbnail?.length === 0) return sendError(res, "Thumbnail is Required", 400);
         if (images && images?.length > 4) return sendError(res, "You can upload images max 4", 400);
         const thumnailUrl = await uplodecloudinary(thumbnail[0], "products")

        if (!thumnailUrl) return sendError(res, "Failed to upload thumbnail", 400);

// -------------images validation------------

        let imagesUrl = [];

        if (images) {
            const resPromise = images.map(async (item) => uplodecloudinary(item, "products"));
            const results = await Promise.all(resPromise)
            imagesUrl = results.map(r => r.secure_url)

          }

    // ---------save to databsse--------
    const formattedSlug = slug.toLowerCase().trim();
      const newProduct = new productSchema({
        title,
        slug :formattedSlug,
        description,
        category,price,
        discountPercentage,
        variants: varientdata,
        tags,
        thumbnail: thumnailUrl.secure_url,
        images: imagesUrl
      })
      await newProduct.save()
      sendSuccess(res, "Product created successfully", newProduct, 201)
    } catch (error) {
      console.log(error);
      
  sendError(res, "Internal Server Error", 500)
    }
}



// ---------get all  products -------------

const getAllProducts = async( req,res)=>{
  try {

const page = parseInt(req.query.page) || 1; 
const limit = parseInt(req.query.limit) || 10; 
const skip = (page - 1) * limit;
const category = req.query.category




  const totalProducts = await productSchema.countDocuments();
  const totalPages = Math.ceil(totalProducts / limit);
  const products = await productSchema
      .find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

     sendSuccess(res, "All products" ,{
      product:products,
      pagination:{
        totalProducts,
        page,
        limit,
        totalPages,


        
        
      }

     }  ,200)
    
  } catch (error) {
   
   sendError(res,"server error" ,500 ,error)
  }
}
module.exports ={createNewProduct,getAllProducts}