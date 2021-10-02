<template>



  <div class="container"> 
      <h1 class="p-3 text-center">View Product Details</h1>
 
      <Dropdown 
            :options=this.options
            v-on:selected="validateSelection($event)"
            :disabled="false"
            name="zipcode"
            :maxItem="10"
            placeholder="Please select an option"
            style="display:inline-block" >
    </Dropdown>
 
  <div  id ='displayTableId' class="container" style="display:none">
        <table class="table table-striped table-bordered center">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Product Code</th>
                    <th>Product Quantity</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{product.productName}}</td>
                    <td>{{product.productCode}}</td>
                    <td>{{product.productQuantity}}</td>
                </tr>
            </tbody>
        </table>
  </div>
    </div>      
</template>
<style>
table, th,td{
  border: 1px solid black;
}
td {
  text-align: center;
  
}
Dropdown.center{
   margin-left: auto; 
  margin-right: auto; 
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
    name:"ViewProductsQuickSearch",
    mounted(){
        this.axios.get("http://localhost:9000/Inventory/getAllProducts")
        .then((response) =>{
            this.products = response.data;
            var i = 0;
            for ( i = 0; i <  this.products.length ; i++){
              this.options.push({
                id:   i,
                name:  this.products[i].productCode
            });
           }
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
            products:[],
            options: []
        }

    },
    methods : {
        validateSelection(event){
            if (typeof event !== 'undefined' && typeof this.products[event.id] !== 'undefined'){
                this.product = this.products[event.id]
                var x = document.getElementById("displayTableId");
                    if (x.style.display === "none") {
                        x.style.display = "block";
                    } else {
                        x.style.display = "none";
                    }
            }
           
        }
        
    }

}
</script>

