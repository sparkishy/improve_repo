import React from 'react';
import ReactDOM from 'react-dom';



var Content = React.createClass({
	getInitialState: function () {
		return {
			one: "case",
			two: 345
		};	
	},
	componentWillMount: function() {
		//this.setState({one: "changed", two: 12342});
	},
    showState: function() {
        alert("One: " + this.state.one + " Two: " + this.state.two);
    },

    changeState: function() {
        this.setState({one: "changed", two: 12342});
    },

    render: function() {
        return <div>
        	<div id="header" style={{fontSize: '30px', paddingTop: '8px'}}>I TOLD YOU MALL</div>
        	<button onClick={this.showState}>Show Current State</button>
            <button onClick={this.changeState}>Change State</button>
            <article class="thumb">
				<a href="images/fulls/01.jpg" class="image"><img src="images/thumbs/01.jpg" alt="" /></a>
				<h2>Magna feugiat lorem</h2>
				<p>Nunc blandit nisi ligula magna sodales lectus elementum non. Integer id venenatis velit.</p>
			</article>
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