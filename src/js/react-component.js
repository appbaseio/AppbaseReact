//Singe quote for display quote 
// WIth EDIT & Delete button
var Quote = React.createClass({
    EditQuote:function(){
        this.props.onEdit(this.props.text, this.props.id);
    },
    DeleteQuote:function(){
        var $this = this;
        var delete_confirm = confirm("Do you want to delete this Document?")
        if(delete_confirm)
            $this.props.onDelete(this.props.id);
    },
    render:function(){
        return( 
            <div className="quote row">
                <p className="col-xs-12">{this.props.text}</p>
                <div className="col-xs-12">
                    <a onClick={this.EditQuote} className="btn btn-info btn-edit">Edit</a>
                    <a onClick={this.DeleteQuote} className="btn btn-danger btn-delete">Delete</a>
                </div>
            </div>
        )
    }
});

//Input + Submit button
//To Add/Update Quote
var Modal = React.createClass({
    ModalAction:function(){
        var quoteInput = ReactDOM.findDOMNode(this.refs.quoteInput);
        var value = quoteInput.value;
        if(value != null && value != ''){
            this.props.ModalAction(value);
        }
        else{
            alert('Quote must not be empty!');
        }
    },
    textChanged: function(event) {
        this.props.onChange(event.target.value);
    },
    render:function(){
        return( 
            <form className="form-inline row">
              <div className="form-group col-xs-12">
                <div className="input-group col-xs-12">
                  <input type="text"  ref="quoteInput" className="form-control" placeholder="Quote"
                    onChange={this.textChanged}
                    value={this.props.quote_text} />
                  <a href="javascript:void(0);"
                     className="input-group-addon"
                     onClick={this.ModalAction}>{this.props.method}</a>
                </div>
              </div>
            </form>
        )
    }
});

//Container which is parent container
//It contains mixins of appbase
var Container = React.createClass({
    mixins:[AppbaseReact],
    getInitialState:function(){
        return{
            modal:{
                current_quote_text:'',
                method:"Add"
            },
            current_quote_text:'',
            delete_id:0,
            push_quote:false,
            update_quote:false,
            delete_quote:false
        };
    },
    componentDidUpdate:function(){

        //Add or update 
        if(typeof this.state.index_response != 'undefined'){
            var quote_object = this.state.index_response;
            var quotes = this.state.search_response.hits.hits;
            
            if(this.state.push_quote){
                this.setState({push_quote:false});
                quote_object._source = {
                    msg:this.state.current_quote_text
                };
                quotes.push(quote_object);
                this.setState({
                    current_quote_text:'',
                    modal:{
                        current_quote_text:'',
                        method:"Add"
                    }
                });
            }

            if(this.state.update_quote){
                this.setState({update_quote:false});
                console.log(quotes);
                console.log(quote_object);
                var selected_quote = quotes.find(function(value){
                    return value._id == quote_object._id;
                });
                selected_quote._source = {
                    msg:this.state.current_quote_text
                };
                this.setState({
                    current_quote_text:'',
                    modal:{
                        current_quote_text:'',
                        method:"Add"
                    }
                });
            }
        }

        //Delete
        if(this.state.delete_quote){
            var quotes = this.state.search_response.hits.hits;
            this.setState({delete_quote:false});
            var delete_id = this.state.delete_id;
            
            quotes.every(function(value, index){
                if(value._id == delete_id){
                    quotes.splice(index, 1);
                    return false;
                }
                else return true;
            });
        }

    },
    componentWillMount:function(){        
        // 1) Connect with appbase
        var AppbaseRef = new Appbase({
            url: 'https://scalr.api.appbase.io',
            appname: 'testApp',
            username: '6mjKWIRjW',
            password: '61037673-54f9-4849-958b-90bb51d34a17'
        });
        // You need to pass appbase-ref to connect
        this.appbase().connect(AppbaseRef);
    },
    componentDidMount:function(){
        this.read_data();
    },
    read_data:function(){
        var dataObject = {
           type: "tweet",
              body: {
                query: {
                  match_all: {}
                }
            }
        };
        // 2) Read Document of any type pass any query in object, and get the response in 2nd parameter variable
        // you can access response data by using "this.state.search_response"
        this.appbase().search(dataObject,"search_response");
    },
    onEdit:function(text, id){
        this.setState({
            modal:{
                current_quote_id:id,
                method:"Update"
            },
            current_quote_text:text
        });
    },
    onDelete:function(id){
        this.setState({
            delete_id:id
        });
        var dataObject ={
            type:"tweet",
            id:id
        };
        this.setState({delete_quote:true});
        // 2) Read Document of any type pass any query in object, and get the response in 2nd parameter variable
        // you can access response data by using "this.state.search_response"
        this.appbase().delete_doc(dataObject,"delete_response");  
    },
    ModalAction:function(text){
        if(this.state.modal.method == 'Add'){
            var dataObject = {
                type: "tweet",
                body:{
                    msg:text
                }
            };   
            this.setState({push_quote:true});
        }
        else
        {
            var dataObject = {
                type: "tweet",
                id:this.state.modal.current_quote_id,
                body:{
                    msg:text
                }
            };
            this.setState({update_quote:true});
        }
        // 3) Add/Update document, and get the response in 2nd parameter variable
        // you can access response data by using "this.state.index_response"
        this.appbase().index(dataObject,"index_response");
    },
    bunchQuote:function(){
        var $this = this;
        var bunch_quote = null;
        if(typeof this.state.search_response != 'undefined'){
            var quotes = this.state.search_response.hits.hits;
            var bunch_quote = quotes.map(function(single_quote, i){
                return(
                  <Quote key={i}
                    onEdit = {$this.onEdit}
                    onDelete = {$this.onDelete}
                    id = {single_quote._id}
                   text ={single_quote._source.msg} />
                )
            });
        }
        return bunch_quote;
    },
    handleChange: function(value) {
        this.setState({
            current_quote_text: value
        });
    },
    render:function(){
        var Bunch_quote = this.bunchQuote();
        return (
            <div key="container-1" className="col-xs-12">
                <Modal method={this.state.modal.method}
                    ModalAction = {this.ModalAction}
                     quote_text={this.state.current_quote_text}
                      onChange={this.handleChange}  />  
                {Bunch_quote}        
            </div>
            )
    }   
});


ReactDOM.render(   
    <Container></Container>
    , document.getElementById('app'));
