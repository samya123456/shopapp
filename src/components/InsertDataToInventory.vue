<template v-if="posts">
  <div> 
      <h1> DataInsert </h1>
      <form @submit="postData" method ="post">
          <label for="productName">Product Name:</label>
          <input type="text" name ="productName" v-model="posts.productName" ><br/><br/>
          <label for="productCode">Product Code:</label>
          <input type="text" name ="productCode" v-model="posts.productCode" ><br/><br/>
          <label for="productCompanyId">Product Code Id:</label>
          <input type="text" name ="productCompanyId" v-model="posts.productCompanyId" ><br/><br/>
           <input type="hidden" name ="productId" v-model="posts.productId" >
          <button type="submit"> Post </button>
      </form>    

  </div>   
</template>

<script>

export default {
    name:"InsertDataToInventory",
    data(){
        return {
            posts :{
                productId:1,
                productName:null,
                productCode :null
                

            }
        }

    },
    methods : {
        postData(e){
            this.axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
               e.preventDefault();
            this.axios.post("http://localhost:9000/Inventory/insert",
            this.posts,{
                 mode: 'cors',
                  credentials: 'include'
            })
            .then((response)=>{
                    console.warn(response)
            })
            .catch(error => {
            this.errorMessage = error.message;
            console.log("There was an error!", error);
            });
         
        }
    }

}
</script>

