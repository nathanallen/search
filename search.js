var whitelist = [
  {name: "MDN (Mozilla Design Network)", link: "developer.mozilla.org"},
  {name: "Stack Overflow", link: "stackoverflow.com"},
  {name: "CSS Tricks", link: "css-tricks.com"},
  {name: "W3C (World Wide Web Consortium)", link: "w3.org"},
  {name: "A List Apart", link: "alistapart.com"},
]

var query_filter = whitelist.map(function(obj, i){return "site:" + obj.link}).join(' OR ')

function buildSearchOption(obj, target) {
  var target = $('body #whitelist')
  target.append("<label>"  +  obj.name + "<input type='checkbox' checked></label>")
}

$(document).ready(function(){
  

  whitelist.forEach(buildSearchOption)
  
  $('input').val( )
})