<template>
<v-app>
  <div class="container"> 
       <v-card-title>
       Add Your Product 
       </v-card-title>
  
      <v-form  ref="form" @submit="postData" method ="post">
           <v-text-field 
          label="Product Name" 
          v-bind:value="product.productName">
          </v-text-field>
           <v-text-field 
          label="Product Code" 
          v-bind:value="product.productCode">
          </v-text-field>
           <v-text-field 
          label="Product Company Id" 
          v-bind:value="product.productCompanyId">
          </v-text-field>
          
          <input type="hidden" name ="productId" v-model="product.productId" >
           <v-btn
            color="primary"
            elevation="12"
            large
            small
            x-large
            x-small
          >Submit</v-btn>
      </v-form>    

  </div>  
  </v-app> 
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

