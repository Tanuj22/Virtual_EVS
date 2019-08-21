import React, {Component} from 'react';
import Layout from '../../components/Layout';
import { Form ,Button , Input, Message} from 'semantic-ui-react';
import voting from '../../ethereum/voting';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes.js'

class AdminIndex extends Component{
    state ={
        ErrorMessage : '',
        loading : false 
    }
    
    onSubmit = async(event) =>{
        event.preventDefault();

        this.setState({loading : true , errorMessage : ''});

        try{
            const accounts = await web3.eth.getAccounts();
            const hasAccess = await voting.methods.isManager().send({
                from : accounts[0]
            });
            if(hasAccess)
            {
                Router.push('/admin/voters');
            }
            else{
                this.setState({ErrorMessage:'You do not have have access'});
            }
        }catch(err){    
            this.setState({ errorMessage : err.message });
        }

        this.setState({loading : false});
    }

    render(){
        return(
            <Layout>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <div style = {{paddingTop : '50px'}}>
                        <center>
                        <Button loading= { this.state.loading } size = "massive">Login</Button>
                        </center>
                    </div>
                </Form>
            </Layout>
        );
    }
}

export default AdminIndex;