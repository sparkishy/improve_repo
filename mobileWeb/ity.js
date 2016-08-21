import React from 'react';
import ReactDOM from 'react-dom';
var App = require('./sidebar')
import classNames from 'classnames';
import $ from "jquery";
var Waypoint = require('react-waypoint');
import ImageGallery from 'react-image-gallery';
import html2canvas from 'html2canvas';


require('!style!css!./normalize.css');
require('!style!css!./slider.css');
require("!style!css!sass!./image-gallery.scss");

import './menu.less';
import './example.less';

const PREFIX_URL = 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/';


window.onload = function() {
	html2canvas(document.getElementById("imagewrap"), {
    onrendered: function(canvas) {
      canvas.className = "html2canvas";
      document.getElementById("canvasWrapper").appendChild(canvas);
      var image = canvas.toDataURL("image/png");
      document.getElementById("downloadLink").href = image;
    },
    useCORS: true
  });
}

class Slider extends React.Component {

  constructor() {
    super();
    this.state = {
      isPlaying: true,
      showIndex: false,
      slideOnThumbnailHover: false,
      showBullets: true,
      infinite: true,
      showThumbnails: false,
      showNav: false,
      slideInterval: 4000,
      fullscreen: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.slideInterval !== prevState.slideInterval) {
      // refresh setInterval
      this._pauseSlider();
      this._playSlider();
    }
  }

  _pauseSlider() {
    this._imageGallery.pause();
    this.setState({isPlaying: false});
  }

  _playSlider() {
    this._imageGallery.play();
    this.setState({isPlaying: true});
  }

  _fullScreen() {
    this._imageGallery.fullScreen();
  }

  _onImageClick(event) {
    console.debug('clicked on image', event.target.src, 'at index', this._imageGallery.getCurrentIndex());
  }

  _onImageLoad(event) {
    console.debug('loaded image', event.target.src);
  }

  _onSlide(index) {
    console.debug('slid to index', index);
  }

  _onPause(index) {
    console.debug('paused on index', index);
    this.setState({isPlaying: false});
  }

  _onPlay(index) {
    console.debug('playing from index', index);
    this.setState({isPlaying: true});
  }

  _handleInputChange(state, event) {
    this.setState({[state]: event.target.value});
  }

  _handleCheckboxChange(state, event) {
    this.setState({[state]: event.target.checked});
  }

  _getStaticImages() {
    let images = [];
    for (let i = 3; i < 12; i++) {
      images.push({
        original: `${PREFIX_URL}${i}.jpg`,
        thumbnail:`${PREFIX_URL}${i}t.jpg`
      });
    }

    return images;
  }

  render() {
/*
    const images = [
      {
        original: `${PREFIX_URL}1.jpg`,
        thumbnail: `${PREFIX_URL}1t.jpg`,
        originalClass: 'featured-slide',
        thumbnailClass: 'featured-thumb',
        description: 'Custom class for slides & thumbnails'
      },
      {
        original: `${PREFIX_URL}2.jpg`,
        thumbnail: `${PREFIX_URL}2t.jpg`,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing...'
      }
    ].concat(this._getStaticImages());
*/
	const images = [{original:'/mainAssets/images/bg1.jpg', thumbnail: '/mainAssets/images/bg1.jpg'}, {original:'/mainAssets/images/bg0.jpg', thumbnail: '/mainAssets/images/bg0.jpg'}, {original:'/mainAssets/images/bg3.jpg', thumbnail: '/mainAssets/images/bg3.jpg'}];

    return (

      <section className='app'>
        <ImageGallery
          ref={i => this._imageGallery = i}
          items={images}
          lazyLoad={false}
          onClick={this._onImageClick.bind(this)}
          onImageLoad={this._onImageLoad}
          onSlide={this._onSlide}
          onPause={this._onPause.bind(this)}
          onPlay={this._onPlay.bind(this)}
          infinite={this.state.infinite}
          showBullets={this.state.showBullets}
          showThumbnails={this.state.showThumbnails}
          showIndex={this.state.showIndex}
          showNav={this.state.showNav}
          slideInterval={parseInt(this.state.slideInterval)}
          autoPlay={this.state.isPlaying}
          slideOnThumbnailHover={this.state.slideOnThumbnailHover}
        />
      </section>
    );
  }
}
/**
 * Randomly return either a cat or machine image url
 * @return {string}
 */
var currentIndex = 0;
var generateItem = function() {
  var chooseCat = Math.floor(Math.random() * 2);
  var ind = (currentIndex % 10) + 1;
  var newImage = (chooseCat) ?
    'http://lorempixel.com/output/cats-q-c-640-480-' + ind + '.jpg':
    'http://lorempixel.com/output/technics-q-c-640-480-' + ind + '.jpg';
  currentIndex++;
  return newImage;
}

var genProduct = function(itemsP) {
	$.support.cors = true;
	 var next_page = 1;
      $.ajax({
	    type: 'post',
	    dataType: 'json',
	    url: 'http://itymall.com/index.php/mobile/productShow',
	    data: {page:next_page},
	    crossDomain: true,
	    success: function (data) {
	        // 목록을 생성하는 스크립트
	        if (data != 'empty') {
		    
	        $.each(data, function(key, val) {
		        
		        var str = val.mainImage;
	            itemsP.push(str);
	            currentIndex++;
	        });	         
	    }
	    },
	    error: function (request,status,error) {
		    alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		    console.error(error);
	    }
	});
}

var InfiniteScrollExample = React.createClass({
  _loadMoreItems: function() {
	
    var itemsToAdd = 3;
    var secondsToWait = 1;
    this.setState({ isLoading: true });
    var next_page = 1;
    // fake an async. ajax call with setTimeout
    window.setTimeout(function() {
      // add data
      var currentItems = this.state.items;
      
  	  $.ajax({
	    type: 'post',
	    dataType: 'json',
	    url: 'http://itymall.com/index.php/mobile/productShow',
	    data: {page:next_page},
	    success: function (data) {
	        // 목록을 생성하는 스크립트
	        if (data != 'empty') {
		    
	        $.each(data, function(key, val) {
		        
		        var str = val.mainImage;
	            currentItems.push(str);
	            currentIndex++;
	        });	         
	    }
	    },
	    error: function (request,status,error) {
		    alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		    console.error(error);
	    }
	});
	
	  this.setState({
        items: currentItems,
        isLoading: false,
      });
      
    }.bind(this), secondsToWait * 1000);
    
  },

  /**
   * @return {Object}
   */
  getInitialState: function() {
    var initialItems = [];
      
    return {
      items: initialItems,
      isLoading: false,
    };
  },
   /**
   * @return {Object}
   */
  _renderItems: function() {
    return this.state.items.map(function(imageUrl, index) {
      return (
        <img
          src={imageUrl}
          alt="CATS AND ROBOTS... "
          key={index}
          className="infinite-scroll-example__list-item" />
      );
    });
  },

  /**
   * @return {Object}
   */
  _renderLoadingMessage: function() {
    if (this.state.isLoading) {
      return (
        <p className="infinite-scroll-example__loading-message">
          Loading...
        </p>
      );
    }
  },
  _handleWaypointLeave: function(){
	  this.setState({
        
        isLoading: false,
      });
  },
  _renderWaypoint: function() {
    if (!this.state.isLoading) {
      return (
        <Waypoint
          onEnter={this._loadMoreItems}
          onLeave={this._handleWaypointLeave}
          threshold={2.0}
        />
      );
    }
  },

  /**
   * @return {Object}
   */
  render: function() {
    return (
      <div className="infinite-scroll-example">
        <p className="infinite-scroll-example__count">
          
        </p>
        
        <div className="infinite-scroll-example__scrollable-parent">
          {this._renderItems()}
          {this._renderLoadingMessage()}
          {this._renderWaypoint()}
        </div>
        <p className="infinite-scroll-example__arrow" />
      </div>
    );
  }
});

var Menu = React.createClass({
    getInitialState: function() {
        return {
            visible: false  
        };
    },

    show: function() {
        this.setState({ visible: true });
        document.addEventListener("click", this.hide.bind(this));
    },

    hide: function() {
        document.removeEventListener("click", this.hide.bind(this));
        this.setState({ visible: false });
    },

    render: function() {
        return <div className="menu">
            <div className={(this.state.visible ? "visible " : "") + this.props.alignment}>{this.props.children}</div>
        </div>;
    }
});

var MenuItem = React.createClass({
    navigate: function(hash) {
        window.location.hash = hash;
    },

    render: function() {
        return <div className="menu-item" onClick={this.navigate.bind(this, this.props.hash)}>{this.props.children}</div>;
    }
});

var App = React.createClass({
    showLeft: function() {
        this.refs.left.show();
    },

    showRight: function() {
        this.refs.right.show();
    },

    render: function() {
        return <div>
        	<div id="headUp" style={{fontSize: '30px', paddingTop: '8px'}}>I TOLD YOU MALL</div>
            <button id="butt" onClick={this.showLeft}></button>

            <Menu ref="left" alignment="left">
                <MenuItem hash="first-page">New Items</MenuItem>
                <MenuItem hash="second-page">Event Items</MenuItem>
                <MenuItem hash="third-page">Log In</MenuItem>
            </Menu>

            <Menu ref="right" alignment="right">
                <MenuItem hash="first-page">First Page</MenuItem>
                <MenuItem hash="second-page">Second Page</MenuItem>
                <MenuItem hash="third-page">Third Page</MenuItem>
            </Menu>
            
			 <div className="outer" style={{position: "relative"}}>
			 	 <div id="imagewrap" className="wrap">
			    <img src="https://i.imgur.com/EFM76Qe.jpg?1" id="img_prev"/>
			    <h3 className="desc" style={{position: "absolute", top: "0"}}>Something <br /><span>Inspirational</span></h3>
			    <span id="wow">WOW!</span>
			  </div>
			</div>
			<div id="canvasWrapper" className="outer">
			  <p>Canvas</p>
			  <p>Or, <a id="downloadLink" download="cat.png">Click Here to Download!</a></p>
			</div>

            <Slider />
			<InfiniteScrollExample />
        </div>;
    }
});
	
ReactDOM.render(<App />, document.getElementById('app'));
