var search = instantsearch({
  appId: '6B29BTPQED',
  apiKey: '49ae085a83962db19658af549b3bac7e',
  indexName: 'bestbuy',
  urlSync: true
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-input',
    placeholder: 'Search here!'
  })
);

search.addWidget(
  instantsearch.widgets.stats({
    container: '#stats'
  })
);

search.addWidget(
  instantsearch.widgets.hitsWithShowMore({
    container: '#infinite-hits',
    hitsPerPage: 5,
    templates: {
      item: getTemplate('hit'),
      empty: getTemplate('no-results')
    }
  })
);

search.addWidget(
  instantsearch.widgets.stats({
    container: '#stats'
  })
);

// facets
search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#category',
    attributeName: 'categories',
    limit: 10,
    sortBy: ['isRefined', 'count:desc', 'name:asc'],
    operator: 'or',
    templates: {
      header: '<h5>Category</h5>'
    }
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#brand',
    attributeName: 'brand',
    limit: 10,
    sortBy: ['isRefined', 'count:desc', 'name:asc'],
    operator: 'or',
    templates: {
      header: '<h5>Brand</h5>'
    }
  })
);

search.addWidget(
  instantsearch.widgets.rangeSlider({
    container: '#price',
    attributeName: 'price',
    templates: {
      header: '<h5>Price</h5>'
    }
  })
);

search.addWidget(
  instantsearch.widgets.menu({
    container: '#type',
    attributeName: 'type',
    limit: 10,
    sortBy: ['isRefined', 'count:desc', 'name:asc'],
    templates: {
      header: '<h5>Type</h5>'
    }
  })
);

// here we go!
search.start();

// utilities
function getTemplate(templateName) {
  return document.getElementById(templateName + '-template').innerHTML;
}
