<template>
  <div class="wines__filters">
    <div class="wines__filters-colour">
      <span class="wines__filters-colour-label">Colour:</span>
      <button 
        class="wines__filters-button"
        :class="`button--${filter}`"
        v-for="filter in possibleColourFilters"
        :key="`button-${filter}`"
        @click="handleColourButtonClick(filter, $event)"
      >
        <i class="fas fa-wine-glass-alt wines__filters-button-glass"></i>
        {{ filter | titleCase }}
        <i class="fas fa-times wines__filters-button-cross"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    possibleColourFilters: Array
  },
  filters: {
    titleCase: function(val) {
      return val.replace(/\w\S*/g, (val) => {
          return val.charAt(0).toUpperCase() + val.substr(1).toLowerCase();
        }
      );
    }
  },
  methods: {
    handleColourButtonClick: function(filter, event) {
      event.currentTarget.classList.toggle('active');
      this.$emit('colourFilterClicked', filter);
    }
  }
}
</script>

<style>

</style>