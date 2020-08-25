<template>
  <div class="hello">
    <nav class="nav-extended indigo darken-2">
      <div class="nav-content">
        <router-link :to="{ name: 'Index' }">
          <span class="nav-title">Ninja Smoothies</span>
        </router-link>
        <a href="" class="btn-floating btn-large halfway-fab pink">
          <router-link :to="{ name: 'AddSmoothie' }">
            <i class="material-icons">add</i>
          </router-link>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
 
    }
  },
  methods: {
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
