import React, { useState, useEffect } from 'react';
import { Segment, Header, Form, Button, Grid, Icon } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { dataPersist, cpfRemove, dataBr, cpfMask } from './util';
import axios from 'axios';
import Message from './customerMessage';

export const CustomerEditForm = (props) => {
    const [ nameVazio, setNameVazio ] = useState(false);
    const [ cpfVazio, setCpfVazio ] = useState(false);
    const [ birthdateVazio, setBirthdateVazio ] = useState(false);
    const [ showPortal, setShowPortal ] = useState(false);
    const [ customerSelected, setCustomerSelected ] = useState('');
    const [ messageUser, setMessageUser ] = useState({ title: '', text: '', nameIcon: '', colorIcon: ''});
    const handleClose = () => setShowPortal(false);
    const history = useHistory();
    let url = 'http://54.147.244.100/api/customers';
    let id = props.match.params.id;


    useEffect(() => {
        async function loadCustomer(){
            await axios.get(`${url}/${id}`)
                .then(res => {
                    console.log(res.data)
                    setCustomerSelected(res.data)
                })
                .catch(() =>
                    history.push('/customer/new')
                )
        }
        loadCustomer();
    }, [id, url, history]);

    const handleEdit = (e) => {
        e.preventDefault();
        const nome = e.target.name;
        const valor = e.target.value;
        setCustomerSelected({...customerSelected, [nome] : valor})
    }

    async function edit(id){

        const dados = {
            name: customerSelected.name, 
            cpf: cpfRemove(customerSelected.cpf), 
            birthdate: dataPersist(customerSelected.birthdate)
        };

        if(!dados.name){
            setNameVazio(true)
            return
        }
        if(!dados.cpf){
            setCpfVazio(true)
            return
        }
        if(!dados.birthdate){
            setBirthdateVazio(true)
            return
        }

        setMessageUser({ title: '', text: '', nameIcon: '', colorIcon: ''});

        axios.put(`${url}/${id}`, dados)
            .then(res => {
                setMessageUser({ title: 'Sucesso', text: 'Cadastro editado!!', nameIcon: 'check circle outline', colorIcon: 'green'})
                setCustomerSelected(customerSelected.id === id ? res.data : '');
            })
            .catch(() =>
                setMessageUser({ title: 'Erro', text: 'Não foi possível editar cadastro', nameIcon: 'times circle outline', colorIcon: 'red'})
            )

        setShowPortal(true)
    }


    return(
        <>
        {showPortal && <Message show={showPortal} handleClose={handleClose} messageUser={messageUser} />}
        <Grid>
            <Grid.Row centered>

                <Grid.Column width={10}>

                    <Segment clearing>
                        <Header as="h1">Editar</Header>
                        <Form onSubmit={() => edit(customerSelected.id)}>
                            <Form.Input label="Nome:" placeholder="Digite seu nome" size="big" width={14} name="name"
                                value={customerSelected.name || ''} onChange={handleEdit} error={nameVazio}
                            />
                            <InputMask mask="999.999.999-99" value={cpfMask(customerSelected.cpf || '')} onChange={handleEdit}>
                                <Form.Input label="CPF:" placeholder="Digite seu cpf" size="big" width={8} error={cpfVazio} name="cpf"
                                />
                            </InputMask>
                            <InputMask mask="99/99/9999" value={dataBr(customerSelected.birthdate || '')} onChange={handleEdit}>
                                <Form.Input label="Data de Nascimento:" placeholder="Digite seu aniversário" size="big" width={6} error={birthdateVazio} name="birthdate"
                                />
                            </InputMask>
                            <Button size="big">Enviar</Button>
                        </Form>
                    </Segment>
                    <Button color="twitter" as={Link} to="/">
                        <Icon name="left arrow"></Icon>Voltar</Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        </>
    )
}