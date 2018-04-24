import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import "semantic-ui/dist/semantic.min.css";
import CommentBox from "./comment/CommentBox";


/**
 * data属性是父组件传递给子组件的值， 在子组件中通过this.props.data，获取到父组件里面绑定的值
 * 这种是使用变量的mock方式mock数据
 */

// var comments = [
//   {"author": "小花", "date":"3分钟前", "text":"今天天气不错啊！"},
//   {"author": "小白", "date":"2分钟前", "text":"出去玩啊！"}
// ]
// ReactDOM.render(<CommentBox  data={comments}/>, document.getElementById("root")); 

/**
 * 将其改造 假装从服务端拿到数据， 也就是从一个文件拿到需要的数据
 * 1. 通过url 这个参数获取到mock文件里面的数据
 * 2. 注意这个mockdata需要放在public文件夹下才能访问
 */
ReactDOM.render(<CommentBox  url="mockdata/CommentsMock.json"/>, document.getElementById("root"));
registerServiceWorker();
