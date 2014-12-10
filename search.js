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

function any_matching_search_terms(search_terms) {
  return search_terms.some(function(term){
            return languages.some(function(lang){
                return term.indexOf(lang) !== -1
            })
  })
}

$(document).ready(function(){
  var target = $('body #whitelist')

  function buildSearchOption(obj) {
    target.append("<label>" + obj.name + "<input name='site' type='checkbox' value='" + obj.link + "' checked></label>")
  }

  whitelist.forEach(buildSearchOption)

  $('form').submit(function(){
    var checked_sites = $('form #whitelist input:checked').map(function(){return this.value}),
        search_terms = $('form input#search').val().toLowerCase().split(' ')
    console.log(search_terms)
    if ( !any_matching_search_terms(search_terms, languages) ) {
      $('form #suggestions').show()
                            .append("<p>- Consider narrowing the scope of your search by specifying a language (e.g. javascript, css, html).</p>")
    }
    if ( !any_matching_search_terms(search_terms, descriptors) ) {
      $('form #suggestions').show()
                            .append('<p>- Use descriptors like "html /tag/", "css /selector/", "javascript /function/".</p>')
    }
    var query_str = $(this).serialize(), // e.g. "q=dom&site=developer.mozilla.org&site=stackoverflow.com"
        my_query = query_str.slice(2)
                            .replace(/&/, '+') // replace first ampersand with a space;
                            .replace(/&/g, '+OR+') // the rest are seperated by 'OR'
                            .replace(/=/g, ':')
    $('body #search-results-target').html("<iframe src='" + "https://duckduckgo.com/?q=" + my_query +"'>")
    $('form #collapse').hide()
    return false
  })
  
})