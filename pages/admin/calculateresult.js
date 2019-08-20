import React, {Component} from 'react';
import Layout from '../../components/Layout';
import { Form ,Button , Input, Message} from 'semantic-ui-react';
import voting from '../../ethereum/voting';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes';

class calculateResult extends Component {

    state = {
        constituency : '',
        loading : false,
        errorMessage : ''
    }

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({loading : true , errorMessage : ''});

        try {
            const accounts = await web3.eth.getAccounts();
            await voting.methods.calculateResult(this.state.constituency).send({
                from : accounts[0]
            });
            Router.pushRoute('/admin/voters');
        } catch(err){
            this.setState({ errorMessage : err.message })
        }
        
        this.setState({loading : false})
    };

    render(){
        return(
            <Layout>
                <h3>The Election Must be Ended first to calculate the result</h3>
                <Form onSubmit = {this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Enter Constituency</label>
                        <Input
                            label = "constituency" 
                            labelPosition = "right"
                            value={this.state.constituency}
                            onChange={event =>this.setState({constituency : event.target.value})}
                        />
                    </Form.Field>
                    <Message error header= "Oops" content = {this.state.errorMessage} />
                    <Button loading= { this.state.loading } primary>Submit</Button>
                </Form>
            </Layout>
        );
    }
}

export default calculateResult;