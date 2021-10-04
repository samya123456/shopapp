<template>
<v-app>
  <div class="container"> 
       <v-card-title>
       Add Your Product 
       </v-card-title>
  
      <v-form  ref="form" @submit="postData" method ="post">
           <v-text-field 
          label="Product Name" 
           v-model="product.productName"
            :rules="productNameRules">
          </v-text-field>
           <v-text-field 
          label="Product Code" 
           v-model="product.productCode"
            :rules="productNameRules">
          </v-text-field>
            <v-autocomplete v-model="company"
                :items="companies"
                label="Product Company Code"
                item-text="code"
                 :rules="productNameRules"
                item-value="code"
                return-object>
           </v-autocomplete>
          
           <v-btn
            color="primary"
            elevation="12"
            large
            small
            x-large
            x-small
             @click="postData"
          >Submit</v-btn>
      </v-form>    

  </div>  
  </v-app> 
</template>

<script>

export default {
    name:"InsertDataToInventory",
    mounted(){
        this.axios.get("http://localhost:9000/Inventory/allCompany")
        .then((response) =>{
            this.companies = response.data;
         
         
            
        })
        .catch(error => {
            this.errorMessage = error.message;
            console.log("There was an error!", error);
            });
        
    },
    data(){
        return {
            product :{
                productName:null,
                productCode :null,
                productQuantity:0
                

            },
            companies:[],
            company:{},
            productCompany:{
               product:null,
               company:null,
               productcompanyQuantity:0 
            },
            searchInput: "",
            productNameRules: [
                v => !!v || 'Product name is required'
            ],
        }

        

    },
    methods : {
        postData(e){
             this.$refs.form.validate()
               e.preventDefault();
               this.productCompany.company = this.company
               this.productCompany.product =this.product

               console.warn(this.productCompany)
        /*   this.axios.post("http://localhost:9000/Inventory/addProduct",this.productCompany)
            .then((response)=>{
                    console.warn(response)
            })
            .catch(error => {
            this.errorMessage = error.message;
            console.log("There was an error!", error);
            }); */
         
        }
    }

}
</script>

