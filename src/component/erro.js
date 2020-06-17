import React from 'react';
import { Button, Segment, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const Erro = () => {
    return(
        <Segment placeholder>
            <Header icon>
                <Icon name="page4" />
                Página não encontrada!
            </Header>
            <Button as={Link} to="/">Voltar</Button>
        </Segment>
    )
}