import { error } from "console";
import ProductModel from "../model/products.model.js";
import UserModel from "../model/user.model.js";

export default class userController{
    
    getRegister(req,res){
        return res.render("register",{error:null,userEmail:req.session.userEmail})
    }

    getlogin(req,res){
        return res.render("login",{error:null,userEmail:req.session.userEmail})
    }

    postRegister(req,res){
        const {name,email,password} = req.body
        UserModel.add(name,email,password)
        res.render("login",{error:null,userEmail:req.session.userEmail})
    }

    postLogin(req,res){
        const {email,password} = req.body
        const result = UserModel.isValidUser(email,password)
        if(result){
           req.session.userEmail = email
           let products = ProductModel.get();
           return res.render("products", { products ,userEmail:req.session.userEmail});
        }else{
            return res.render("login",{error:"Wrong Email or Password! Please try again.",userEmail:req.session.userEmail})
        }
    }
}

