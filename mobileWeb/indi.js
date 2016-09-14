import React from 'react';
import ReactDOM from 'react-dom';



var Content = React.createClass({
    showLeft: function() {
        
    },

    showRight: function() {
        
    },

    render: function() {
        return <div>
        	<div id="header" style={{fontSize: '30px', paddingTop: '8px'}}>I TOLD YOU MALL</div>
            
        </div>;
    }
});

var Content2 = React.createClass({
    showLeft: function() {
        
    },

    showRight: function() {
        
    },

    render: function() {
        return <div>
        	<div id="header" style={{fontSize: '30px', paddingTop: '8px'}}>The other step</div>
            
        </div>;
    }
});


ReactDOM.render(<Content />, document.getElementById('app'));
ReactDOM.render(<Content2 />, document.getElementById('main'));