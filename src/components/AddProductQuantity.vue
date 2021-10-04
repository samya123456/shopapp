<template>
<v-app>
    
<div class="container">
     <v-card-title>
     Add Product Quantity
    </v-card-title>
     <div id ="availableProductsAlertId" style="display:none">
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

          <div id ="successMsgAlertId" style="display:none">
            <v-alert  class="text-center"
                :type="success"
                :value="alert"
                dismissible
                color="cyan"
                border="left"
                elevation="2"
                colored-border
                icon="mdi-twitter"
            >
                    <v-col class="grow">
         Item added successfully
        </v-col>
            </v-alert>
          </div>
       <div id ="submitSuccessAlertId" style="display:none">
            <v-alert  class="text-center"
                :type="success"
                outlined
                border="left"
            >
                   Item Added Successfully; 
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
          v-model="addedQuantity">
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
            addedQuantity:null

        }

    },

    methods : {
        postData(e){
             
            e.preventDefault();
            this.ProductCompany.productcompanyQuantity = parseInt(this.ProductCompany.productcompanyQuantity)+ parseInt(this.addedQuantity)
            this.ProductCompany.addedQuantity =  parseInt(this.addedQuantity)
            alert(this.ProductCompany.productcompanyQuantity)
           /* this.axios.post("http://localhost:9000/Inventory/updateQuantity",this.ProductCompany)
            .then((response)=>{
                    console.warn(response)
            })
            .catch(error => {
            this.errorMessage = error.message;
            console.log("There was an error!", error);
            }); */
            this.refreshForm();
            this.displaySuccessAlert();
             
             
         
        },
        refreshForm(){
             this.ProductCompany ='';
             this.product.productName=''
             this.selected =''
             this.selectedProductWiseCompanyList=''
             this.addedQuantity =''
             this.closeAlert()

        },displaySuccessAlert(){

              var x = document.getElementById("successMsgAlertId");
                    if (x.style.display === "none") {
                        x.style.display = "block";
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
                  var x = document.getElementById("availableProductsAlertId");
                    if (x.style.display === "block") {
                        x.style.display = "none";
                    }
        },
        onChangeCompanyCode(){
           
            this.ProductCompany =this. selectedProductWiseCompanyList
            if( this.ProductCompany.productcompanyQuantity>2){
                this.alerttype ="success"
            }else{
                this.alerttype ="warning"
            }
             var x = document.getElementById("availableProductsAlertId");
                    if (x.style.display === "none") {
                        x.style.display = "block";
                    } 
                    this.productQuantityToAdd="";
        }
    },
    white:"",

}
</script>


