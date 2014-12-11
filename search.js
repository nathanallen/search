var whitelist = [
  {name: "MDN (Mozilla Design Network)", link: "developer.mozilla.org"},
  {name: "Stack Overflow", link: "stackoverflow.com"},
  {name: "CSS Tricks", link: "css-tricks.com"},
  {name: "W3C (World Wide Web Consortium)", link: "w3.org"},
  {name: "A List Apart", link: "alistapart.com"},
  {name: "Quirks Mode", link: "quirksmode.org"},
  {name: "jQuery API", link: "jquery.com"}
]

var languages = [ 'javascript', 'jquery', 'css', 'html', 'ruby', 'python' ],

    descriptors = [ 'property', 'attribute', 'selector', 'element', 'tag',
                    'method', 'function', 'api' ]

function anyMatchingSearchTerms(search_terms, match_terms) {
  return search_terms.some(function(term){
            return match_terms.some(function(match){
                return term.indexOf(match) !== -1
            })
  })
}

function makeSearchSuggestions(search_terms, $container, $target) {
  $target.html('')
  if ( !anyMatchingSearchTerms(search_terms, languages) ) {
    $container.show()
    $target.append("<li>Consider narrowing the scope of your search by specifying a language (e.g. javascript, css, html).</li>")
  }
  if ( !anyMatchingSearchTerms(search_terms, descriptors) ) {
    $container.show()
    $target.append('<li>Use domain specific descriptors like "html /tag/", "css /selector/", "javascript /method/".</li>')
  }
}

function buildQuery(search_terms, $whitelist_selections) {
  var whitelist_filter = $.makeArray($whitelist_selections.map(function(){return 'site:' + this.value})),
      query = search_terms.join('+') + "+" + whitelist_filter.join('+OR+')
  return query
}

function renderWhitelist(whitelist, $target) {
  whitelist.forEach(function(opt){
    $target.append("<label>" + opt.name + "<input name='site' type='checkbox' value='" + opt.link + "' checked></label>")
  })
}

function loadSearchResults(query, $target) {
    $target.html("<iframe src='https://duckduckgo.com/?q=" + query +"'>")
}

function init() {
  var $search_form = $('form'),
      $whitelist_container = $search_form.find('#whitelist-container'),
      $whitelist_target = $whitelist_container.find('#whitelist'),
      $suggestions_container = $search_form.find('#suggestions-container'),
      $suggestions_target = $suggestions_container.find('#suggestions'),
      $search_results_target = $('#search-results-target'),
      $search_input = $search_form.find('input#search')

  renderWhitelist(whitelist, $whitelist_target)

  $search_form.submit(function(e){
      var search_terms =  $search_input.val().toLowerCase().split(' '),
          query = buildQuery(search_terms, $whitelist_target.find('input:checked'))

      makeSearchSuggestions(search_terms, $suggestions_container, $suggestions_target)

      loadSearchResults(query, $search_results_target)

      //collapse
      $whitelist_container.hide()
      $search_form.css('margin-top', 0)
      $search_input.css('margin-bottom', 0)
      $('#stupidity-msg').show()

      return false
  })

}

$(document).ready(init)