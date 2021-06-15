<template>
  <div id="app">
    <router-view/>
  </div>
</template>

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

/* Handle on hover */
::-webkit-scrollbar-thumb:hover
  background: #555

</style>