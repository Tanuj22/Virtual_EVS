import React, {Component} from 'react';
import { Table, Button } from 'semantic-ui-react';
import voting from '../ethereum/voting';
import web3 from '../ethereum/web3';

class RequestRow extends Component{

    state = {
        candidate : {},
        loading : false
    }

    onVerify = async()=>{
        this.setState({loading : true });
        const accounts = await web3.eth.getAccounts();
        await voting.methods.verifyCandidate(this.props.address).send({
            from : accounts[0]
        });
        this.setState({loading : false });
    };

    render(){
        voting.methods.candidateDetails(this.props.address).call().then( candidate => {
            this.setState({candidate : candidate})
        });
        return(
            <Table.Row disabled= {this.state.candidate.isVerified}>
                <Table.Cell>{this.state.candidate.name}</Table.Cell>
                <Table.Cell>{this.state.candidate.aadhar}</Table.Cell>
                <Table.Cell>{this.state.candidate.constituency}</Table.Cell>
                <Table.Cell>
                    { this.state.candidate.isVerified ? null : (
                        <Button color = "green" basic onClick = {this.onVerify} loading= { this.state.loading }>Verify</Button>
                    )}
                </Table.Cell>
            </Table.Row>
        );
    }
}

export default RequestRow;