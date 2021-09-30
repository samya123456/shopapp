<template>

  <div class="container" > 
      <h1 class="p-3 text-center">View Product Details</h1>
        <v-data-table :items="ProductWiseCompanyListList"
                      :headers="headers">
        </v-data-table>
       <!-- <table class="table table-striped table-bordered center">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Product Code</th>
                    <th>Product Quantity</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(ProductWiseCompanyList, index) in ProductWiseCompanyListList" :key="index"  @click="rowClick(ProductWiseCompanyList)">
                    <td >{{ProductWiseCompanyList.product.productName}}</td>
                    <td>{{ProductWiseCompanyList.product.productCode}}</td>
                    <td>{{ProductWiseCompanyList.totalQuantity}}</td>
                </tr>
                <div id = "productCompanyTableId" style="display:none">
         <table class="table table-striped table-bordered center">
            <thead>
                <tr>
                    <th>Company Name</th>
                    <th>Company Code</th>
                    <th>Company Quantity</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(Obj, index) in ProductWiseCompanyListForCompanyTable.productCompanyList" :key="index"  @click="rowClick(ProductWiseCompanyList)">
                    <td >{{Obj.company.code}}</td>
                    <td>{{Obj.company.name}}</td>
                    <td>{{Obj.productcompanyQuantity}}</td>
                </tr>
            </tbody>
        </table>
</div>
            </tbody>
        </table> -->

    </div>      
</template>
<style>
table, th,td{
  border: 1px solid black;
}
td {
  text-align: center;
  
}
tr:hover {background-color: rgba(135, 235, 135, 0.438);}


table {
  width: 80%;
}
table.center {
  margin-left: auto; 
  margin-right: auto;
}
</style>

<script >
import DataTable from 'v-data-table'
import Vue from 'vue'
Vue.use(DataTable)
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
            selected:{},
            ProductCompanys:[],
            ProductWiseCompanyListList:[],
            ProductWiseCompanyListForCompanyTable:[],
            headers: [
                        { text: "Title", align: "start", sortable: false, value: "title" },
                        { text: "Description", value: "description", sortable: false },
                        { text: "Status", value: "status", sortable: false },
                        { text: "Actions", value: "actions", sortable: false },
                    ],
            
        }

    },
     
    methods : {
        rowClick(event){
            this.ProductWiseCompanyListForCompanyTable =event
            if( document.getElementById('productCompanyTableId').style.display=='none'){
                document.getElementById('productCompanyTableId').style.display = 'block';
            }
            
        },
  
        
        
    }

}
</script>

