<template>
  <div class="wine" :class="`wine--${wine.colour}`" role="presentation">
    <div 
      class="wine__image-wrapper"
    >
      <div class="wine__image" :style="`background-image:url(${getImage(wine)})`"></div>
      <div class="wine__image-overlay" role="presentation"></div>
      <div class="wine__colour-dot" :class="`wine__colour-dot--${wine.colour}`" role="presentation"></div>
      <span class="wine__colour-dot-text">{{ wine.colour | titleCase }}</span>
      <i class="fas fa-wine-glass-alt wine__colour-dot-glass"></i>
    </div>

    <div class="wine__text">
      <h3 class="wine__maker">{{ wine.winemaker | titleCase }}</h3>
      <h4 class="wine__name">{{ wine.name | titleCase }} ({{ wine.year }})</h4>
      <p class="wine__price">£{{ wine.price }}</p>
    </div>
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