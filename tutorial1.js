// tutorial1.js
// https://facebook.github.io/react/docs/tutorial-ja-JP.html

// 新しいReactコンポーネントを作るためにReact.createClass()にJavaScript Objectを渡す
var CommentBox = React.createClass(
  {
    render: () => {
      return (
        <div className="CommentBox">
          Hello, world! I am a CommentBox.
        </div>
      );
    }
  }
);

// ReactDOM.render() はまずルートコンポーネントのインスタンスを作り、フレームワークを立ち上げる
ReactDom.render(
  <CommentBox />,
  document.getElementById('content')
);
