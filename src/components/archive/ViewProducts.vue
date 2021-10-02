<template>
<v-app>
  <div  id ="app"  v-bind:style="{ backgroundColor: '#E5ECFA'}" > 
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
                <tr v-for="(product, index) in products" :key="index">
                    <td>{{products[index].productName}}</td>
                    <td>{{products[index].productCode}}</td>
                    <td>{{products[index].productQuantity}}</td>
                </tr>
            </tbody>
        </table>
    </div>  
    </v-app>    
</template>
<style>
table, th,td{
  border: 1px solid black;
}
td {
  text-align: center;
  
}
tr:hover {background-color: skyblue;}

table {
  width: 80%;
}
table.center {
  margin-left: auto; 
  margin-right: auto;
}
</style>

<script>

export default {
    name:"ViewProducts",
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
            product :{
                productId:1,
                productName:null,
                productCode :null,
                productQuantity:0
                

            },
            selected:{},
            products:[]
        }

    },
    methods : {
        
    }

}
</script>

