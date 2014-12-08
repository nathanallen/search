var whitelist = [
  {name: "MDN (Mozilla Design Network)", link: "developer.mozilla.org"},
  {name: "Stack Overflow", link: "stackoverflow.com"},
  {name: "CSS Tricks", link: "css-tricks.com"},
  {name: "W3C (World Wide Web Consortium)", link: "w3.org"},
  {name: "A List Apart", link: "alistapart.com"},
]

var query_filter = whitelist.map(function(obj, i){return "site:" + obj.link}).join(' OR ')

$(document).ready(function(){
  // $('body').append(Object.keys(whitelist))
  $('input').val( )
})