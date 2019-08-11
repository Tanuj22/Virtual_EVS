import React, {Component} from 'react';
import Layout from '../../components/Layout';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import voting from '../../ethereum/voting';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes.js';
import RequestRow from '../../components/requestVoterRow'; 


class VoterAdmin extends Component{
    static async getInitialProps(){
        // const accounts = await web3.eth.getAccounts();
        // const hasAccess = await voting.methods.isManager().send({
        //     from : accounts[0]
        // });
        // if(!hasAccess)
        // {
        //     Router.push('/admin');
        // }
        // else{
            const registeredVoters = await voting.methods.getVoters().call();
            return {registeredVoters};
        // }
    }

    VotersList(){
        return this.props.registeredVoters.map((address,index) =>{
            return <RequestRow
                key={index}
                address = {address} 
            />;
        });
    }

    render(){
        return(
            <Layout>
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