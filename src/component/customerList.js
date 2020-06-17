import React from 'react';
import { Button, Icon, Card, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { dataBr, cpfMask } from './util';
import Message from './customerMessage';

export const CustomerList = (props) => {

    const customers = props.customers;
    let showPortal = props.showPortal;
    let handleClose = props.handleClose;
    let messageUser = props.messageUser;

    
    const Delete = (id) => {
        props.deleteCustomer(id);
    }

    return(
        <>
            <div style={{marginTop: '70px'}}>
                {showPortal && <Message show={showPortal} handleClose={handleClose} messageUser={messageUser} />}
            </div>

            {customers.length > 0 ? (
                <Card.Group centered itemsPerRow={4}>
                    {Object.keys(customers).map((key) => {
                        return(
                            
                            <Card key={customers[key].id}>
                                <Card.Content textAlign="center">
                                    <Icon name="user" size="big" circular />
                                </Card.Content>
                                <Card.Content>
                                    <Card.Header>Nome: {customers[key].name}</Card.Header>
                                    <Card.Meta>Dt. Nascimento: {dataBr(customers[key].birthdate)}</Card.Meta>
                                    <Card.Description>CPF: {cpfMask(customers[key].cpf)}</Card.Description>
                                </Card.Content>
                                <Card.Content extra textAlign="center">
                                    <Button as={Link} to={"/customer/edit/" + customers[key].id} color="blue"><Icon name="edit" />Editar</Button>
                                    <Button color="red" onClick={() => Delete(customers[key].id)}><Icon name="trash" />Deletar</Button>
                                </Card.Content>
                            </Card>
                        )
                    })}
                    
                </Card.Group>
            ) : (
                <Segment raised textAlign="center">Nenhum registro encontrado.</Segment>
            )}
            
        </>
    )
}