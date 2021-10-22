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
                cols="6"
                sm="6"
                md="2">
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
                            v-bind="PurchaseProductList[index].ProductCompany.product"
                            @change="onChangeProductCode(index);setValueBeforeSubmit(index)"
                            outlined
                            cache-items
                            @input="produceProductCode(index)"
                            return-object>
                        </v-autocomplete>

                    </validation-provider>  
            </v-col>
             <v-col
                cols="6"
                sm="6"
                md="2">


                <validation-provider
                    v-slot="{ errors }"
                    name="Product Company Code"
                    rules="required"> 

                    <v-autocomplete v-model="PurchaseProductList[index].ProductCompany"
                        :items="ProductWiseCompanyList[index]"
                        label="Product Company Code"
                        item-text="company.code"
                        item-value="company.code"
                        :value="PurchaseProductList[index].ProductCompany.company"
                        @change="onChangeCompanyCode(index) ;setValueBeforeSubmit(index)"
                        :error-messages="errors"
                        outlined
                        required
                        cache-items
                        @input="produceCompanyCode(index)"
                        return-object>
                    </v-autocomplete>

                 </validation-provider>   
            </v-col>


            <v-col
                cols="6"
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
                        @change="setValueBeforeSubmit(index)"
                        required>
                    </v-text-field>
          
                </validation-provider> 

       
            </v-col>

            <v-col
                cols="6"
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
                         @change="setValueBeforeSubmit(index)">
                    </v-text-field>
          
                </validation-provider> 
            </v-col>     
            <v-col
                cols="6"
                sm="6"
                md="2">

                 <validation-provider
                  v-slot="{ errors }"
                  name="Branch"
                  rules="required"> 
         <v-autocomplete v-model="PurchaseProductList[index].selectedBranch"
            :items="branches"
             label="Branch"
            :error-messages="errors"
            required
            item-text="branchCode"
            item-value="branchCode"
            outlined
            @click.stop
            auto-select-first
            return-object>
        </v-autocomplete> 
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


    <div style="display:none" id="nextButtondivId">
        <br/>
        <br/>  
   <v-row>
           <v-col></v-col>
           <v-col></v-col>
           
           <v-col>
                    <v-btn 
                                    :to="{
                                        name: 'orderDetails',
                                        params: { data :{
                                          PurchaseProductList:  PurchaseProductList,
                                          totalAmount:totalAmount }
                                        },
                                       
                                    }"
                                        color="primary"
                                        elevation="12"
                                        class="text-right"
                                        large
                                        small
                                        x-large
                                        x-small
                                    >Next</v-btn>     
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
   watcher:{
       sync:true
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
                saleingPrice:'',
                addedQuantitytotalAmount:0,
                selectedBranch:{},
            },
            ProductWiseCompanyList:[],
            branches:[],
           
            
            addedQuantity:'',
            totalAmount:0,
            enableDetailsPageEditButton:false
        }
     },
   
     mounted(){
                  
                 // this.init()
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

          if(this.enableDetailsPageEditButton){

            
                  
               if (typeof this.$router !== 'undefined' 
                    &&  typeof this.$router.currentRoute !== 'undefined'
                    &&  typeof this.$router.currentRoute.params.data !== 'undefined' 
                    &&  this.$router.currentRoute.params.data.PurchaseProductList.length>0
                    &&  this.$router.currentRoute.params.data.fromDetailsPage==true)
                {
                
                 

                 for(let i=0;i<this.$router.currentRoute.params.data.PurchaseProductList.length;i++){
                      let PurchaseProduct = new Object({
                
                            ProductCompany : {
                                productcompanyQuantity:'',
                                productSaleMinPrice:'',
                                productSaleMaxPrice:''
                            },
                            addedQuantity:'',
                            saleingPrice:'',
                            addedQuantitytotalAmount:0
                        });
                        PurchaseProduct = this.$router.currentRoute.params.data.PurchaseProductList[i];
                        
                        this.PurchaseProductList.push(PurchaseProduct)
                        this.onChangeProductCode(i)
                       
                    
                 }

                 
                } 
            }   

             
              
              
        
                  
                    
          
     },
         
        
            


     
     
   
      
    
     
     methods : {
         produceCompanyCode(i){
             this.PurchaseProductList[i].ProductCompany.company.code =this.$router.currentRoute.params.data.PurchaseProductList[i].ProductCompany.company.code
                
         },
         produceProductCode(i){
            this.PurchaseProductList[i].ProductCompany.product.productCode = this.$router.currentRoute.params.data.PurchaseProductList[i].ProductCompany.product.productCode
            
         },
            setValueBeforeSubmit(index) {
              if(this.PurchaseProductList[index].ProductCompany.product.productCode!=''
                && this.PurchaseProductList[index].ProductCompany.company.code !=''
                && this.PurchaseProductList[index].addedQuantity !=''
                && this.PurchaseProductList[index].saleingPrice !=''){
                   this.calcutateTotalAmount()
                   this.calculateQuantity(index)
                   this.setModeOfOpertionStatus(index)
                }
                   
        
      
    },
    calculateQuantity(index){
        this.PurchaseProductList[index].ProductCompany.productcompanyQuantity = parseInt(this.PurchaseProductList[index].ProductCompany.productcompanyQuantity)
         - parseInt( this.PurchaseProductList[index].addedQuantity);
         this.PurchaseProductList[index].ProductCompany.addedQuantity =  parseInt(this.PurchaseProductList[index].addedQuantity)

    },
    setModeOfOpertionStatus(index){
        this.PurchaseProductList[index].ProductCompany.modeOfOpertion = "PRODUCT_PURCHASED_MINUS"

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
                addedQuantity:'',
                saleingPrice:'',
                addedQuantitytotalAmount:0
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
                                this.PurchaseProductList[i].addedQuantitytotalAmount = parseInt ( this.PurchaseProductList[i].addedQuantity)* parseInt( this.PurchaseProductList[i].saleingPrice)
                                this.totalAmount =  parseInt(this.totalAmount) + parseInt ( this.PurchaseProductList[i].addedQuantitytotalAmount)
                            }
                       
                    }
                    var p = document.getElementById("totalAmountdivId");
                    var q = document.getElementById("nextButtondivId");
                        if(this.PurchaseProductList.length>0 
                            &&!Number.isNaN( this.totalAmount) 
                            && this.totalAmount>0)
                                {   
                                    
                                    if (p.style.display === "none") {
                                        p.style.display = "block"
                                    } 
                                    if (q.style.display === "none") {
                                        q.style.display = "block"
                                    } 
                                    
                                }else{
                                    
                                         p.style.display = "none"
                                         q.style.display = "none"
                                    

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
                           this.ProductWiseCompanyList[index]=response.data;
                            })
                        .catch(error => {
                            this.errorMessage = error.message;
                            console.log("There was an error!", error);
                            });
                             console.warn( this.ProductWiseCompanyList)
                             this.PurchaseProductList[index].selectedBranch =this.branches[0]
            }, 
           
            onChangeCompanyCode(index){
                    this.showTooltip(index);
            },
        
            showTooltip(index){
                    var x = document.getElementById(index);
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