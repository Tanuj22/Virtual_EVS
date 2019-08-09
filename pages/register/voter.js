import React, {Component} from 'react';
import Layout from '../../components/Layout'
import { Form ,Button , Input, Message} from 'semantic-ui-react';
import voting from '../../ethereum/voting';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes.js'

class RegisterVoter extends Component{
    state = {
        name : '',
        aadhar : '',
        constituency : '',
        errorMessage : '',
        loading : false 

    }

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({loading : true , errorMessage : ''});

        try {
            const accounts = await web3.eth.getAccounts();
            await voting.methods.registerVoter(this.state.name, this.state.aadhar, this.state.constituency).send({
                    from : accounts[0]
                });
            Router.pushRoute('/');
        } catch(err){
            this.setState({ errorMessage : err.message })
        }
        
        this.setState({loading : false})
    };

    render(){
        return(
            <Layout>
                <h3>Register as Voter</h3>
                <Form onSubmit = {this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Name</label>
                        <Input
                            label = "name" 
                            labelPosition = "right"
                            value={this.state.name}
                            onChange={event =>this.setState({name : event.target.value})}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Aadhar Number</label>
                        <Input
                            label = "aadhar" 
                            labelPosition = "right"
                            value={this.state.aadhar}
                            onChange={event =>this.setState({aadhar : event.target.value})}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Constituency</label>
                        <Input
                            label = "constituency" 
                            labelPosition = "right"
                            value={this.state.constituency}
                            onChange={event =>this.setState({constituency : event.target.value})}
                        />
                    </Form.Field>

                    <Message error header= "Oops" content = {this.state.errorMessage} />
                    <Button loading= { this.state.loading } primary>Register</Button>
                </Form>
            </Layout>
        );
    }
}

export default RegisterVoter;