const { find } = require("../models/productModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");






exports.createProduct = catchAsyncErrors(async (req,res,next)=>{
    
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product,
    });
});






exports.getALLproducts = catchAsyncErrors(async (req,res)=>{
    const resultPerPage = 5;
  const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search().filter().pagination(resultPerPage);

    const products = await apiFeature.query;

    res.status(200).json({
        success: true,
        products,
    });
});

exports.getProductDetails = catchAsyncErrors (async (req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHander("Product not found", 404));
    }
    res.status(200).json({
        success:true,
        product
    });
});





exports.updateProduct = catchAsyncErrors(async (req,res,next)=>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            massage:"Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product
    });
});

exports.deleteProduct = catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            massage:"Product not found"
        })
    }

    await product.remove();

    res.status(200).json({
        success:true,
        massage:"product delete succesfully"
    });
});




