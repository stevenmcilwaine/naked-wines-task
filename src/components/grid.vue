<template>
  <div class="wines__list">
    <div
      class="wines__item"
      v-for="wine in fullJSON"
      :key="`${wine.winemaker}-${wine.name}`"
    >
      <h5>{{wine.winemaker}}</h5>
    </div>

    <button 
      v-for="filter in possibleFilters"
      :key="`button-${filter}`"
    >
      {{ `${filter} wine` | titleCase }}
    </button>
  </div>
</template>

<script>
export default {
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
  filters: {
    titleCase: function (val) {
      return val.replace(/\w\S*/g, (val) => {
          return val.charAt(0).toUpperCase() + val.substr(1).toLowerCase();
        }
      );
    }
  },
  mounted() {
    // Ajax request for wines - taken from JSON and extract 'wines' array from it
    this.ajaxRequest('./dist/data/wines.json', 'fullJSON');
  }
}
</script>