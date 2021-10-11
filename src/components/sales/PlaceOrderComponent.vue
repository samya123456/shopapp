<template>
<v-app>
    <div class="container"> 
       <v-card-title>
       Create order
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

<v-btn @click="addInput"
     color="primary"
      fab
      dark
     >
     <v-icon dark>
        mdi-plus
      </v-icon>
</v-btn>

    <div  v-for="(input, index) in inputs " v-bind:key="index">
        <br/>
         <v-row>
              <v-col
                cols="50"
                sm="6"
                md="3">
         <v-autocomplete v-model="selected"
            :items="products"
            label="Product Code"
            :error-messages="errors"
            required
            item-text="productCode"
            item-value="productCode"
             @change="onChangeProductCode()"
              outlined
            return-object>
        </v-autocomplete>
            </v-col>
             <v-col
                cols="50"
                sm="6"
                md="3">

        <v-autocomplete v-model="selectedProductWiseCompanyList"
            :items="ProductWiseCompanyList"
            label="Product Company Code"
            item-text="company.code"
            item-value="company.code"
             @change="onChangeCompanyCode()"
             :error-messages="errors"
             outlined
            required
            return-object>
        </v-autocomplete>
            </v-col>
              



           <v-col>
                <v-btn 
                color="primary"
                elevation="12"
                large
                small
                x-large
                x-small
                @click="deleteRow(index)"
                >
                <v-icon dark>
                    mdi-minus
                </v-icon>
            </v-btn>
           </v-col>
           
    </v-row>
    </div>


    </div>      

</v-app> 
</template>
<script>
export default {

    name:"PlaceOrderComponent",
     mounted(){
          this.axios.get("http://localhost:9000/Inventory/getAllProducts")
        .then((response) =>{
            this.products = response.data;
          
         
            
        })
        .catch(error => {
            this.errorMessage = error.message;
            console.log("There was an error!", error);
            });


     },
     data(){
        return {
            products:[],
            inputs: [],
            ProductWiseCompanyList:[],
            selectedProductWiseCompanyList:[],
            ProductCompany:[],
        }
     },
     methods : {
          addInput() {
            this.inputs.push(this.inputs.length+1)
            },
            deleteRow(index) {
            this.inputs.splice(index,1)
            } ,
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
        },
        closeAlert(){
                  var x = document.getElementById("availableProductsAlertId");
                    if (x.style.display === "block") {
                        x.style.display = "none";
                    }
        },
        
         
     }

}
</script>
<style>
tbody tr:nth-of-type(even) {
   background-color: rgba(2, 5, 12, 0.05);
 }

</style>