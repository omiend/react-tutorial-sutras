// tutorial7.js
var Comment = React.createClass({
  rawMarkup: () => {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.chidren.toString());
    return { __html: rawMarkup };
  },
  
  rende: () => {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});
