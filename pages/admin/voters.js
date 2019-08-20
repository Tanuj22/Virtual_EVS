import React, {Component} from 'react';
import Layout from '../../components/Layout';
import { Button, Table } from 'semantic-ui-react'
import voting from '../../ethereum/voting';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes.js';
import RequestRow from '../../components/requestVoterRow'; 


class VoterAdmin extends Component{
    static async getInitialProps(){
        const registeredVoters = await voting.methods.getVoters().call();
        return {registeredVoters};
    }

    state = {
        loading : false,
        loading2 : false
    }

    VotersList(){
        return this.props.registeredVoters.map((address,index) =>{
            return <RequestRow
                key={index}
                address = {address} 
            />;
        });
    }

    startElecton = async()=>{
        this.setState({loading : true });
        const accounts = await web3.eth.getAccounts();
        await voting.methods.startElection().send({
            from : accounts[0]
        });
        this.setState({loading : false });
    }

    stopElection = async()=>{
        this.setState({loading2 : true });
        const accounts = await web3.eth.getAccounts();
        await voting.methods.endElection().send({
            from : accounts[0]
        });
        this.setState({loading2 : false });
    }

    render(){
        return(
            <Layout>
                <Link route = '/admin/candidates'>
                    <Button>Show Candidates</Button>
                </Link>
                <Button onClick= {this.startElecton} loading= { this.state.loading }>Start Election</Button>
                <Button onClick= {this.stopElection} loading= { this.state.loading2 }>End Election</Button>
                <Link route = '/admin/calculateresult'>
                    <Button>Calculate Result</Button>
                </Link>
                <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Aadhar Number</Table.HeaderCell>
                        <Table.HeaderCell>Constituency</Table.HeaderCell>
                        <Table.HeaderCell>Vertified</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.VotersList()}
                </Table.Body>
                </Table>
            </Layout>
        );
    }
}

export default VoterAdmin;