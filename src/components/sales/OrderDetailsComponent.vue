<template>
    <v-app>

        <div class="container"> 
            <v-card-title>
            Order details
            </v-card-title>
             <v-card-title>
                <v-text-field
                v-model="search"
                label="Search"
                hide-details
                ></v-text-field>
      </v-card-title>
           <v-data-table :items="PurchaseProductList"
                               :headers="orderHeader"
                               :hide-default-footer="true"
                               :dense="true"
                               :search="search"
                               :calculate-widths="true">

                 </v-data-table>

                  <div  id="totalAmountdivId">
                            <br/>
                            <br/>
                            <br/>
                            <br/>
        
                                <v-row>
                                        <v-col></v-col>
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
           <v-col></v-col>
           <v-col></v-col>
           <v-col>

             
                        <div style="display:none">
                                 <v-btn 
                                    :to="{
                                        name: 'createOrder',
                                        params: { data :{
                                          PurchaseProductList:  this.PurchaseProductList,
                                          fromDetailsPage:true }
                                        },
                                       
                                    }"
                                        color="primary"
                                        elevation="12"
                                        class="text-right"
                                        large
                                        small
                                        x-large
                                        x-small
                                       
                                    >Edit</v-btn>
                        </div>

                                
</v-col> <v-col>
           
          
                    <v-btn    @click="doConfirm"
                                color="primary"
                                elevation="5"
                                class="text-right"
                                large
                                small
                                x-large
                                x-small
                                >
                            Confirm
                    </v-btn>         
           </v-col>
    </v-row>
               
    </div>


                               
            


        </div>      

    </v-app> 
</template>
<script>
export default {
    name:"OrderDetailsComponent",
    mounted(){
           this.PurchaseProductList = this.$route.params.data.PurchaseProductList;
           this.totalAmount = this.$route.params.data.totalAmount

     },
      computed: {
          orderHeader(){
                return [
                    {text: 'Product Code', value: 'ProductCompany.product.productCode'},
                    {text: 'Company Code', value: 'ProductCompany.company.code'},
                    {text: 'Quantity', value: 'addedQuantity'},
                    {text: 'Saleing Price', value: 'saleingPrice'},
                    {text: 'Total Price', value: 'addedQuantitytotalAmount'},
                ]
            },
      },
     data(){
        return {
            PurchaseProductList:[],
            totalAmount:'',
            search: '',
           
        }
     },
     methods : {
        
         doConfirm(){
             alert('Hi')

         }
     }

}
</script>
<style>

</style>