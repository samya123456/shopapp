<template>

  <div> 
      <h1> Add Your Product Quantity </h1>
   
  
      <form @submit="postData" method ="post">
          <label for="productName">Product Name:</label>
          <input type="text" name ="productName" v-model="product.productName" ><br/><br/>
          <label for="productCode">Product Code:</label>
          <select name ="productCode" @change="onChange()" v-model="selected">
            <option :value="product" v-for="(product, index) in products" v-bind:key="index">
               {{ products[index].productCode }}
            </option>
          </select><br/><br/>
          <label for="productCompanyId">Product Company Id:</label>
          <input type="text" name ="productCompanyId" v-model="product.productCompanyId" ><br/><br/>
          <label for="productQuantityId">Product Quantity:</label>
          <input type="text" name ="productQuantityId" v-model="product.productQuantity" ><br/><br/>
          <input type="hidden" name ="productId" v-model="product.productId" >
          <button type="submit"> Enter </button>
          
      </form>    
 <!-- Comment <Dropdown
    :options=this.options
     v-on:selected="validateSelection($event)"
    :disabled="false"
    name="zipcode"
    :maxItem="10"
    placeholder="Please select an option">
</Dropdown>
  </div>-->
  </div>   
</template>

<script>

export default {
    name:"InsertDataToInventory",
    mounted(){
        this.axios.get("http://localhost:9000/Inventory/getAllProducts")
        .then((response) =>{
            this.products = response.data;
           for (var i = 0; i <  this.products.length ; i++){
              this.options.push({
                id:   i,
                name:  this.products[i].productCode
            });
           }
         
            
        })
        .catch(error => {
            this.errorMessage = error.message;
            console.log("There was an error!", error);
            });
        
    },
    data(){
        return {
            product :{
                productId:1,
                productName:null,
                productCode :null,
                productQuantity:0
                

            },
            selected:{},
            products:[],
            options: []
        }

    },
    methods : {
        postData(e){
            e.preventDefault();
            this.axios.post("http://localhost:9000/Inventory/insert",this.product)
            .then((response)=>{
                    console.warn(response)
            })
            .catch(error => {
            this.errorMessage = error.message;
            console.log("There was an error!", error);
            });
         
        },
        onChange(){
            this.product = this.selected
        },
        validateSelection(event){
            alert(event)
        }
    }

}
</script>

