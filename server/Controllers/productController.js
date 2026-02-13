
const createNewProduct = async (req,res)=>{
    try {
        const {title,slug,description,category,price,discountPercentage,variants,tags,thumbnail,images} = req.body;

        //  if (!title) return res.status(400).send({message: "title is Required" });
        //  if (!slug) return res.status(400).send({message: "slug is Required" });
        //  if (!description) return res.status(400).send({message: "description is Required" });
        //  if (!category) return res.status(400).send({message: "category is Required" });
        //  if (!price) return res.status(400).send({message: "price is Required" });
        
        //  if (!thumbnail) return res.status(400).send({message: "thumbnail is Required" });
        //  if (!images || !Array.isArray(images)) return res.status(400).send({message: "images is Required and must be an array" });

        

        console.log(req.files); 
    } catch (error) {
  res.status(500).send({message: "Internal Server Error"})
    }
}

module.exports ={createNewProduct}