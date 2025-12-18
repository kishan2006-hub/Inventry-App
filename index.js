import express from "express"
import ProductController from "./src/controller/products.controller.js"
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";
import validation from "./src/middelewares/validation.js";
import { uploadFile } from "./src/middelewares/file-upload.js";
import userController from "./src/controller/user.controller.js";
import session from "express-session";
import auth from "./src/middelewares/auth.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middelewares/lastVisit.middeleware.js";

const server = express()

server.use(express.urlencoded({ extended: true }));

server.set("view engine", "ejs");
server.set("views",path.join(path.resolve(), "src", "view"))
server.use(expressEjsLayouts)
server.use(express.static("public"))
server.use(session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true,
    cookie: false
}))
server.use(cookieParser())
// server.use(setLastVisit)

const ProductControlle = new ProductController();
const registerpage = new userController();

server.get("/",auth,setLastVisit,ProductControlle.getProducts)
server.get("/new",auth,ProductControlle.getAddForm)
server.post("/",uploadFile.single("imageUrl"),validation,ProductControlle.addNewProduct)
server.get("/update/:id",auth,ProductControlle.updateproduct)
server.post("/delete/:id",ProductControlle.delete)
server.get("/register",registerpage.getRegister)
server.get("/login",registerpage.getlogin)
server.post("/pr-update",validation,ProductControlle.updated)
server.post("/register",registerpage.postRegister)
server.post("/login",registerpage.postLogin)
server.get("/logout",ProductControlle.logout)

server.use(express.static("src/view"))

server.listen(3400,()=>{
    console.log("Server run at 3400")
})


