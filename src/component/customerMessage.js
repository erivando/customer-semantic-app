import React from 'react';
import { Portal, Button, Segment, Icon, Header } from 'semantic-ui-react';

const Message = (props) => {
    let show = props.show;
    let handleClose = props.handleClose;
    let title = props.messageUser.title;
    let text = props.messageUser.text;
    let nameIcon = props.messageUser.nameIcon;
    let colorIcon = props.messageUser.colorIcon;
    
    return(
        <Portal open={show}>
            <Segment style={{position: 'fixed', width: '300px', float: 'right', marginTop: '-380px', right: '35px'}}>
                <Header>
                    <Icon name={"" + nameIcon} color={"" + colorIcon}></Icon>
                    {title} 
                </Header>
                    <p>{text}</p>
                <Button icon="times" color="google plus" content="Close" onClick={handleClose} />
            </Segment>
        </Portal>
    )
}

export default Message;