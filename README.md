# AppbaseReact
React mixin of appbase integration. 

## To use appbase mixin
```
var Container = React.createClass({
    mixins:[AppbaseReact],
    ....
```

##  Connect with appbase
To connect with appbase, you need to create AppbaseRef object, and then pass that object in **Connect** function
```
var AppbaseRef = new Appbase({
    url: 'https://scalr.api.appbase.io',
    appname: appname,
    username: username,
    password: password
});
this.appbase().connect(AppbaseRef);
```        
## Read Document
 Read Document of any *type* with use of *search* method, and get the response in 2nd parameter variable
```
this.appbase().search(dataObject,"search_response");
//Example of dataObject
var dataObject = {
   type: "tweet",
      body: {
        query: {
          match_all: {}
        }
    }
};
```
in this example you can access response data by using "this.state.search_response"

## Write/Update Document
 Same way as Read Document, you can Write/Update document with use of *index* method, and get the response in 2nd parameter variable
```
this.appbase().index(dataObject,"index_response");
//Example of dataObject
var dataObject = {
   type: "tweet",
      body: {
        query: {
          match_all: {}
        }
    }
};
```
in this example you can access response data by using "this.state.index_response"

## Delete Document
 Same way as Read Document, you can Delete document with use of *delete_doc* method, and get the response in 2nd parameter variable
```
this.appbase().delete_doc(dataObject,"delete_response");
//Example of dataObject
var dataObject ={
    type:"tweet",
    id:id
};
```
in this example you can access response data by using "this.state.delete_response"

> For more help with apis, [Visit Appbase Api](http://docs.appbase.io/scalr/javascript/api-reference.html)
