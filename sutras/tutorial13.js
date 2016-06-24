// tutorial13.js
var CommentBox = React.createClass({
  getInitialState: () => {
    return {data: []};
  },
  // コンポーネントがレンダリングされたときに React が自動的に呼び出すメソッド
  componentDidMount: () => {
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
  render: () => {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentFoem />
      </div>
    );
  }
});
