//Singe quote for display quote
var Quote = React.createClass({
    render:function(){
        return( 
            <div className="quote row">
                <p className="col-xs-12">{this.props.text} is going to {this.props.event_name}</p>
            </div>
        )
    }
});

//Container which is parent container
//It contains mixins of appbase
var Container = React.createClass({
    mixins:[AppbaseReact],
    appbaseRef:new Appbase({
        url: 'https://scalr.api.appbase.io',
        appname: 'meetup2',
        username: 'qz4ZD8xq1',
        password: 'a0edfc7f-5611-46f6-8fe1-d4db234631f3'
    }),
    getInitialState:function(){
      return{};
    },
    componentWillMount:function(){
      var searchQuery = this.appbaseRef.searchStream({
        type: "meetup",
        body: {
          query: {
            match_all: {}
          }
        },
        streamOnly:false
      });
      
      //Appbase-React Mixin methods
      this.bindArray(searchQuery,'search_response');
      this.bindObject(searchQuery,'search_single_response');
    },
    bunchQuote:function(){
        var $this = this;
        var bunch_quote = null;
        if(typeof this.state.search_response != 'undefined'){
            var quotes = this.state.search_response;
            var bunch_quote = quotes.map(function(single_quote, i){
                return(
                  <Quote key={i}
                    onEdit = {$this.onEdit}
                    onDelete = {$this.onDelete}
                    id = {single_quote._id}
                   text ={single_quote._source.member.member_name}
                 event_name ={single_quote._source.event.event_name} />
                )
            });
        }
        return bunch_quote;
    },
    singleQuote:function(){
      var $this = this;
      var single_quote = null;
      if(typeof this.state.search_single_response != 'undefined'){
            var single_quote = this.state.search_single_response;
              return(
                <Quote key={1}
                  onEdit = {$this.onEdit}
                  onDelete = {$this.onDelete}
                  id = {single_quote._id}
                 text ={single_quote._source.member.member_name}
                 event_name ={single_quote._source.event.event_name} />
              )
        }
        return single_quote;
    },
    render:function(){
        var Bunch_quote = this.bunchQuote();
        var Single_quote = this.singleQuote();
        return (
            <div key="container-1" className="col-xs-12">
                <h3>bindObject - Returns object everytime</h3>       
                {Single_quote}
                <h3>bindArray - Returns Array, and merging with old data</h3>
                {Bunch_quote}        
            </div>
            )
    }   
});


ReactDOM.render(   
    <Container></Container>
    , document.getElementById('app'));
