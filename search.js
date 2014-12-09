var whitelist = [
  {name: "MDN (Mozilla Design Network)", link: "developer.mozilla.org"},
  {name: "Stack Overflow", link: "stackoverflow.com"},
  {name: "CSS Tricks", link: "css-tricks.com"},
  {name: "W3C (World Wide Web Consortium)", link: "w3.org"},
  {name: "A List Apart", link: "alistapart.com"},
]

$(document).ready(function(){
  var target = $('body #whitelist')

  function buildSearchOption(obj) {
    target.append("<label>" + obj.name + "<input name='site' type='checkbox' value='" + obj.link + "' checked></label>")
  }

  whitelist.forEach(buildSearchOption)

  $('form').submit(function(){
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