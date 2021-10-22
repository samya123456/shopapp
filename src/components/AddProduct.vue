<template>
<v-app>
  <div class="container"> 

       <v-card-title>
       Add product 
       </v-card-title>
   <v-container>     
        <validation-observer
            ref="observer"
            v-slot="{ invalid }"
        >
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
         Product added successfully
        </v-col>
            </v-alert>
          </div>
       
      <v-form  ref="form" @submit="postData"    method ="post">
          <validation-provider
        v-slot="{ errors }"
        name="product.productName"
        rules="required">
           <v-text-field 
           label="Product Name" 
           v-model="product.productName"
           :error-messages="errors"
           required
           >
           
          </v-text-field>
          </validation-provider>
           <validation-provider
                v-slot="{ errors }"
                name="product.productCode"
                :rules="{
                required: true
                }">
           <v-text-field 
           label="Product Code" 
           v-model="product.productCode"
           :error-messages="errors"
           required
            >
          </v-text-field>
           </validation-provider>
           <validation-provider
                v-slot="{ errors }"
                name="company"
                rules="required"
            >
            <v-autocomplete v-model="company"
                :items="companies"
                label="Product Company Code"
                item-text="code"
                item-value="code"
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
                name="Purchase cost"
                rules="required"
            >
          <v-text-field
                label="Purchase cost"
                
                v-model="productCompany.productPurchasePrice"
                :error-messages="errors"
                required
                outlined
                 
          ></v-text-field>
           </validation-provider> 
          </v-col>
          <v-col
                cols="50"
                sm="6"
                md="3">
                 <validation-provider
                v-slot="{ errors }"
                name="Currency"
                rules="required"
            >  
        <v-autocomplete v-model="currency"
            :items="currencies"
            label="Currency"
            item-text="currency.value"
            item-value="currency.value"
            outlined
             @change="onChangeCurrency()"
             :error-messages="errors"
            required
            return-object>
        </v-autocomplete>
          </validation-provider>   
          </v-col>
            <v-col
                cols="50"
                sm="10"
                md="3"
            >
            <validation-provider
                v-slot="{ errors }"
                name="Min price to sale"
                rules="required|isGreater:@Purchase cost"
            >
            
          <v-text-field
            label="Min price to sale"
             v-model="productCompany.productSaleMinPrice"
            :error-messages="errors"
            outlined
               
             required
          ></v-text-field>
           </validation-provider> 
 </v-col>
   <v-col
                cols="50"
                sm="10"
                md="3"
            >
  
            <validation-provider
                v-slot="{ errors }"
                name="Max price to sale"
                rules="required|isGreater:@Min price to sale"
            >
          <v-text-field
            label="Max price to sale"
             v-model="productCompany.productSaleMaxPrice"
            :error-messages="errors"
             required
             outlined
                 
          ></v-text-field>
           </validation-provider> 
         </v-col>
        
        </v-row>
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

  
  
  </v-container>
  
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
               productcompanyQuantity:0,
               productPurchasePrice:null,
               productSaleMinPrice:null,
               productSaleMaxPrice:null,
               productSaleCurrecy:null,
               productPurchaseCurrecy:null
            },

            branches:[],
            searchInput: "",
            invalid:true,
            currencies:{
                currency:{
                    value:"RS"
                }
            }
            
        }

        

    },
    methods : {
        postData(e){
              this.$refs.form.validate()
              this.$refs.observer.validate()
               e.preventDefault();
               this.productCompany.company = this.company
               this.productCompany.product =this.product
               this.productCompany.modeOfOpertion ='NEW_PRODUCT_ADDED'

               console.warn(this.productCompany)
           this.axios.post("http://localhost:9000/Inventory/addProduct",this.productCompany)
            .then((response)=>{
                    console.warn(response)
                    this.$refs.form.reset()
              
                this.displaySuccessAlert();
                setTimeout(function () {
               var x = document.getElementById("successMsgAlertId");
               if( x.style.display=='block'){
                    x.style.display='none'
               }
               
    }, 3000);
     this.$refs.observer.reset()
            })
            .catch(error => {
            this.errorMessage = error.message;
            console.log("There was an error!", error);
            }); 
              
             
         
        },
        displaySuccessAlert(){

              var x = document.getElementById("successMsgAlertId");
                    if (x.style.display === "none") {
                        x.style.display = "block";
                    } 

        },
    }

}

</script>

