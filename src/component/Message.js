import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

export default class Message extends React.Component {
    render() {
        const props = this.props;
        const userSessionId = sessionStorage.getItem('userId');
        return (
            <div className={props.message.user_id === userSessionId ? 'Message' : 'Message other'}>
                <List>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar className={`color${Math.floor(Math.random()*5)}`}>{props.message.user_name.slice(0,1)}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={props.message.user_name}
                            secondary={props.message.text}
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </List>
            </div>
        );
    }
}