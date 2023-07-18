const Products= require('./src/model/productModel')
const productsdata=require('./src/Productdata/Productdata')

const DefaultData=async(req,res)=>{
    try{
        await Products.deleteMany({});
        const storeData=await Products.insertMany(productsdata)

    }catch(error){
     console.log('error'+error.message)
    }
}

module.exports=DefaultData