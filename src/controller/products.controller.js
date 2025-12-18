import path from "path";
import ProductModel from "../model/products.model.js";

export default class ProductController {
  getProducts(req, res) {
    let products = ProductModel.get();
    return res.render("products", { products,userEmail:req.session.userEmail });
  }

  getAddForm(req, res) {
    return res.render("new-product",{error:null,userEmail:req.session.userEmail});
  }

  addNewProduct(req, res) {
  
    const {name,desc,price} = req.body
    const imageUrl = "/images/"+req.file.filename
    
    ProductModel.add(name,desc,price,imageUrl)
    let products = ProductModel.get();
    return res.render("products", { products,userEmail:req.session.userEmail});
  }

  updateproduct(req,res,next){

    const id = req.params.id
    const productFound = ProductModel.getById(id)
    if(productFound){
      return res.render("update-product",{product:productFound,error:null,userEmail:req.session.userEmail})
    }else{
      return res.status(401).send("Product Not Found.")
    }
  }

  updated(req,res,next){
    ProductModel.update(req.body)
    let products = ProductModel.get();
    res.render("products",{products,userEmail:req.session.userEmail})
  }

  delete(req,res){
    const id = req.params.id
    const productFound = ProductModel.getById(id)
    if(!productFound){
      return res.status(401).send("Product Not Found.")
    }
    ProductModel.delete(id)
    let products = ProductModel.get();
    res.render("products", { products ,userEmail:req.session.userEmail});
  }

  logout(req,res){
    req.session.destroy((err)=>{
      if(err){
        console.log(err)
      }else{
        res.redirect("/login")
      }
    })
    res.clearCookie("lastVisit")
  }
}

