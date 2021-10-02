<template>
<v-app>
  <v-card>
     <v-card-title>
        <v-text-field
          v-model="search"
          label="Search"
          hide-details
        ></v-text-field>
      </v-card-title>
  <div class="container" > 
      <h1 class="p-3 text-center">View Product Details</h1>
    <v-data-table :items="ProductWiseCompanyListList"
                  :headers="productHeader"
                  :expanded.sync="expanded"
                    show-expand
                    single-expand
                    item-key="product.productCode"
                    @item-expanded="rowClick"
                    :search="search"
                   >
                   <template v-slot:expanded-item="{headers,item}">
                      <td :colspan="headers.length">
                 <v-data-table :items="item.productCompanyList"
                               :headers="companyHeader"
                               :hide-default-footer="true"
                               :dense="true"
                               :calculate-widths="true"
                              >
                 </v-data-table>
                   </td> 
                   </template>
    </v-data-table>

     

   
         

       
</div>

            
              
      
        
 </v-card>
     </v-app>
</template>
<style>

</style>

<script>
export default {
    name:"ViewProductCompany",
    mounted(){
        this.axios.get("http://localhost:9000/Inventory/getAllProductsCompanyWise")
        .then((response) =>{
            this.ProductWiseCompanyListList = response.data;
            console.warn(this.ProductWiseCompanyListList)
            
        })
        .catch(error => {
            this.errorMessage = error.message;
            console.log("There was an error!", error);
            });

                  
        
    },

    computed: {
    productHeader(){
      return [
        {text: 'Product Name', value: 'product.productName'},
        {text: 'Product Code', value: 'product.productCode'},
        {text: 'Product Quantity', value: 'totalQuantity'},
      ]
    },
    companyHeader(){
      return [
        {text: 'Company Name', value: 'company.name'},
        {text: 'Company Code', value: 'company.code'},
        {text: 'Quantity', value: 'productcompanyQuantity'},
      ]
    },
    
  },
    data(){
        return {
            Product:{
                    productId:0,
                    productName:null,
                    productCode :null,
                   

                },
                 Company :{
                    id:0,
                    code:null,
                    name:null
                },
            productCompany :{
                Product:null,
                Company:null,
                productcompanyQuantity:0
               
                

            },
           
            ProductCompanys:[],
            ProductWiseCompanyListList:[],
            ProductWiseCompanyListForCompanyTable:[],
            shown:false,
            searchQuery: '',
             search: '',
                selected:{},
                expanded: [],
               
                        
        }                   

    },
    methods : {
        rowClick: function ( row) {      
            this.ProductWiseCompanyListForCompanyTable =row 
            console.warn(this.selected)
            this.shown =!this.shown
    },        
    }

}
</script>

