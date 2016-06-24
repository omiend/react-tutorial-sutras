// tutorial12.js
var CommentBox = React.createClass({
  getInitialState: () => {
    return {data: []};
  },
  render: () => {
    return (
      <div classNama="CommentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
});
