<template lang="pug">
  .day(:class="getColor" @click="clickDay()")

</template>

<script>
export default {
  name: 'Day',
  props: {
    value: {
      type: String,
      default: ''
    },
    day: {
      type: Object,
      default: null
    },
    canSelectDay: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clickDay() {
      // Comprobamos que se pueda quedir o quitar un día
      if ((this.day.tipoId === '' && this.canSelectDay) || (this.day.tipoId === 'V')) {
        this.value = this.value === '' ? 'V' : ''
        this.$emit('input', this.value)
      }
    }
  },
  computed: {
    getColor() {
      let color_class = 'white'

      switch (this.day.tipoId) {
        case 'F':
          color_class = 'blue'
          break
        case 'S':
          color_class = 'red'
          break
        case 'L':
          color_class = 'yellow'
          break
        case 'V':
          color_class = 'green'
          break
      }

      // Devolvemos el nombre de la clase para los estilos
      return color_class
    }
  }
}
</script>

<style lang="sass">
.day
  width: 100%
  height: 100%

.blue, .red, .yellow, .green, .white
  border: 1px solid

.blue
  border-color: #4473e2
  background-color: #4473e2
.red
  border-color: #8e3430
  background-color: #ead9d9
.yellow
  border-color: yellow
  background-color: yellow
.green
  border-color: #69ac5b
  background-color: #69ac5b
.white
  border-color: #ffffff
  background-color: #ffffff


.white, .green
  cursor: pointer
  &:hover
    background-color: #8fb8608c
</style>