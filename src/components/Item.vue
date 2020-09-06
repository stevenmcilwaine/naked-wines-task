<template>
  <div class="wine__wrapper">
    <img 
      :src="getImage(wine)"
      :alt="`${wine.winemaker} ${wine.name} ${wine.year}`"
    />
  </div>
</template>

<script>
export default {
  props: {
    wine: Object
  },
  methods: {
    getImage: function(entry) {
      const maker = this.kebabCase(entry.winemaker);
      const name = this.kebabCase(entry.name);
      const year = this.kebabCase(entry.year);
      return `./dist/img/${maker}-${name}-${year}.jpg`;
    },
    kebabCase: function(val) {
      return val.toString().replace(/ /g, '-').replace(/[\'\.]/g, '').toLowerCase();
    }
  }
}
</script>

<style>

</style>