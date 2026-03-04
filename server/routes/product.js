const express =require('express')
const { createNewProduct, getAllProducts, singleProductDetails, updateProduct } = require('../Controllers/productController')
const multer = require('multer')
const authMiddleware = require('../middleware/authMiddleware')
const { roleCheckMiddleware } = require('../middleware/roleCheckMiddleware')

const routee =express.Router()
const uplode = multer()


routee.post("/create" ,authMiddleware, roleCheckMiddleware('admin'),uplode.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 4 }]),createNewProduct)
routee.get("/allProducts" ,getAllProducts)
routee.get("/:slug" ,singleProductDetails)
routee.put("/update",authMiddleware ,roleCheckMiddleware('admin'),updateProduct)


module.exports=routee




// -----------update produt-----------

// const updateProduct = async (req, res) => {
//   try {
//     const {title, description,category, price, discountPercentage,  variants,  tags,  isActive,  destroyImages = []
//     } = req.body;
//     const { slug } = req.params;
//     const thumbnail = req.files?.thumbnail;
//     const images = req.files?.images;

//     const productData = await productSchema.findOne({ slug });

//     if (title) productData.title = title;
//     if (description) productData.description = description;
//     if (category) productData.category = category;
//     if (price) productData.price = price;
//     if (tags && tags?.length > 0 && Array.isArray(tags)) productData.tags = tags;
//     if (discountPercentage) productData.discountPercentage = discountPercentage;
//     if (isActive) productData.isActive = isActive === "true";

//     const variantsData = variants && JSON.parse(variants);
//     if (Array.isArray(variantsData) && variantsData.length > 0) {
//       for (const variant of variantsData) {
//         if (!variant.sku)
//           return responseHandler.error(res, 400, "SKU is required.");
//         if (!variant.color)
//           return responseHandler.error(res, 400, "Color is required.");
//         if (!variant.size)
//           return responseHandler.error(res, 400, "Color is required.");
//         if (!SIZE_ENUM.includes(variant.size))
//           return responseHandler.error(res, 400, "Invalid size");
//         if (!variant.stock || variant.stock < 1)
//           return responseHandler.error(
//             res,
//             400,
//             "Stock is required and must be more then 0",
//           );
//       }

//       const skus = variantsData.map((v) => v.sku);
//       if (new Set(skus).size !== skus.length)
//         return responseHandler.error(res, 400, "SUK must unique");

//       productData.variants = variantsData
//     }

//     if (thumbnail) {
//       const imgPublicId = productData.thumbnail.split("/").pop().split(".")[0];
//       deleteFromCloudinary(`products/${imgPublicId}`);
//       const imgRes = await uploadToCloudinary(thumbnail, "products");
//       productData.thumbnail = imgRes.secure_url;
//     }
//     let imagesUrl = [];

//     let totalImges = productData.images.length;
//     if (destroyImages.length > 0) totalImges -= destroyImages.length;
//     if (Array.isArray(images) && images.length > 0) totalImges += images.length;
    
//     if (totalImges > 4) return responseHandler.error(res, 400, "You can upload maximum 4 images");
//     if (totalImges < 1) return responseHandler.error(res, 400, "Minimum 1 images should be stay");

//     if (images) {
//       const resPromise = images.map(async (item) =>
//         uploadToCloudinary(item, "products"),
//       );
//       const results = await Promise.all(resPromise);
//       imagesUrl = results.map((r) => r.secure_url);
//     }
   
//     if (Array.isArray(destroyImages) && destroyImages.length > 0) {
      
//       for (const url of destroyImages) {
//         const imgPublicId = url.split("/").pop().split(".")[0];
//         deleteFromCloudinary(`products/${imgPublicId}`);
//       }
//     }

//     let filteredImgs = productData.images.filter((item) => {
//       return !destroyImages.includes(item)
//     }) 

//     imagesUrl = imagesUrl.concat(filteredImgs)
//     if (imagesUrl.length > 0) productData.images = imagesUrl;

//     productData.save()

//     return responseHandler.success(
//       res,
//       200,
//       productData,
//       "Product Updated Successfully",
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };