<template>
<v-app>
    
<div class="container">
     <v-card-title>
     Add Product Quantity
    </v-card-title>
      <validation-observer
            ref="observer"
            v-slot="{ invalid }"
        >
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
                :value="successAlert"
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
           
      <v-form  ref="form"  @submit="postData" method ="post">
          <validation-provider
                v-slot="{ errors }"
                name="Product Code"
                rules="required"
            >  
        <v-autocomplete v-model="selected"
            :items="products"
            label="Product Code"
            :error-messages="errors"
            required
            item-text="productCode"
            item-value="productCode"
             @change="onChangeProductCode()"
              
            return-object>
        </v-autocomplete>
          </validation-provider>  
       <validation-provider
        v-slot="{ errors }"
        name="Product Name"
        rules="required">  
          <v-text-field 
            label="Product Name" 
            :error-messages="errors"
            required
            v-model="product.productName"
             :disabled="true"
          >
          </v-text-field>
           </validation-provider>
       
           <validation-provider
                v-slot="{ errors }"
                name="Product Company Code"
                rules="required"
            >  
        <v-autocomplete v-model="selectedProductWiseCompanyList"
            :items="ProductWiseCompanyList"
            label="Product Company Code"
            item-text="company.code"
            item-value="company.code"
             @change="onChangeCompanyCode()"
             :error-messages="errors"
            required
            return-object>
        </v-autocomplete>
          </validation-provider>   
           <br/>
           <v-row>   
               <v-col
                cols="50"
                sm="6"
                md="3">
          <validation-provider
                v-slot="{ errors }"
                name="Product Quantity"
                rules="required"
            > 
          <v-text-field 
            label="Quantity To Add" 
            v-model="addedQuantity"
            :error-messages="errors"
            outlined
            required>
          </v-text-field>
          
         </validation-provider> 
               </v-col>
             <v-col
                cols="50"
                sm="6"
                md="3">
               <validation-provider
                v-slot="{ errors }"
                name="Branch"
                rules="required"
            >  
        <v-autocomplete v-model="selectedBranch"
            :items="branches"
            label="Branch"
            :error-messages="errors"
            required
            item-text="branchName"
            item-value="branchName"
               outlined
            return-object>
        </v-autocomplete>
          </validation-provider>  
           </v-col>
           </v-row>
             
          <input type="hidden" name ="productId" v-model="product.productId" >
          
                
    <br/>
          <v-btn
            color="primary"
            elevation="12"
            large
            small
            x-large
            x-small
            @click="postData"
            :disabled="invalid"
          >Submit</v-btn>
          
          
          
      </v-form>    
       </validation-observer>
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
          
         
            
        })
        .catch(error => {
            this.errorMessage = error.message;
            console.log("There was an error!", error);
            });

            
            this.axios.get("http://localhost:9000/Inventory/allBranches")
          . then((response) =>{
            this.branches = response.data;
            
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
            ProductWiseCompanyList:[],
            ProductCompany:[],
            selectedProductWiseCompanyList:[],
            alerttype:"",
            selectedBranch:[],
            addedQuantity:null,
            successAlert:true,
            branch:null,
            ProductCompanyBranch:{
            }

        }

    },

    methods : {
        postData(e){
            this.$refs.form.validate()
            this.$refs.observer.validate()
            e.preventDefault();
            this.ProductCompany.productcompanyQuantity = parseInt(this.ProductCompany.productcompanyQuantity)+ parseInt(this.addedQuantity)
            this.ProductCompany.addedQuantity =  parseInt(this.addedQuantity)
            alert(this.ProductCompany.productcompanyQuantity)
            this.ProductCompanyBranch.productCompany =  this.ProductCompany;
            this.ProductCompanyBranch.branch =  this.selectedBranch;
          /*  this.axios.post("http://localhost:9000/Inventory/updateQuantity",this.ProductCompanyBranch)
            .then((response)=>{
                    console.warn(response)
            })
            .catch(error => {
            this.errorMessage = error.message;
            console.log("There was an error!", error);
            }); */
             this.closeAlert()
             this.$refs.form.reset()
             this.displaySuccessAlert();
              setTimeout(function () {
               var x = document.getElementById("successMsgAlertId");
               if( x.style.display=='block'){
                    x.style.display='none'
               }
               
    }, 3000);
     this.$refs.observer.reset()
   
             
         
        },
       displaySuccessAlert(){

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
<style>
.group {
  display: flex;
  flex: 1;
  justify-content: space-around;
}



</style>


