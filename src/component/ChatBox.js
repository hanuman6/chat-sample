import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class ChatBox extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="ChatBox">
                    <div className="input-wrap">
                        <TextField
                            id="name"
                            name='user_name'
                            label="お名前"
                            variant="outlined"
                            defaultValue={this.props.userName}
                            onChange={this.props.onTextChange}
                        />
                    </div>
                    <div className="input-wrap">
                        <TextField
                            id="message"
                            label="メッセージ"
                            multiline
                            rows="3"
                            name='text'
                            variant="outlined"
                            value={this.props.text}
                            onChange={this.props.onTextChange}
                        />
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.props.onButtonClick}
                            className="btn"
                            size="large">
                            送信
                        </Button>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}