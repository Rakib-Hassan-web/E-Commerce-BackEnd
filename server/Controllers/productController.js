const categorySchema = require("../models/categorySchema");
const productSchema = require("../models/productSchema");
const { uplodecloudinary } = require("../services/cloudinaryServices");
const ENUM_SIZE = ["s", "m", "l", "xl", "2xl", "3xl"];

const createNewProduct = async (req,res)=>{
    try {
        const {title,slug,description,category,price,discountPercentage,variants,tags} = req.body;
         const thumbnail =req.files?.thumbnail
         const images =req.files?.images
         if (!title) return res.status(400).send({message: "title is Required" });
         if (!slug) return res.status(400).send({message: "slug is Required" });
         if (!description) return res.status(400).send({message: "description is Required" });
         if (!category) return res.status(400).send({message: "category is Required" });
         const ExistingCategory = await categorySchema.findById(category);
         if (!ExistingCategory) return res.status(400).send({message: "Invalid category" });
         if (!price) return res.status(400).send({message: "price is Required" });
        


         if (!thumbnail || thumbnail?.length === 0) return res.status(400).send({message: "Thumbnail is Required" });
         if (images && images?.length > 4) return res.status(400).send({message: "You can upload images max 4" });
         const thumnailUrl = await uplodecloudinary(thumbnail[0], "products")

        if (!thumnailUrl) return res.status(400).send({message: "Failed to upload thumbnail" });




        let imagesUrl = [];

        if (images) {
            const resPromise = images.map(async (item) => uplodecloudinary(item, "products"));
            const results = await Promise.all(resPromise)
            imagesUrl = results.map(r => r.secure_url)

          }
      


    
       if (!Array.isArray(variants) || variants.length === 0) return  res.status(400).send({message: "Minimum 1 variant is required." });
        
      for (const element of variants) {
        
        
        if(!element.sku) return res.status(400).send({message: "Each variant must have a SKU."});
        if(!element.color) return res.status(400).send({message: "Each variant must have a color."});
        if(!element.size) return res.status(400).send({message: "Each variant must have a size."});
        if(!ENUM_SIZE.includes(element.size)) return res.status(400).send({message: " Invalid size."});
        if(!element.stock || element.stock < 1) return res.status(400).send({message: "Each variant must have a valid stock value."});
        
        const ALL_Sku = variants.map(v=>v.sku)
        if( new Set(ALL_Sku).size !== ALL_Sku.length) return res.status(400).send({message: "Duplicate SKU found."});
        console.log(ALL_Sku);
      }


      const newProduct = new productSchema({
        title,
        slug,
        description,
        category,price,
        discountPercentage,
        variants,
        tags,
        thumbnail: thumnailUrl.secure_url,
        images: imagesUrl
      })
      await newProduct.save()
      res.status(201).send({message: "Product created successfully", product: newProduct})
    } catch (error) {
      console.log(error);
      
  res.status(500).send({message: "Internal Server Error"})
    }
}

module.exports ={createNewProduct}