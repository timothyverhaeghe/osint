<template>
  <div id="app">

    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 bg-white border-bottom shadow-sm">
      <h5 class="my-0 mr-md-auto font-weight-normal">OSINT Tools</h5>
      <nav class="my-2 my-md-0 mr-md-3">
        <a class="p-2 text-dark" href="#">Instagram</a>
        <a class="p-2 text-dark" href="#">Contact</a>
      </nav>
    </div>



    <router-view class="body"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    // Function used to pretty print the moment this app is rendered
  },
  async mounted(){

  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.logo{
  width:30px;
}
</style>
