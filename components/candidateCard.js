import React, {Component} from 'react';
import { Card, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import voting from '../ethereum/voting';
import { Router } from '../routes'

class CandidateCard extends Component{

    state = {
        errrorMessage : '',
        loading : false,
    }

    onVote= async()=>{
        this.setState({loading : true , errorMessage : ''});
        try{
            const accounts = await web3.eth.getAccounts();
            await voting.methods.vote(this.props.address).send({
                from : accounts[0]
            })
            Router.push('/');
        }catch(err){
            this.setState({ errorMessage : err.message });
        }

        this.setState({loading : false});

    }

    render(){
        return(
            <Card>
                <Card.Content>
                <Card.Header>{this.props.candidate.name}</Card.Header>
                <Card.Meta>{this.props.candidate.constituency}</Card.Meta>
                <Card.Description>{this.props.candidate.aadhar}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    { !!this.props.voterHasVoted ? null : (
                        <Button onClick = {this.onVote} loading= { this.state.loading }>Vote</Button>
                    )}
                </Card.Content>
            </Card>
        );
    }
}

export default CandidateCard;