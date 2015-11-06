# AppbaseReact
React mixin of appbase integration. 

## To use appbase mixin
```
var Container = React.createClass({
    mixins:[AppbaseReact],
    ....
```

##  bindArray
To get streaming result in array, you can use this method, it will update you with new data and merging them in Array.
```
this.bindArray(searchQuery,'search_response');

//here searchQuery is Appbase stream query
//Example of searchquery
var searchQuery = this.appbaseRef.searchStream({
  type: "tweet",
  body: {
    query: {
      match_all: {}
    }
  },
  streamOnly:true
});
```
in this example you can access response data by using "this.state.search_response"

## bindObject
 To get streaming result in object, you can use this method, it will always update you with new data.
```
this.bindObject(searchQuery,'search_response');

//here searchQuery is Appbase stream query
//Example of searchquery
var searchQuery = this.appbaseRef.searchStream({
  type: "tweet",
  body: {
    query: {
      match_all: {}
    }
  },
  streamOnly:true
});
```
in this example you can access response data by using "this.state.search_response"