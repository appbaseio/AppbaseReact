var AppbaseReact = {
    getInitialState: function() {
        return {
            app_status: "Appbase React Connecting",
            streamingClient: null
        }
    },
    appbase: function() {
        var $this = this;
        var streamingClient = $this.state.streamingClient;

        return {
            connect, connect,
            index: index,
            bulk: bulk,
            getTypes: getTypes,
            search: search,
            delete_doc:delete_doc,
            readStream: readStream,
            searchStream: searchStream
        };

        //Implement
        function connect(streamingClient) {
            $this.setState({
                app_status: "Appbase React Connected",
                streamingClient: streamingClient
            });
        }

        function index(object, response_var) {
            streamingClient.index(object).on('data', function(res) {
                $this.setOutput(res, response_var);
            }).on('error', function(res) {
                $this.setOutput(res, response_var);
            });
        }

        function bulk(object, response_var) {
            streamingClient.bulk(object).on('data', function(res) {
                $this.setOutput(res, response_var);
            }).on('error', function(res) {
                $this.setOutput(res, response_var);
            });
        }

        function getTypes(response_var) {
            streamingClient.getTypes().on('data', function(res) {
                $this.setOutput(res, response_var);
            }).on('error', function(res) {
                $this.setOutput(res, response_var);
            });
        }

        function search(object, response_var) {
            streamingClient.search(object).on('data', function(res) {
                $this.setOutput(res, response_var);
            }).on('error', function(res) {
                $this.setOutput(res, response_var);
            });
        }
        
        function delete_doc(object, response_var) {
            streamingClient.delete(object).on('data', function(res) {
                $this.setOutput(res, response_var);
            }).on('error', function(res) {
                $this.setOutput(res, response_var);
            });
        }

        function readStream(object, response_var) {
            streamingClient.readStream(object).on('data', function(res) {
                $this.setOutput(res, response_var);
            }).on('error', function(res) {
                $this.setOutput(res, response_var);
            });
        }

        function searchStream(object, response_var) {
            streamingClient.searchStream(object).on('data', function(res) {
                $this.setOutput(res, response_var);
            }).on('error', function(res) {
                $this.setOutput(res, response_var);
            });
        }

    },
    setOutput: function(res, response_var) {
        obj = {};
        obj[response_var] = res;
        this.setState(obj);
        console.log(this.state[response_var]);
    }
};