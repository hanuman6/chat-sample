import React, { Component } from 'react';
import './App.css';
import { firebaseDb } from './firebase'
import Message from './component/Message'
import ChatBox from './component/ChatBox'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';

const NG_ENDPOINT = '/ng.json';

const movieId = document.getElementById("Movie_id").innerHTML;
const userId = document.getElementById("user_id").innerHTML;

const messagesRef = firebaseDb.ref(`movie_${movieId}`);
class AppChat extends Component {
  constructor(props) {
    super(props);
    this.onTextChange = this.onTextChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.state = {
      user_id: userId,
      text: "",
      user_name: sessionStorage.getItem('user_name'),
      profile_image: "",
      messages: [],
      height: "",
      ngWords: "",
    };
    this.myRef = React.createRef();
    this.myRef2 = React.createRef();
  }

  render() {
    return (
        <MuiThemeProvider>
          <div className="App">
            <div className="App-header">
              <h2>チャットサンプル</h2>
            </div>
            <div className="MessageList" ref={this.myRef2}>
              <div className="inner" ref={this.myRef}>
                {this.state.messages.map((m, i) => {
                  return <Message key={i} message={m} />
                })}
              </div>
            </div>
            <ChatBox
                onTextChange={this.onTextChange}
                onButtonClick={this.onButtonClick}
                userName={this.state.user_name}
                text={this.state.text}
            />
          </div>
        </MuiThemeProvider>
    );
  }

  // 入力を取得してStateに保存
  onTextChange(e) {
    if(e.target.name === 'user_name') {
      this.setState({
        "user_name": e.target.value,
      });
    } else if (e.target.name === 'text') {
      this.setState({
        "text": e.target.value,
      });
    }
  }

  // NGリストをStateに保持
  checkNG() {
    axios
      .get(NG_ENDPOINT)
      .then((results) => {
          const data = results.data;
          const wordList = data.join('|');
          this.setState({
            ngWords: wordList
          })
        },
      )
      .catch(() => {
        console.log('APIエラー');
      });
  }

  // ランダム画像
  randomImage() {
    let rand = Math.floor(Math.random()*1000) ;
    let img = `https://i.picsum.photos/id/${rand}/100/100.jpg`;
    return img;
  }

  // クリック時のバリデーションとFirebaseに保存
  onButtonClick() {
    // NGワードチェックと必須バリデーション
    const NG_WORDS = new RegExp(this.state.ngWords);
    if(this.state.user_name === "") {
      alert('お名前を入力してください');
      return
    } else if(this.state.text === "") {
      alert('メッセージを入力してください');
      return
    } else if(NG_WORDS.test(this.state.user_name) || NG_WORDS.test(this.state.text)) {
      alert('不適切な文字が含まれています');
      return
    }
    // DB保存
    messagesRef.push({
      "user_id" : this.state.user_id,
      "user_name" : this.state.user_name,
      "profile_image" : "this.randomImage()",
      "text" : this.state.text,
    });
    // Session保存
    sessionStorage.setItem('user_name', this.state.user_name);
    this.setState({
      "text": "",
    });
  }

  // 投稿時に最新にスクロール
  scrollFunc() {
    this.myRef2.current.scrollTo(0, this.state.height);
  }

  componentDidMount() {
    this.checkNG();
  }

  componentWillMount() {
    messagesRef.on('child_added', (snapshot) => {
      const m = snapshot.val();
      let msgs = this.state.messages;

      msgs.push({
        "user_id" : m.user_id,
        'text' : m.text,
        'user_name' : m.user_name,
        'profile_image' : m.profile_image,
      });
      this.setState({
        messages : msgs,
        height : this.myRef.current.offsetHeight,
      }, function() {
        this.scrollFunc();
      });
    })
  }

}

export default AppChat;