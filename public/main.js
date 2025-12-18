function deleteProduct(id){
   const ans = confirm("Are you sure to delete this product")
   if(ans){
    fetch("/delete/"+id,{
        method:"post"
    })
    .then((res)=>{
         if(res.ok){
            location.reload()
         }
       });
   }
}
