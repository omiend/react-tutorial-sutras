/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	var Comment = React.createClass({
	  displayName: "Comment",

	  rawMarkup: function rawMarkup() {
	    var md = new Remarkable();
	    var rawMarkup = md.render(this.props.children.toString());
	    return { __html: rawMarkup };
	  },

	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "comment" },
	      React.createElement(
	        "h2",
	        { className: "commentAuthor" },
	        this.props.author
	      ),
	      React.createElement("span", { dangerouslySetInnerHTML: this.rawMarkup() })
	    );
	  }
	});

	var CommentBox = React.createClass({
	  displayName: "CommentBox",

	  loadCommentsFromServer: function loadCommentsFromServer() {
	    $.ajax({
	      url: this.props.url,
	      dataType: 'json',
	      cache: false,
	      success: function (data) {
	        this.setState({ data: data });
	      }.bind(this),
	      error: function (xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });
	  },
	  handleCommentSubmit: function handleCommentSubmit(comment) {
	    var comments = this.state.data;
	    comment.id = Date.now();
	    var newComments = comments.concat([comment]);
	    this.setState({ data: newComments });
	    $.ajax({
	      url: this.props.url,
	      dataType: 'json',
	      type: 'POST',
	      data: comment,
	      success: function (data) {
	        this.setState({ data: data });
	      }.bind(this),
	      error: function (xhr, status, err) {
	        this.setState({ data: comments });
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });
	  },
	  getInitialState: function getInitialState() {
	    return { data: [] };
	  },
	  componentDidMount: function componentDidMount() {
	    this.loadCommentsFromServer();
	    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	  },
	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "commentBox" },
	      React.createElement(
	        "h1",
	        null,
	        "Comments"
	      ),
	      React.createElement(CommentList, { data: this.state.data }),
	      React.createElement(CommentForm, { onCommentSubmit: this.handleCommentSubmit })
	    );
	  }
	});

	var CommentList = React.createClass({
	  displayName: "CommentList",

	  render: function render() {
	    var commentNodes = this.props.data.map(function (comment) {
	      return React.createElement(
	        Comment,
	        { author: comment.author, key: comment.id },
	        comment.text
	      );
	    });
	    return React.createElement(
	      "div",
	      { className: "commentList" },
	      commentNodes
	    );
	  }
	});

	var CommentForm = React.createClass({
	  displayName: "CommentForm",

	  getInitialState: function getInitialState() {
	    return { author: '', text: '' };
	  },
	  handleAuthorChange: function handleAuthorChange(e) {
	    this.setState({ author: e.target.value });
	  },
	  handleTextChange: function handleTextChange(e) {
	    this.setState({ text: e.target.value });
	  },
	  handleSubmit: function handleSubmit(e) {
	    e.preventDefault();
	    var author = this.state.author.trim();
	    var text = this.state.text.trim();
	    if (!text || !author) {
	      return;
	    }
	    this.props.onCommentSubmit({ author: author, text: text });
	    this.setState({ author: '', text: '' });
	  },
	  render: function render() {
	    return React.createElement(
	      "form",
	      { className: "commentForm", onSubmit: this.handleSubmit },
	      React.createElement("input", {
	        type: "text",
	        placeholder: "Your name",
	        value: this.state.author,
	        onChange: this.handleAuthorChange
	      }),
	      React.createElement("input", {
	        type: "text",
	        placeholder: "Say something...",
	        value: this.state.text,
	        onChange: this.handleTextChange
	      }),
	      React.createElement("input", { type: "submit", value: "Post" })
	    );
	  }
	});

	ReactDOM.render(React.createElement(CommentBox, { url: "/api/comments", pollInterval: 2000 }), document.getElementById('content'));

/***/ }
/******/ ]);