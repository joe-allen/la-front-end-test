## Project Details:
  - **Framework**: VueJS
  - **CSS**: SCSS
  - **Icons**: FontAwesome
  - **Sorting Mechanic**: Clicking the "Programs" link in table head will ASC/DESC sort programs by name [Line: 173 in Card.vue](https://github.com/joe-allen/league-apps-front-end-test/blob/master/client/src/components/Card.vue#L173)
  - **Filtering Mechanic**: Clicking the search icon allows users to filter by user input [Line: 131 in Card.vue](https://github.com/joe-allen/league-apps-front-end-test/blob/master/client/src/components/Card.vue#L131)

---

## Project Notes:
  - When developing locally I had an issue with CORS `access-control-allow-origin` so I created a couple [Lambda functions](https://github.com/joe-allen/league-apps-front-end-test/blob/master/api/handler.js) to call the Public API.
