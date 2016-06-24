// tutorial18.js
var CommentBox = React.createClass({
  loadCommentsFromServer: () => {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: (data) => {
        this.setState({data: data});
      }.bind(this),
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: (comment) => {
    // TODO: submit to the server and refresh the list
  },
  getInitialState: () => {
    return {data: []};
  },
  componentDidMount: () => {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: () => {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});
