<template>
  <div>
    <h1>
      {{name}}
    </h1>
  </div>
</template>

<script>
  import Vue from "vue";

  export default Vue.extend({
    data: function() {
      return {
        name: 'Hello World!',
      }
    },
  });
</script>


