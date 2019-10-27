<template>
  <div v-on:click="cycleDirection">
  <i class="fas" :class="sortIcon" ></i>{{ sortIndicator.repeat(order) }}
  </div>
</template>

<script>

export default {
  props: ['direction','column','order'],
  data() {
    return {
      sortDir: this.direction,
      sortIndicator: "*"

    }
  },
  methods: {
    cycleDirection() {
      
      if(this.sortDir == 0 ){
        this.sortDir = 1
      } else if (this.sortDir < 0){
        this.sortDir = 0
      } else if (this.sortDir > 0){
        this.sortDir = -1
      }
      this.$emit('update',this.column,this.sortDir)
      
    }
  },
  computed: {
    sortIcon() {
      return {
        'fa-sort-up': this.direction == 1, 
        'fa-sort': this.direction == 0,
        'fa-sort-down': this.direction == -1
      }

    }
  }
  
}

</script>