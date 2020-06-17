import React from 'react';
import { Segment, Header, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export const NavBar = () => {
    
    return(
        <Segment clearing>
            <Header as="h2" floated="left">
                Customers
            </Header>
            <Header floated="right">
                <Button content="Novo" icon="add" as={Link} to="/customer/new" color="green" size="big">
                    
                </Button>
            </Header>
        </Segment>
    )
}