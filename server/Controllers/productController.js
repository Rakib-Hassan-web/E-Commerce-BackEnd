const { uplodecloudinary } = require("../services/cloudinaryServices");

const createNewProduct = async (req,res)=>{
    try {
        const {title,slug,description,category,price,discountPercentage,variants,tags,thumbnail,images} = req.body;
         const thumbnail_IMG =req.files?.thumbnail
         const Images_IMG =req.files?.images
        //  if (!title) return res.status(400).send({message: "title is Required" });
        //  if (!slug) return res.status(400).send({message: "slug is Required" });
        //  if (!description) return res.status(400).send({message: "description is Required" });
        //  if (!category) return res.status(400).send({message: "category is Required" });
          //  if (!price) return res.status(400).send({message: "price is Required" });
        
        //  if (!thumbnail_IMG || thumbnail_IMG.length === 0) return res.status(400).send({message: "Thumbnail is Required" });
        //  if (!images || !Array.isArray(images)) return res.status(400).send({message: "images is Required and must be an array" });

             let imagesUrl = [];

        if (images) {
            const resPromise = images.map(async (item) => uploadToCloudinary(item, "products"));
            const results = await Promise.all(resPromise)
            imagesUrl = results.map(r => r.secure_url)
        }


        // console.log(req.file); 
    } catch (error) {
  res.status(500).send({message: "Internal Server Error"})
    }
}

module.exports ={createNewProduct}