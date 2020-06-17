import React, { useState } from 'react';
import { Segment, Header, Form, Button, Grid, Icon } from 'semantic-ui-react';
import { Link} from 'react-router-dom';
import InputMask from 'react-input-mask';
import { dataPersist, cpfRemove } from './util';
import axios from 'axios';
import Message from './customerMessage';

export const CustomerForm = (props) => {
    const [ name, setName ] = useState('');
    const [ cpf, setCpf ] = useState('');
    const [ birthdate, setBirthdate ] = useState('');
    const [ nameVazio, setNameVazio ] = useState(false);
    const [ cpfVazio, setCpfVazio ] = useState(false);
    const [ birthdateVazio, setBirthdateVazio ] = useState(false);
    const [ showPortal, setShowPortal ] = useState(false);
    const [ customers, setCustomers ] = useState('');
    const [ messageUser, setMessageUser ] = useState({ title: '', text: '', nameIcon: '', colorIcon: ''});
    const handleClose = () => setShowPortal(false);
    let url = 'http://54.147.244.100/api/customers';

    const insert = async (e) => {
        e.preventDefault();

        let dados = {
            name: name,
            cpf: cpfRemove(cpf),
            birthdate: dataPersist(birthdate),
        }
        if(name === ''){
            setNameVazio(true)
            return
        }
        if(cpf === ''){
            setCpfVazio(true)
            return
        }
        if(birthdate === ''){
            setBirthdateVazio(true)
            return
        }
        

        setMessageUser({ title: '', text: '', nameIcon: '', colorIcon: ''});

        await axios.post(url, dados)
            .then(res => {
                setMessageUser({ title: 'Sucesso', text: 'Cadastro realizado!!', nameIcon: 'check circle outline', colorIcon: 'green'})
                setCustomers([...customers, res.data]);
                setName('');
                setCpf('');
                setBirthdate('');
            })
            .catch(() =>
                setMessageUser({ title: 'Erro', text: 'Não foi possível realizar cadastro', nameIcon: 'times circle outline', colorIcon: 'red'}),
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
                        <Header as="h1">Cadastrar</Header>
                        <Form onSubmit={insert}>
                            <Form.Input label="Nome:" placeholder="Digite seu nome" size="big" width={14} 
                                value={name} onChange={e => setName(e.target.value)} error={nameVazio}
                            />
                            <InputMask mask="999.999.999-99" value={cpf} onChange={e => setCpf(e.target.value)}>
                                <Form.Input label="CPF:" placeholder="Digite seu cpf" size="big" width={8} error={cpfVazio} 
                                />
                            </InputMask>
                            <InputMask mask="99/99/9999" value={birthdate} onChange={e => setBirthdate(e.target.value)}>
                                <Form.Input label="Data de Nascimento:" placeholder="Digite seu aniversário" size="big" width={6} error={birthdateVazio} 
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