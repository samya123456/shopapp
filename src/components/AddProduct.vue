<template>

  <div> 
      <h1> Add Your Product </h1>
   
  
     <form @submit="postData" method ="post">
          <label for="productName">Product Name:</label>
          <input type="text" name ="productName" v-model="product.productName" ><br/><br/>
          <label for="productCode">Product Code:</label>
          <input type="text" name ="productCode" v-model="product.productCode" ><br/><br/>
          <label for="productCompanyId">Product Company Id:</label>
          <input type="text" name ="productCompanyId" v-model="product.productCompanyId" ><br/><br/>
          <label for="productQuantityId">Product Quantity:</label>
          <input type="text" name ="productQuantityId" v-model="product.productQuantity" ><br/><br/>
          <input type="hidden" name ="productId" v-model="product.productId" >
          <button type="submit"> Enter </button>
      </form>    

  </div>   
</template>

<script>

export default {
    name:"InsertDataToInventory",
    data(){
        return {
            product :{
                productId:1,
                productName:null,
                productCode :null,
                productQuantity:0
                

            }
        }

    },
    methods : {
        postData(e){
            this.axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
               e.preventDefault();
            this.axios.post("http://localhost:9000/Inventory/insert",
            this.product,{
                 mode: 'cors',
                  credentials: 'include'
            })
            .then((response)=>{
                    console.warn(response)
            })
            .catch(error => {
            this.errorMessage = error.message;
            console.log("There was an error!", error);
            });
         
        }
    }

}
</script>

