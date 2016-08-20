
import React from 'react';
import ReactDOM from 'react-dom';
import BurgerMenu from 'react-burger-menu';
import classNames from 'classnames';
import $ from "jquery";
var ReactCanvas = require('react-canvas');

// entry.js
require('!style!css!./normalize.css');

import './example.less';

var Item = require('./Item');
var articles = require('./data');

var Surface = ReactCanvas.Surface;
var ListView = ReactCanvas.ListView;

var App = React.createClass({

  render: function () {
    var size = this.getSize();
    return (
      <Surface top={0} left={0} width={size.width} height={size.height}>
        <ListView
          style={this.getListViewStyle()}
          numberOfItemsGetter={this.getNumberOfItems}
          itemHeightGetter={Item.getItemHeight}
          itemGetter={this.renderItem} />
      </Surface>
    );
  },

  renderItem: function (itemIndex, scrollTop) {
    var article = articles[itemIndex % articles.length];
      return (
      <Item
        width={this.getSize().width}
        height={Item.getItemHeight()}
        imageUrl={article.imageUrl}
        title={article.title}
        itemIndex={itemIndex} />
    );
  },

  getSize: function () {
    return document.getElementById('main').getBoundingClientRect();
  },

  // ListView
  // ========

  getListViewStyle: function () {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  },

  getNumberOfItems: function () {
    return 1000;
  },

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
          <a key="0" href=""><i className="fa fa-fw fa-star-o"></i><span>Favorites</span></a>,
          <a key="1" href=""><i className="fa fa-fw fa-bell-o"></i><span>Alerts</span></a>,
          <a key="2" href=""><i className="fa fa-fw fa-envelope-o"></i><span>Messages</span></a>,
          <a key="3" href=""><i className="fa fa-fw fa-comment-o"></i><span>Comments</span></a>,
          <a key="4" href=""><i className="fa fa-fw fa-bar-chart-o"></i><span>Analytics</span></a>,
          <a key="5" href=""><i className="fa fa-fw fa-newspaper-o"></i><span>Reading List</span></a>
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
	    top: '12px'
	  },
	  bmBurgerBars: {
	    background: '#373a47'
	  },
	  bmCrossButton: {
	    height: '24px',
	    width: '24px'
	  },
	  bmCross: {
	    background: '#bdc3c7'
	  },
	  bmMenu: {
	    background: '#373a47',
	    padding: '2.5em 1.5em 0',
	    fontSize: '1.15em'
	  },
	  bmMorphShape: {
	    fill: '#373a47'
	  },
	  bmItemList: {
	    color: '#b8b7ad',
	    padding: '0.8em'
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
      	<div id="header" style={{fontSize: '30px', paddingTop: '8px'}}>I TOLD YOU MALL</div>
        {this.getMenu()}
        <main id="page-wrap">
          <h1><a href="https://github.com/negomi/react-burger-menu">I TOLD YOU MALL DEMO</a></h1>
          <h2 className="description">Who is going to be with us</h2>
          <App />
          <nav className="demo-buttons">
          </nav>
          Inspired by <a href="https://github.com/codrops/OffCanvasMenuEffects">Off-Canvas Menu Effects</a> and <a href="https://github.com/codrops/SidebarTransitions">Sidebar Transitions</a> by Sean
        </main>
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
