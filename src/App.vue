<template>
<div id ="app">
  <h1>Submit Form Data to API </h1>

  <InsertDataToInventory />
  </div> 
</template>

<script>

import InsertDataToInventory from "./components/InsertDataToInventory"
export default {
  name: 'App',
  components: {
    InsertDataToInventory
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
