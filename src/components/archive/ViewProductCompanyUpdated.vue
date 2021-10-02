<template>

  <div  > 
      <h1 class="p-3 text-center">View Product Details</h1>

        <table class="table table-striped table-bordered center">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Product Code</th>
                    <th>Product Quantity</th>
                </tr>
            </thead>
           
            <tbody>
                 
                <tr v-for="(ProductWiseCompanyList, index) in ProductWiseCompanyListList" :key="index"   @click="rowClick(ProductWiseCompanyList)">
                    <td >
                         <div>{{ProductWiseCompanyList.product.productName}}</div></td>
                    <td>
                        <div>{{ProductWiseCompanyList.product.productCode}}</div></td>
                    <td ><div>{{ProductWiseCompanyList.totalQuantity}}
                        </div></td>
                </tr>
                </tbody>
                <div v-if="shown" align="center" id = "productCompanyTableId" >
         <table class="table table-striped table-bordered center">
            <thead>
                <tr>
                    <th>Company Name</th>
                    <th>Company Code</th>
                    <th>Company Quantity</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(Obj, index) in ProductWiseCompanyListForCompanyTable.productCompanyList" :key="index" >
                    <td >{{Obj.company.code}}</td>
                    <td>{{Obj.company.name}}</td>
                    <td>{{Obj.productcompanyQuantity}}   
                        
                    </td>
                </tr>
            </tbody>
        </table>
</div>

            
              
        </table>
        

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

.slide-leave-active,
.slide-enter-active {
  transition: 1s;
}
.slide-enter {
  transform: translate(0, 100%);
}
.slide-leave-to {
  transform: translate(0, -100%);
}
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
            shown:false
            
        }

    },
    methods : {
        rowClick(event){
            this.ProductWiseCompanyListForCompanyTable =event
            
            this.shown =!this.shown

            

    
    
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
   

    /* Toggle between hiding and showing the active panel */
   
  


            
        },
  
        
        
    }

}
</script>

