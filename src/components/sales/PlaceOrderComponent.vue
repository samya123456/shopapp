<template>
<v-app>
    <div class="container"> 
       <v-card-title>
       Create order
       </v-card-title>

        
 <validation-observer
             ref="observer"
             v-slot="{ invalid  }"
             slim=true
             >

                    <v-btn @click="addInput"
                            color="primary"
                            fab
                            dark
                           
                            :disabled="invalid">
                            <v-icon dark>
                                mdi-plus
                            </v-icon>
                    </v-btn>


<v-container>
    <div  v-for="(input, index) in PurchaseProductList"   v-bind:key="index">
        <br/>
         <v-row>
              <v-col
                cols="50"
                sm="6"
                md="3">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Product Code"
                      rules="required"> 

                        <v-autocomplete v-model="PurchaseProductList[index].ProductCompany.product"
                            :items="products"
                            label="Product Code"
                            :error-messages="errors"
                            required
                            item-text="productCode"
                            item-value="productCode"
                            @change="onChangeProductCode(index);displayTotalAmount(index)"
                            outlined
                            return-object>
                        </v-autocomplete>

                    </validation-provider>  
            </v-col>
             <v-col
                cols="50"
                sm="6"
                md="3">


                <validation-provider
                    v-slot="{ errors }"
                    name="Product Company Code"
                    rules="required"> 

                    <v-autocomplete v-model="PurchaseProductList[index].ProductCompany"
                        :items="ProductWiseCompanyList[index]"
                        label="Product Company Code"
                        item-text="company.code"
                        item-value="company.code"
                        @change="onChangeCompanyCode(index) ;displayTotalAmount(index)"
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
                  rules="required|isSmaller:@Available Product Quantity_$index"> 

                    <v-text-field 
                        label="Quantity To Add" 
                        v-model="PurchaseProductList[index].addedQuantity"
                        :error-messages="errors"
                        outlined
                        @change="displayTotalAmount(index)"
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
                        rules="required|isGreater:@Sale min Price_$index|isSmaller:@Sale max Price_$index"> 

                    <v-text-field 
                        label="Sale Price" 
                        v-model="PurchaseProductList[index].saleingPrice"
                        :error-messages="errors"
                        outlined
                        required
                         @change="displayTotalAmount(index)">
                    </v-text-field>
          
                </validation-provider> 
            </v-col>      

        <div v-bind:id="index"  style="display:none">
           <v-col>
               <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on">
                        fas fa-info-circle
                        </v-icon>
                    </template>
                    <span>
                       
                          <v-text-field 
                                label="Available Product Quantity" 
                                v-model="PurchaseProductList[index].ProductCompany.productcompanyQuantity"
                                >
                            </v-text-field>
                        
                            <v-text-field 
                                label="Purchase Price" 
                                v-model="PurchaseProductList[index].ProductCompany.productPurchasePrice">
                            </v-text-field>
                            <v-text-field 
                                label="Sale min Price" 
                                v-model="PurchaseProductList[index].ProductCompany.productSaleMinPrice">
                            </v-text-field>
                            <v-text-field 
                                label="Sale max Price" 
                                v-model="PurchaseProductList[index].ProductCompany.productSaleMaxPrice">
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
                    dark>
                <v-icon dark>
                    mdi-minus
                </v-icon>
                </v-btn>
            
           </v-col>
           
    </v-row>

     
    
    <div style="display:none">
               <validation-provider
               name="Available Product Quantity_$index"> 
                         <v-text-field 
                                label="Available Product Quantity_$index" 
                                v-model="PurchaseProductList[index].ProductCompany.productcompanyQuantity"
                                >
                            </v-text-field>
                          </validation-provider>
                        <validation-provider
                            name="Sale min Price_$index"  > 

                           <v-text-field 
                                label="Sale min Price_$index" 
                                v-model="PurchaseProductList[index].ProductCompany.productSaleMinPrice">
                            </v-text-field>
                        </validation-provider>
                        <validation-provider
                            name="Sale max Price_$index"  > 
                             <v-text-field 
                                label="Sale max Price_$index" 
                                v-model="PurchaseProductList[index].ProductCompany.productSaleMaxPrice">
                             </v-text-field>
                        </validation-provider>
         </div>
    
    </div>
    <div style="display:none" id="totalAmountdivId">
        <br/>
        <br/>
        
       <v-row>
           <v-col></v-col>
           <v-col></v-col>
           
           <v-col> <p >
           Total amount : {{ totalAmount}}
            </p>
           </v-col>
       </v-row>
    </div>  


    <div id="nextButtondivId">
        <br/>
        <br/>  
   <v-row>
           <v-col></v-col>
           <v-col></v-col>
           
           <v-col>
                    <v-btn    @click="goToNextPage"
                                color="primary"
                                elevation="12"
                                class="text-right"
                                large
                                small
                                x-large
                                x-small
                                :disabled="invalid">
                            Next
                    </v-btn>         
           </v-col>
    </v-row>
               
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
        
          this.init()
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
            PurchaseProductList:[],
            PurchaseProduct:
                {
                ProductCompany : {
                    productcompanyQuantity:'',
                    productSaleMinPrice:'',
                    productSaleMaxPrice:''
                },
                addedQuantity:'',
                saleingPrice:''
            },
            ProductWiseCompanyList:[],
            //invalid:true,
            
            addedQuantity:'',
            totalAmount:0
        }
     },
     methods : {
            displayTotalAmount(index) {
              if(this.PurchaseProductList[index].ProductCompany.product.productCode!=''
                && this.PurchaseProductList[index].ProductCompany.company.code !=''
                && this.PurchaseProductList[index].addedQuantity !=''
                && this.PurchaseProductList[index].saleingPrice !=''){
                   // alert('hi')
                   this.calcutateTotalAmount()
                }
                   
        
      
    },
           
         init(){
           this.PurchaseProductList.push(this.PurchaseProduct)
         },
          addInput() {
          //  this.calcutateTotalAmount()
            let PurchaseProduct = new Object({
                
                ProductCompany : {
                    productcompanyQuantity:'',
                    productSaleMinPrice:'',
                    productSaleMaxPrice:''
                },
                addedQuantity:''
            });
            this.PurchaseProductList.push(PurchaseProduct)
           
            },

            calcutateTotalAmount(){
                this.totalAmount=0;
                    for (let i = 0; i < this.PurchaseProductList.length; i++){
                        if(this.PurchaseProductList[i].ProductCompany.product.productCode!=''
                            && this.PurchaseProductList[i].ProductCompany.company.code !=''
                            && this.PurchaseProductList[i].addedQuantity !=''
                            && this.PurchaseProductList[i].saleingPrice !=''
                            && !Number.isNaN(parseInt(this.PurchaseProductList[i].addedQuantity))
                            && !Number.isNaN( parseInt(this.PurchaseProductList[i].saleingPrice)))
                            {
                                this.totalAmount =  parseInt(this.totalAmount) + parseInt ( this.PurchaseProductList[i].addedQuantity)* parseInt( this.PurchaseProductList[i].saleingPrice)
                            }
                       
                    }
                    var x = document.getElementById("totalAmountdivId");
                    if(this.PurchaseProductList.length>0 
                        &&!Number.isNaN( this.totalAmount) 
                        && this.totalAmount>0){
                            
                                if (x.style.display === "none") {
                                   x.style.display = "block"
                                } 
                    }else{
                                    x.style.display = "none";

                    }
            },
           
            deleteRow(index) {
                    this.PurchaseProductList.splice(index,1)
                    this.calcutateTotalAmount()
                    
            } ,
            onChangeProductCode(index){
                    this.product = this.PurchaseProductList[index].ProductCompany.product
                    this.axios.post("http://localhost:9000/Inventory/allComapanyOfProduct",this.product)
                        .then((response) =>{
                        this.ProductWiseCompanyList[index] = response.data;
                            })
                        .catch(error => {
                            this.errorMessage = error.message;
                            console.log("There was an error!", error);
                            });
            }, 
            onChangeCompanyCode(index){
                    this.showTooltip(index);
            },
        
            showTooltip(index){
                    var x = document.getElementById(index);
                        if (x.style.display === "none") {
                            x.style.display = "block";
                        } 

            },goToNextPage(){
                let data = {
                    PurchaseProductList: this.PurchaseProductList,
                    description: "pass data through params"
                   };
                this.$router.push(
                    {path:'/orderDetails',
                     name: "dataList",
                     params: {data}
                     }); 
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