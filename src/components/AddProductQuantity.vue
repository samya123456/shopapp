<template>
<v-app>
    
<div class="container">
     <v-card-title>
     Add Product Quantity
    </v-card-title>
     <div id ="alertId" style="display:none">
            <v-alert  class="text-center"
                :type="alerttype"
                outlined
                border="left"
                @input="closeAlert"
                :value="alert"
            >
                    Available Products: {{ProductCompany.productcompanyQuantity}}
            </v-alert>
          </div>
      <v-form  ref="form"  method ="post">
         
          <v-text-field 
          label="Product Name" 
          v-bind:value="product.productName">
          </v-text-field>
         
         <v-select v-model="selected"
            :items="products"
            label="Product Code"
            item-text="productCode"
            item-value="productCode"
             @change="onChangeProductCode()"
            return-object>
        </v-select>
            
        <v-select v-model="selectedProductWiseCompanyList"
            :items="ProductWiseCompanyList"
            label="Product Company Code"
            item-text="company.code"
            item-value="company.code"
             @change="onChangeCompanyCode()"
            return-object>
        </v-select>
             
          <v-text-field 
          label="Product Quantity To Add" 
          v-model="productQuantityToAdd"
          width="200">
          </v-text-field>
         
             
          <input type="hidden" name ="productId" v-model="product.productId" >
        
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
            options: [],
            ProductWiseCompanyList:[],
            ProductCompany:[],
            selectedProductWiseCompanyList:[],
            alerttype:"",
            productQuantityToAdd:null

        }

    },

    methods : {
        postData(e){
             
            e.preventDefault();
            this.ProductCompany.productcompanyQuantity = parseInt(this.ProductCompany.productcompanyQuantity)+ parseInt(this.productQuantityToAdd)
            alert(this.ProductCompany.productcompanyQuantity)
           /* this.axios.post("http://localhost:9000/Inventory/insert",this.ProductCompany)
            .then((response)=>{
                    console.warn(response)
            })
            .catch(error => {
            this.errorMessage = error.message;
            console.log("There was an error!", error);
            });*/
            var x = document.getElementById("alertId");
                    if (x.style.display === "block") {
                        x.style.display = "none";
                    }
         
        },
        onChangeProductCode(){
            this.product = this.selected

             this.axios.post("http://localhost:9000/Inventory/allComapanyOfProduct",this.product)
        .then((response) =>{
            this.ProductWiseCompanyList = response.data;
            console.warn(this.ProductWiseCompanyList)
            
        })
        .catch(error => {
            this.errorMessage = error.message;
            console.log("There was an error!", error);
            });
        },
        validateSelection(event){
            alert(event)
        },
        closeAlert(){
                  var x = document.getElementById("alertId");
                    if (x.style.display === "block") {
                        x.style.display = "none";
                    }else{
                        x.style.display = "block"
                    }
        },
        onChangeCompanyCode(){
           
            this.ProductCompany =this. selectedProductWiseCompanyList
            if( this.ProductCompany.productcompanyQuantity>2){
                this.alerttype ="success"
            }else{
                this.alerttype ="warning"
            }
             var x = document.getElementById("alertId");
                    if (x.style.display === "none") {
                        x.style.display = "block";
                    } 
                    this.productQuantityToAdd="";
        }
    },
    white:"",

}
</script>


