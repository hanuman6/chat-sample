import React from "react";
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Chip from 'material-ui/Chip';

const styles = {
    chip: {
        margin: 4,
        alignItems: 'flexEnd'

    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

export default class Message extends React.Component {
    render() {
        const props = this.props;
        const userSessionId = sessionStorage.getItem('userId');
        return (
            <div className={props.message.user_id === userSessionId ? 'Message' : 'Message other'}>
                <List>
                    <ListItem disabled>
                        <Avatar className="" src={props.message.profile_image} />
                        <span style={{marginBottom: -5}}>@{props.message.user_name}</span>
                        <div className="">
                            <Chip style={styles.chip} >
                                {props.message.text}
                            </Chip>
                        </div>
                    </ListItem>
                </List>
            </div>
        );
    }
}