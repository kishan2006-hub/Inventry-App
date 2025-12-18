export default class ProductModel {
  constructor(_id, _name, _desc, _price, _imageUrl) {
    this.id = _id;
    this.name = _name;
    this.desc = _desc;
    this.price = _price;
    this.imageUrl = _imageUrl;
  }

  static get() {
    return products;
  }

  static add(name,desc,price,imageUrl) {
    const newproduct = new ProductModel(products.length+1,name,desc,price,imageUrl)
    products.push(newproduct)
  }

  static update(obj){ 
    const index = products.findIndex(p=>p.id==obj.id)
    products[index] = obj
     
  }

  static getById(id){
    return products.find((p)=>p.id==id)
  }

  static delete(id){
    const index = products.findIndex(p=>p.id==id)
    products.splice(index,1)
  }
}

var products = [
  new ProductModel(1, "product-1", "dec for pro-1", 22, "helloword.com"),
  new ProductModel(2, "product-1", "dec for pro-1", 22, "helloword.com"),
  new ProductModel(3, "product-1", "dec for pro-1", 22, "helloword.com"),
];


