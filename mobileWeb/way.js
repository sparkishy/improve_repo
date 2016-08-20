import React from 'react';
import ReactDOM from 'react-dom';
import BurgerMenu from 'react-burger-menu';
import classNames from 'classnames';
import $ from "jquery";
var Waypoint = require('react-waypoint');
import ImageGallery from 'react-image-gallery';


require('!style!css!./normalize.css');
require('!style!css!./slider.css');
require("!style!css!sass!./image-gallery.scss");

import './example.less';

const PREFIX_URL = 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/';

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


let MenuWrap = React.createClass({

  getInitialState() {
    return {hidden : false};
  },

  componentWillReceiveProps(nextProps) {
    const sideChanged = this.props.children.props.right !== nextProps.children.props.right;

    if (sideChanged) {
      this.setState({hidden : true});

      setTimeout(() => {
        this.show();
      }, this.props.wait);
    }
  },

  show() {
    this.setState({hidden : false});
  },

  render() {
/*
	$('#test').html('comecomecome');
    $('#test').append('<h1>asdsadasdasdasasdasasdasdsadsdasdad</h1>');
*/
    let style;

    if (this.state.hidden) {
      style = {display: 'none'};
    }
    else{
	    style = {width: '500px', backgroundColor: 'red'};
    }

    return (
      <div style={style} className={this.props.side}>
        {this.props.children}
      </div>
    );
  }
});

let Demo = React.createClass({

  changeMenu(menu) {
    this.setState({currentMenu: menu});
  },

  changeSide(side) {
    this.setState({side});
  },

  getItems() {
    let items;

    switch (this.props.menus[this.state.currentMenu].items) {
      case 1:
        items = [
          <a key="0" href=""><i className="fa fa-fw fa-star-o"></i><span>New Items</span></a>,
          <a key="1" href=""><i className="fa fa-fw fa-bell-o"></i><span>Best Items</span></a>,
          <a key="2" href=""><i className="fa fa-fw fa-envelope-o"></i><span>Event</span></a>,
          <a key="3" href=""><i className="fa fa-fw fa-comment-o"></i><span>Login</span></a>,
          <a key="4" href=""><i className="fa fa-fw fa-bar-chart-o"></i><span>Register</span></a>,
          <a key="5" href=""><i className="fa fa-fw fa-newspaper-o"></i><span>Contact</span></a>
        ];
        break;
      case 2:
        items = [
          <h2 key="0"><i className="fa fa-fw fa-inbox fa-2x"></i><span>Sidebar</span></h2>,
          <a key="1" href=""><i className="fa fa-fw fa-database"></i><span>Data Management</span></a>,
          <a key="2" href=""><i className="fa fa-fw fa-map-marker"></i><span>Location</span></a>,
          <a key="3" href=""><i className="fa fa-fw fa-mortar-board"></i><span>Study</span></a>,
          <a key="4" href=""><i className="fa fa-fw fa-picture-o"></i><span>Collections</span></a>,
          <a key="5" href=""><i className="fa fa-fw fa-money"></i><span>Credits</span></a>
        ];
        break;
      default:
        items = [
          <a key="0" href=""><i className="fa fa-fw fa-star-o"></i><span>Favorites</span></a>,
          <a key="1" href=""><i className="fa fa-fw fa-bell-o"></i><span>Alerts</span></a>,
          <a key="2" href=""><i className="fa fa-fw fa-envelope-o"></i><span>Messages</span></a>,
          <a key="3" href=""><i className="fa fa-fw fa-comment-o"></i><span>Comments</span></a>,
          <a key="4" href=""><i className="fa fa-fw fa-bar-chart-o"></i><span>Analytics</span></a>,
          <a key="5" href=""><i className="fa fa-fw fa-newspaper-o"></i><span>Reading List</span></a>
        ];
    }

    return items;
  },

  getMenu() {
    const Menu = BurgerMenu[this.state.currentMenu];
    const items = this.getItems();
    
    var styles = {
	  bmBurgerButton: {
	    position: 'fixed',
	    width: '36px',
	    height: '30px',
	    left: '12px',
	    top: '12px',
	    zIndex: '50'
	  },
	  bmBurgerBars: {
	    background: '#373a47'
	  },
	  bmCrossButton: {
	    height: '24px',
	    width: '24px',
	    zIndex: '100 !important'
	  },
	  bmCross: {
	    background: '#bdc3c7',
	     zIndex: '100 !important'
	  },
	  bmMenu: {
	    background: '#373a47',
	    padding: '2.5em 1.5em 0',
	    fontSize: '1.15em',
	    zIndex: '100 !important'
	  },
	  bmMorphShape: {
	    fill: '#373a47'
	  },
	  bmItemList: {
	    color: '#b8b7ad',
	    padding: '0.8em',
	    zIndex: '100 !important'
	  },
	  bmOverlay: {
	    background: 'rgba(0, 0, 0, 0.3)'
	  }
	};
    
    let jsx;

    if (this.state.side === 'right') {
      jsx = (
        <MenuWrap wait={20} side={this.state.side}>
          <Menu id={this.state.currentMenu} customBurgerIcon={ <img src="img/Logo.png" /> } width={300} pageWrapId={"page-wrap"} outerContainerId={"outer-container"} right>
            {items}
          </Menu>
        </MenuWrap>
      );
    } else {
      jsx = (
        <MenuWrap wait={20}>
          <Menu id={this.state.currentMenu} styles={styles} pageWrapId={"page-wrap"} outerContainerId={"outer-container"}>
            {items}
          </Menu>
        </MenuWrap>
      );
    }

    return jsx;
  },

  getInitialState() {
    return {
      currentMenu: 'stack',
      side: 'left'
    };
  },

  render() {
    const buttons = Object.keys(this.props.menus).map((menu) => {
      return (
        <a key={menu}
          className={classNames({'current-demo': menu === this.state.currentMenu})}
          onClick={this.changeMenu.bind(this, menu)}>
          {this.props.menus[menu].buttonText}
        </a>
      );
    });

    return (
      <div id="outer-container" style={{height: '100%'}}>
      	<div id="headUp" style={{fontSize: '30px', paddingTop: '8px'}}>I TOLD YOU MALL</div>
      	
        {this.getMenu()}
        <main id="page-wrap">         
          <h2 className="description"> REFERENCE MALL </h2>
          
          <img src="http://itymall.com/mainAssets/images/Logo.png" style={{width:'100%'}} /> 
          <Slider /> 
        </main>
        
        <InfiniteScrollExample />
        Inspired by Sean
      </div>
    );
  }
});

const menus = {
  slide: {buttonText: 'Slide', items: 1},
  stack: {buttonText: 'Stack', items: 1},
  elastic: {buttonText: 'Elastic', items: 1},
  bubble: {buttonText: 'Bubble', items: 1},
  push: {buttonText: 'Push', items: 1},
  pushRotate: {buttonText: 'Push Rotate', items: 2},
  scaleDown: {buttonText: 'Scale Down', items: 2},
  scaleRotate: {buttonText: 'Scale Rotate', items: 2},
  fallDown: {buttonText: 'Fall Down', items: 2}
};


ReactDOM.render(<Demo menus={menus} />, document.getElementById('app'));
