<template>
  <div class="wines__filters">
    <div class="wines__filters-colour">
      <span class="wines__filters-colour-label">Colour:</span>
      <button 
        class="wines__filters-button"
        v-for="filter in possibleColourFilters"
        :key="`button-${filter}`"
      >
        {{ filter | titleCase }}
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
    titleCase: function (val) {
      return val.replace(/\w\S*/g, (val) => {
          return val.charAt(0).toUpperCase() + val.substr(1).toLowerCase();
        }
      );
    }
  }
}
</script>

<style>

</style>