<template>
  <div class="wines__list">
    <Filters
      :possibleFilters="possibleFilters"
    />

    <Item
      class="wines__item"
      v-for="wine in fullJSON"
      :key="`${wine.winemaker} - ${wine.name}`"
      :wine="wine"
    />
  </div>
</template>

<script>
import Filters from './Filters';
import Item from './Item';

export default {
  components: {
    Filters,
    Item
  },
  data() {
    return {
      fullJSON: [],
      possibleFilters: [],
      activeFilters: []
    }
  },
  methods: {
    /**
     * Ajax request function
     * pathToFile (string) - Relative path to file
     * attributeToSet (string) - Data attribute to set 
     */
    ajaxRequest: function (pathToFile, attributeToSet) {
      let toRet = '';
      const xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
      xobj.open('GET', pathToFile, true);
      xobj.onreadystatechange = () => {
            if (xobj.readyState == 4 && xobj.status == "200") {
              this[attributeToSet] = JSON.parse(xobj.responseText)['wines'];
            }
      };
      xobj.send(null); 
    }
  },
  watch: {
    fullJSON: function() {
      // Populate possible filters
      if (this.fullJSON.length > 0) {
        [...this.fullJSON].forEach(wine => {
          if (!this.possibleFilters.includes(wine.colour)) {
            this.possibleFilters.push(wine.colour);
          }
        });
      }
    }
  },
  mounted() {
    // Ajax request for wines - taken from JSON and extract 'wines' array from it
    this.ajaxRequest('./dist/data/wines.json', 'fullJSON');
  }
}
</script>