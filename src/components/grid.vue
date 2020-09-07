<template>
  <div class="wines__list">
    <Filters
      :possibleColourFilters="possibleColourFilters"
      @colourFilterClicked="colourFilterClicked"
    />

    <Item
      class="wines__item"
      v-for="wine in fullJSON"
      v-show="activeFilters.includes(wine.colour)"
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
      possibleColourFilters: [],
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
    },
    colourFilterClicked: function(filter) {
      // If all filters set from standard, unlink possible filters
      if (this.activeFilters === this.possibleColourFilters) {
        this.activeFilters = [];
      }

      // Remove or add to array as required
      if (this.activeFilters.includes(filter)) {
        this.activeFilters.splice(this.activeFilters.indexOf(filter), 1);
        if (this.activeFilters.length === 0) {
          this.activeFilters = this.possibleColourFilters;
        }
      } else {
        this.activeFilters.push(filter);
      }
    }
  },
  watch: {
    fullJSON: function() {
      // Populate possible filters
      if (this.fullJSON.length > 0) {
        [...this.fullJSON].forEach(wine => {
          if (!this.possibleColourFilters.includes(wine.colour)) {
            this.possibleColourFilters.push(wine.colour);
          }
        });
      }
      // Copy over to active by default to show all
      this.activeFilters = this.possibleColourFilters;
    }
  },
  mounted() {
    // Ajax request for wines - taken from JSON and extract 'wines' array from it
    this.ajaxRequest('./dist/data/wines.json', 'fullJSON');
  }
}
</script>