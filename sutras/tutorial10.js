// tutorial10.js
var CommentList = React.createClass({
  render: () => {
    var commentNodes = this.props.data.map( () => {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});
