import React, {Component} from 'react';
import { Table, Button } from 'semantic-ui-react';
import voting from '../ethereum/voting';
import web3 from '../ethereum/web3';

class RequestRow extends Component{

    state = {
        voter : {}
    }

    onVerify = async()=>{
        const accounts = await web3.eth.getAccounts();
        await voting.methods.verifyVoter(this.props.address).send({
            from : accounts[0]
        });
    };

    render(){
        voting.methods.voterDetails(this.props.address).call().then( voter => {
            this.setState({voter : voter})
        });
        return(
            <Table.Row disabled= {this.state.voter.isVerified}>
                <Table.Cell>{this.state.voter.name}</Table.Cell>
                <Table.Cell>{this.state.voter.aadhar}</Table.Cell>
                <Table.Cell>{this.state.voter.constituency}</Table.Cell>
                <Table.Cell>
                    { this.state.voter.isVerified ? null : (
                        <Button color = "green" basic onClick = {this.onVerify}>Verify</Button>
                    )}
                </Table.Cell>
            </Table.Row>
        );
    }
}

export default RequestRow;