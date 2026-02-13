const { uplodecloudinary } = require("../services/cloudinaryServices");

const createNewProduct = async (req,res)=>{
    try {
        const {title,slug,description,category,price,discountPercentage,variants,tags,thumbnail,images} = req.body;
        //  const thumbnail_IMG =req.files?.thumbnail
        //  const Images_IMG =req.files?.images
        //  if (!title) return res.status(400).send({message: "title is Required" });
        //  if (!slug) return res.status(400).send({message: "slug is Required" });
        //  if (!description) return res.status(400).send({message: "description is Required" });
        //  if (!category) return res.status(400).send({message: "category is Required" });
          //  if (!price) return res.status(400).send({message: "price is Required" });
        
        //  if (!thumbnail_IMG || thumbnail_IMG.length === 0) return res.status(400).send({message: "Thumbnail is Required" });
        //  if (!images || !Array.isArray(images)) return res.status(400).send({message: "images is Required and must be an array" });

        //      let imagesUrl = [];

        // if (Images_IMG) {
        //     const resPromise = Images_IMG.map(async (item) => uplodecloudinary(item, "products"));
        //     const results = await Promise.all(resPromise)
        //     imagesUrl = results.map(r => r.secure_url)

        //   }
        //   console.log("imagesUrl" ,imagesUrl); 


        console.log(Array.isArray(variants));

        if (!Array.isArray(variants) || variants.length === 0) return  res.status(400).send({message: "Minimum 1 variant is required." });
        
      for (const element of variants) {
        console.log(element);
        
        
        if(!element.sku) return res.status(400).send({message: "Each variant must have a SKU."});
        
        
      }
        
    } catch (error) {
      console.log(error);
      
  res.status(500).send({message: "Internal Server Error"})
    }
}

module.exports ={createNewProduct}