<template>
  <div class="wine__wrapper">
    <img 
      class="wine__image"
      :src="getImage(wine)"
      :alt="`${wine.winemaker} ${wine.name} ${wine.year}`"
    />
    <h3 class="wine__maker">{{ wine.winemaker | titleCase }}</h3>
    <h4 class="wine__name">{{ wine.name | titleCase }}</h4>
    <h5 class="wine__year">{{ wine.year }}</h5>
    <p class="wine__price">£{{ wine.price }}</p>
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

<style lang="scss">
  .wine__image {
    max-width: 200px;
  }
</style>