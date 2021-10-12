<template>
<v-app>
    <div class="container"> 
       <v-card-title>
       Create order
       </v-card-title>

        
 <validation-observer
            ref="observer"
             v-slot="{ invalid }"
           
        >
<v-btn @click="addInput"
     color="primary"
      fab
      dark
       :disabled="invalid"
     >
     <v-icon dark>
        mdi-plus
      </v-icon>
</v-btn>


<v-container >
    <div  v-for="(input, index) in PurchaseProductList " v-bind:key="index">
        <br/>
         <v-row>
              <v-col
                cols="50"
                sm="6"
                md="3">
         <validation-provider
                v-slot="{ errors }"
                name="Product Code"
                rules="required"
            > 
         <v-autocomplete v-model="selected[index]"
            :items="products"
            label="Product Code"
            :error-messages="errors"
            required
            item-text="productCode"
            item-value="productCode"
             @change="onChangeProductCode(index)"
              outlined
            return-object>
        </v-autocomplete>
        </validation-provider>  
            </v-col>
             <v-col
                cols="50"
                sm="6"
                md="2">
            <validation-provider
                v-slot="{ errors }"
                name="Product Company Code"
                rules="required"
            > 

        <v-autocomplete v-model="selectedProductWiseCompanyList[index]"
            :items="ProductWiseCompanyList"
            label="Product Company Code"
            item-text="company.code"
            item-value="company.code"
             @change="onChangeCompanyCode(index)"
             :error-messages="errors"
             outlined
            required
            return-object>
        </v-autocomplete>
           </validation-provider>   
            </v-col>

            <v-col
                cols="50"
                sm="6"
                md="2">
          <validation-provider
                v-slot="{ errors }"
                name="Product Quantity"
                rules="required|isSmaller:@Available Product Quantity"
            > 
          <v-text-field 
            label="Quantity To Add" 
            v-model="addedQuantity[index]"
            :error-messages="errors"
            outlined
            required>
          </v-text-field>
          
         </validation-provider> 

       
               </v-col>

            <v-col
                cols="25"
                sm="6"
                md="2">
          <validation-provider
                v-slot="{ errors }"
                name="Sale Price"
                rules="required|isGreater:@Sale min Price|isSmaller:@Sale max Price"
            > 
          <v-text-field 
            label="Sale Price" 
            v-model="saleingPrice[index]"
            :error-messages="errors"
            outlined
            required>
          </v-text-field>
          
         </validation-provider> 
               </v-col>      

            <div id="prodictInfotooltipId"  style="display:none">
           <v-col>
               <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        >
                        fas fa-info-circle
                        </v-icon>
                    </template>
                    <span>
                        <!--Available  : {{ProductCompany.productcompanyQuantity}}
                        <br/>
                         Purchase cost :{{ProductCompany.productPurchasePrice}}
                        <br/>
                         Sale minimum price : {{ProductCompany.productSaleMinPrice}}
                        <br/>
                         Sale maximum price : {{ProductCompany.productSaleMaxPrice}}
                         -->
                          <v-text-field 
                                label="Available Product Quantity" 
                                v-model="ProductCompany.productcompanyQuantity"
                                >
                            </v-text-field>
                        
                            <v-text-field 
                                label="Purchase Price" 
                                v-model="ProductCompany.productPurchasePrice">
                            </v-text-field>
                            <v-text-field 
                                label="Sale min Price" 
                                v-model="ProductCompany.productSaleMinPrice">
                            </v-text-field>
                            <v-text-field 
                                label="Sale max Price" 
                                v-model="ProductCompany.productSaleMaxPrice">
                       </v-text-field>
                    </span>
                </v-tooltip>
           </v-col>
            </div>

           <v-col
           cols="25"
                sm="6"
                md="1">


                <v-btn @click="deleteRow(index)"
                    color="primary"
                    fab
                    dark
                >
     <v-icon dark>
        mdi-minus
      </v-icon>
</v-btn>
            
           </v-col>
           
    </v-row>
    
    <div style="display:none">
               <validation-provider
               name="Available Product Quantity"> 
                         <v-text-field 
                                label="Available Product Quantity" 
                                v-model="ProductCompany.productcompanyQuantity"
                                >
                            </v-text-field>
                          </validation-provider>
                        <validation-provider
                            name="Sale min Price"  > 

                           <v-text-field 
                                label="Sale min Price" 
                                v-model="ProductCompany.productSaleMinPrice">
                            </v-text-field>
                        </validation-provider>
                        <validation-provider
                            name="Sale max Price"  > 
                             <v-text-field 
                                label="Sale max Price" 
                                v-model="ProductCompany.productSaleMaxPrice">
                             </v-text-field>
                        </validation-provider>
         </div>
    
    </div>
    </v-container>
</validation-observer>

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
            PurchaseProductList:[],
            ProductWiseCompanyList:[],
            selectedProductWiseCompanyList:[],
            ProductCompany:[],
            invalid:false,
            PurchaseProduct:{},
            saleingPrice:[],
            addedQuantity:[],
            selected:[]
        }
     },
     methods : {
          addInput() {
            this.$refs.observer.validate()
            this.PurchaseProductList.push(this.PurchaseProduct)
            this.inputs.push(this.inputs.length+1)
            //this.refreshData()
            },
           
            deleteRow(index) {
            this.PurchaseProductList.splice(index,1)
            this.inputs.splice(index,1)
            } ,
              onChangeProductCode(index){
            this.product = this.selected[index]
            this.PurchaseProduct.product = this.selected[index]

             this.axios.post("http://localhost:9000/Inventory/allComapanyOfProduct",this.product)
            .then((response) =>{
            this.ProductWiseCompanyList = response.data;
            
           // console.warn(this.ProductWiseCompanyList)
           
            
        })
        .catch(error => {
            this.errorMessage = error.message;
            console.log("There was an error!", error);
            });

        
        }, 
        onChangeCompanyCode(index){
           alert('Hi')
            this.ProductCompany = this.selectedProductWiseCompanyList[index]
            this.PurchaseProduct.ProductCompany = this.ProductCompany;
            this.PurchaseProduct.saleingPrice =this.saleingPrice[index];
            this.PurchaseProduct.addedQuantity =this.addedQuantity[index];
            this.showTooltip();
        },
        
        showTooltip(){

            var x = document.getElementById("prodictInfotooltipId");
                    if (x.style.display === "none") {
                        x.style.display = "block";
                    }

        }
        
         
     }

}
</script>
<style>
.group {
  display: flex;
  flex: 1;
  justify-content: space-around;
}

</style>