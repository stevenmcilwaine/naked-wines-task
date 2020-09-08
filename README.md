# naked-wines-task

### Project setup
To build and update, clone the Git repo to your machine, go to the root folder in a terminal window and run `npm i` to install the necessary node packages. Once done, using `npm run build` will build the files and watch for changes on saving, and `npm run prod` will create minified, production versions of the files.
_Note: when looking at the page locally, there may be a cross-origin error depending on how you have your browser set up. You may require a virtual server to serve it._

### Live version
There is a version of the page hosted on my website as a standalone page, available [here](http://stevenmcilwaine.com/naked-wines-task/). This uses the production build of the page, with minified code and the locked-down version of Vue.

### Tech used
- HTML5
- Webpack
- Sass
- Vue
- Vanilla ES6 JavaScript

### Write-up
On starting the task, I went to the Naked Wines homepage and put together a JSON data file of a selection of wines in one of the Owl Carousels (using things like winemaker, name, wine colour and year). I also got hold of the related images for them and ran them through an image compression site (TinyPNG) to get the most optimised versions possible for the build.

When that was done, I set up Webpack to deal with the files. The images all get copied over to a dist/img folder, along with any SVGs. All of the JavaScript gets compiled into a single document (as it’s only a single-page site, the savings from using separate cacheable files are negligible) and minified. The same happens with the Sass files, being compiled into a single CSS file. The JSON file is copied into dist/data.

The next step was to get some rough Vue components made up, get them hooked together and get it showing on the page in some form. Once it worked as I expected, I made up an AJAX request to get the data and got it to work inside the Vue instance.

When the JSON was successfully being brought in, I started breaking the Vue files down into smaller components for easier upkeep. This is where the first of my problems came about - once I moved bits around and streamlined components, there were props that needed to be passed down to child components (e.g. the list of wines to the Grid Item component to populate using v-for). I solved this by commenting out erroneous code and slowly bringing back parts of it as props to pass down.

Once these issues were solved, I moved on to getting the header elements into the page. To keep things simple, I created a simple version of the Naked Wines header on the main site, adding a couple of links in just to make it look more like a site rather than just a strange interactive page.

I included a small sub-header section, similar to the main site, so that there was an example of vanilla ES6 JavaScript around that wasn’t all just in Vue. The countdown timer is very rough - it should (_hopefully_) countdown to the next instance of 5pm, whilst also bypassing Sundays (skipping to Monday’s 5pm). I haven’t had much time to test it, so fingers crossed it’s close.

Once that was in, I focused on getting the wine colour filters to work. They are set up so that when none are selected, all wines show, and if any are selected in particular only the relevant wines show. This also resets when all filters are deactivated. I did run into a problem with emitting an event up to the main Vue parent component, but I realised it was down to a typo (_this.£emit_ - luckily a quick fix… that’ll teach me for coding whilst uncaffeinated). 

Once the functionality was done, I then went onto styling the Vue parts. Usually in a bigger project, I would look to keep the styles in the Vue page alongside the actual templating, but as this was a single-page one-hit task I kept all the styling in the Sass files separately. 

When the bulk of it was styled, I then went through and finished the styling and animations. The only real problem I ran into was due to how I had the wine images set up, which made the grayscale filtering affect other parts of the component too, which was fixed by a quick rework to how the images were put in.

All of the animations were done using CSS, through @keyframes and general hover events. There’s nothing too fancy going on, as I didn’t want to over-complicate it, especially with fancy JS-led animations or Lottie/Bodymovin inclusions.
