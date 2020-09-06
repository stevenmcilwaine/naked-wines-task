<template>
  <div class="wines__filters">
    <button 
      v-for="filter in possibleFilters"
      :key="`button-${filter}`"
    >
      {{ filter | titleCase }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    possibleFilters: Array
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