import React, { useState, useEffect} from 'react';
import { NavBar } from './navBar';
import { CustomerList } from './customerList';
import axios from 'axios';

const Customer = () => {
    const [ customers, setCustomers ] = useState('');
    const [ showPortal, setShowPortal ] = useState(false);
    const handleClose = () => setShowPortal(false);
    const [ messageUser, setMessageUser ] = useState({ title: '', text: '', nameIcon: '', colorIcon: ''});
    let url = 'http://54.147.244.100/api/customers';

    useEffect(() => {
        async function load(){
            axios.get('http://54.147.244.100/api/customers')
                .then(res => {
                    //console.log(res.data.data)
                    setCustomers(res.data.data)
                })
        }
        load()
    }, []);

    const deleteCustomer = async (id) => {

        await axios.delete(`${url}/${id}`)
            .then(() =>{
                let filter = customers.filter(customer => customer.id !== id)
                setCustomers(filter)
                setMessageUser({ title: 'Sucesso', text: 'Cadastro deletado!!', nameIcon: 'check circle outline', colorIcon: 'green'})
            })
            .catch(() =>
                setMessageUser({ title: 'Erro', text: 'Não foi possível deletar!', nameIcon: 'times circle outline', colorIcon: 'red'})
            )
        
        setShowPortal(true);
    }

    return(
        <>
            <NavBar />
            <CustomerList customers={customers} deleteCustomer={deleteCustomer} handleClose={handleClose} messageUser={messageUser} showPortal={showPortal} />
        </>
    )
}

export default Customer;