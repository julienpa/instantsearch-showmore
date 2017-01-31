// instantsearch.js custom widget with vanilla js
// First, we add ourselves to the instantsearch.widgets namespace

instantsearch.widgets.hitsWithShowMore = function showMore(options) {
  if (!options || !options.container) {
    console.error('You should provide an option object with a container to the showMore widget');
    return;
  }

  var widgetContainer;
  var hitsContainer;
  var hitsPerPage = 20;
  var itemTemplate = '';
  var emptyTemplate = '';

  // container
  widgetContainer = document.querySelector(options.container);

  // templates
  if (options.templates && options.templates.item) {
    itemTemplate = options.templates.item;
    Mustache.parse(itemTemplate);
  }
  if (options.templates && options.templates.empty) {
    emptyTemplate = options.templates.empty;
    Mustache.parse(emptyTemplate);
  }

  // hitsPerPage
  if (options.hitsPerPage) {
    hitsPerPage = options.hitsPerPage;
  }

  // See more details in our documentation:
  // https://community.algolia.com/instantsearch.js/documentation/#custom-widgets
  //
  // This is the custom widget interface (just an object). You need to implement
  // at least render OR init.
  return {
    init: function (params) {
      // params = { state: {}, helper: {} }

      params.helper.setQueryParameter('hitsPerPage', hitsPerPage);

      widgetContainer.addEventListener('click', function(e) {
        if (e.target.id && e.target.id === 'show-more') {
          params.helper.nextPage().search();
        }
      });

      widgetContainer.innerHTML = '<div id="rendered-hits"></div><p><button id="show-more">Show more</button></p>';
      hitsContainer = document.getElementById('rendered-hits');
    },
    render: function (params) {
      // params = { results: {}, state: {}, helper: {} }

      if (params.state.page === 0) { // because '0' means we updated refinements
        hitsContainer.innerHTML = '';
      }

      var rendering;

      if (params.results.nbHits > 0) {
        rendering = params.results.hits.map(function(hit) {
          return Mustache.render(itemTemplate, hit);
        });
      }
      else {
        rendering = [Mustache.render(emptyTemplate, params.results)];
      }

      hitsContainer.insertAdjacentHTML('beforeend', rendering.join(''));
    }
  }
};
