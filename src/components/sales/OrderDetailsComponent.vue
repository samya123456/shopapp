<template>
    <v-app>
        <div class="container"> 
            <v-card-title>
            Order details
            </v-card-title>
           <p>{{PurchaseProductListData.PurchaseProductList[0].addedQuantity}}</p>
            


        </div>      

    </v-app> 
</template>
<script>
export default {
    name:"OrderDetailsComponent",
    mounted(){
         this.PurchaseProductListData = this.$route.params.data;
            console.warn("data is", this.PurchaseProductListData);

     },
     data(){
        return {
            PurchaseProductListData:[]
        }
     }

}
</script>
<style>

</style>