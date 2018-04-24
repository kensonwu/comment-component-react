// 导入React React里面子组件， 注意此处Reat 与Component的位置，如果把React 也放入{}内也是会报错的
import React, { Component } from 'react';
// 导入子组件
import CommentList from './CommentList';
import CommentForm from './CommentForm';
//导入jQuery
import $ from 'jquery';

class CommentBox extends Component {
  /**
   * 添加构造函数， 这个函数支持参props
   */
  constructor(props) {
    // 需要且必须调用super()
    super(props);
    // 设置一个状态， 且初始化一个data, 默认是一个空的数组， 因为这个data会传递给他的儿子CommentList
    this.state = {data: []}
    // 获取data数据
    this.getComments();
    //没5秒钟定时检测服务器端数据， 如果服务器端有数据变化， 那么就能很快反应到页面上
    // setInterval(() => this.getComments(), 5000);
  }

  /**
   * 此方法用于jQuery异步请求服务器端数据
   */
  getComments() {
    // 通过jQery的异步请求数据的方法，请求data的数据
    $.ajax({
      // 请求的地址， 是从父组件传递过来的url
      url: this.props.url,
      // 请求的数据格式 为json
      dataType: 'json',
      // 是否缓存， 否
      cache: false,
      // 请求成功所做的动作, 此处就是请求成功会将数据交给comments
      success: comments => {
        // 设置组件的状态， 也就是设置data的数据，  也就是将data的数据设置成comments
        this.setState({data: comments});
      },
      // 如果请求错误,使用error方法处理
      // error这个方法有三个参数xhr,status,error, 如果请求出错我们就简单的将error输出到控制台
      error: (xhr, status, error) => {
        console.log(error);
      }
    });
  }

  /**
   * 当用户输入了评论的内容并点击了 "提交" 按钮，那么我们就会将评论的内容提交给服务器端处理，同时提交的新的评论内容也会显示到CommentList 里面
   * 那么我们需要在哪个地方去进行这个处理呢？
   * 我可以在CommentBox这个组件处理， 因为CommentBox里面有CommentList的数据
   * 那实际上就是要子组件CommentForm的数据传递给他父组件CommentBox这个组件， 那么我们要怎么处理呢？ 因为React是数据单单向流的
   * 
   * 我们可以这样处理： 在父组件CommentBox里面顶一个处理提交的form的方法， 将这个方法传递给子组件CommentForm, 
   * 如果CommentForm有新的内容提交 那么就将数据反到这个方法里面
   */
  handleCommentSubmit(comment){
    // 首先获取到当前的data的数据
    let comments = this.state.data,
        // 新的评论内容是提交的评论+原来的评论内容， 那就是最新的评论的内容了
        newComments = comments.concat(comment);
    this.setState({data: newComments});

    
  }

  render() {
    return (
      <div className="ui comments">
        <h1>评论</h1>
        <div className="ui divider"></div>
        {/* <CommentList data={this.props.data}/> 此处是直接接受父组件传递过来的data的数据*/} 
        <CommentList data={this.state.data}/>
        <CommentForm onCommentSubmit = {this.handleCommentSubmit.bind(this)}/>
      </div>
    );
  }
}

export default CommentBox;