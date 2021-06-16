<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  created() {
    // Lee el listado de empleados de localstorge
    this.$store.dispatch('UpdateEmployees')
  }
}
</script>

<style lang="sass">
*
  margin: 0
  padding: 0
  box-sizing: border-box

.flex-center-center
  display: flex
  align-items: center
  justify-content: center

.flex-center-space-between
  display: flex
  align-items: center
  justify-content: space-between

.flex-center
  display: flex
  align-items: center

/* width */
::-webkit-scrollbar
  width: 6px
  height: 6px

/* Track */
::-webkit-scrollbar-track
  background: #f1f1f1

/* Handle */
::-webkit-scrollbar-thumb
  background: #888
  border-radius: 5px

/* Handle on hover */
::-webkit-scrollbar-thumb:hover
  background: #555

</style>