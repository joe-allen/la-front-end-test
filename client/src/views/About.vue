<template>
  <div class="about">
    <h1>Project Details:</h1>
    <p><strong>Framework</strong>: VueJS</p>
    <p><strong>CSS</strong>: SCSS</p>
    <p><strong>Icons</strong>: FontAwesome</p>
    <p><strong>Sorting Mechanic</strong>: Clicking the "Programs" link in table head will ASC/DESC sort programs by name (Line: 173 in Card.vue)</p>
    <p><strong>Filtering Mechanic</strong>: Clicking the search icon allows users to filter by user input (Line: 131 in Card.vue)</p>
    <hr>
    <h2>Project Notes:</h2>
    <p>- When developing locally I had an issue with CORS `access-control-allow-origin` so I created a couple Lambda functions to call the Public API.</p>
  </div>
</template>

<style scoped>
  .about {
    margin: 15px 0;
  }
  strong {
    font-weight: 700;
  }
  h1,
  h2 {
    margin: 15px 0;
  }
  p {
    margin: 10px 0;
  }
</style>