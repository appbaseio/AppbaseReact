var AppbaseReact = {
	bindArray:function(query, response_var){
    	var $this = this;
    	query.on('data', function(res) {
    		if(typeof $this.state[response_var] == 'undefined'){
    			var obj = {};
    			obj[response_var] = [];
    			$this.setState(obj);
    		}
    		var streamArray = $this.state[response_var];
    		streamArray.push(res);
    		$this.setOutput(streamArray, response_var);
        }).on('error', function(res) {
            //this.setOutput(res, response_var);
        });
    },
    bindObject:function(query, response_var){
    	var $this = this;
    	query.on('data', function(res) {
    		$this.setOutput(res, response_var);
        }).on('error', function(res) {
            //this.setOutput(res, response_var);
        });
    },
    setOutput: function(res, response_var) {
        obj = {};
        obj[response_var] = res;
        this.setState(obj);
    }
}