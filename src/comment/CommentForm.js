import React, { Component } from 'react';

class CommentForm extends Component {
  /**
   * 这个方法用于处理form表单的提交
   * @param {*} event 这个是一个事件的参数
   */
  handleSubmit(event){
    // 防止表单自动提交，阻止它的默认时间
    event.preventDefault();
    console.log('提交表单...');
    // 通过定义ref回去表单中每个空间的值以便于传给服务器端
    let author = this.refs.author.value,  //通过value来获取输入框的内容
        text = this.refs.text.value;
    console.log(author, text);
    this.props.onCommentSubmit({author, text, date: '刚刚'});
  }
  render() {
    return (
      // 注意：这里需要bind(this)否则会报错
      <form className="ui reply form" onSubmit={this.handleSubmit.bind(this)}> 
        <div className="field">
          <input type="text" placeholder = "姓名" ref="author"/>
        </div>
          <div className="field">
            <textarea placeholder="评论" ref="text"></textarea>
          </div>
          <button className="ui blue button" type="submit">
            添加评论
          </button>
      </form>
        );
      }
    }
    
export default CommentForm;