import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Customer from './component/customer';
import { CustomerForm } from './component/customerForm';
import { CustomerEditForm } from './component/customerEditForm';
import { Erro } from './component/erro';

export const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Customer} />
                <Route path="/customer/new" component={CustomerForm} />
                <Route path="/customer/edit/:id" component={CustomerEditForm} />
                <Route path="*" component={Erro} />
            </Switch>
        </BrowserRouter>
    )
}