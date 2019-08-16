import React, {Component} from 'react';
import Layout from '../../components/Layout';
import voting from '../../ethereum/voting';
import { Form ,Button , Input, Message} from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes'

class addDetails extends Component{
    static async getInitialProps(props){
        const {address} = props.query;
        return {address};
    }
    state = {
        attendance : '',
        criminalRecord : '',
        fundUtilization : '',
        otherDetails : '',
        errorMessage : '',
        loading : false 
    }

    async componentDidMount(){
        const details = await voting.methods.adminCandidateDetails(this.props.address).call();
        if(details){
            this.setState({
                attendance : details.attendance,
                criminalRecord : details.criminalRecord,
                fundUtilization : details.fundUtilization,
                otherDetails : details.otherDetails,
            })
        }
    }

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({loading : true , errorMessage : ''});

        try {
            const accounts = await web3.eth.getAccounts();
            await voting.methods.addCandidateDetails(
                this.props.address, this.state.attendance,
                this.state.criminalRecord,this.state.fundUtilization,
                this.state.fundUtilization,
                ).send({
                    from : accounts[0]
                });
            Router.pushRoute('/admin/candidates');
        } catch(err){
            this.setState({ errorMessage : err.message })
        }
        
        this.setState({loading : false})
    }; 

    render(){
        return(
            <Layout>
                <h3>Enter Details of Candidate</h3>
                <h5>Fill None if new Candidate or if not Relevant</h5>
                <Form onSubmit = {this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Attendance in The House</label>
                        <Input
                            label = "percentage" 
                            labelPosition = "right"
                            value={this.state.attendance}
                            onChange={event =>this.setState({attendance : event.target.value})}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Criminal Record</label>
                        <Input
                            label = "details" 
                            labelPosition = "right"
                            value={this.state.criminalRecord}
                            onChange={event =>this.setState({criminalRecord : event.target.value})}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Fund Utilization</label>
                        <Input
                            label = "details" 
                            labelPosition = "right"
                            value={this.state.fundUtilization}
                            onChange={event =>this.setState({fundUtilization : event.target.value})}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Any other Details</label>
                        <Input
                            label = "details" 
                            labelPosition = "right"
                            value={this.state.otherDetails}
                            onChange={event =>this.setState({otherDetails : event.target.value})}
                        />
                    </Form.Field>
                    <Message error header= "Oops" content = {this.state.errorMessage} />
                    <Button loading= { this.state.loading } primary>Submit</Button>
                </Form>
            </Layout>
        );
    }
}

export default addDetails;