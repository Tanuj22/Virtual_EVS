import React, {Component} from 'react';
import Layout from '../../components/Layout';
import { Card } from 'semantic-ui-react'
import web3 from '../../ethereum/web3';
import voting from '../../ethereum/voting';
import { Router, Link } from '../../routes';
import CandidateCard from '../../components/candidateCard';

class CandidateList extends Component{
    state = {
        approvedCandidates : [],
        voter : {}
    }
    async componentWillMount(){
        //let approvedCandidates = [];
        let candidates = [];
        const accounts = await web3.eth.getAccounts();
        const voter = await voting.methods.voterDetails(accounts[0]).call();
        if(!voter.aadhar && !voter.isVerified)
        {
            Router.push('/register/voter');
        }
        else
        {   
            candidates = await voting.methods.getCandidates().call();
            candidates.forEach(async(address) => {
                let candidate = await voting.methods.candidateDetails(address).call();
                if(candidate.constituency === voter.constituency && candidate.isVerified){
                    let candidatedetail = {
                        candidate : candidate,
                        address : address
                    }
                    this.setState(prevState => ({
                        approvedCandidates: [...prevState.approvedCandidates, candidatedetail]
                   }));
                   this.setState({voter : voter})
                }
            });
        }
    }

    Candidates(){
        return this.state.approvedCandidates.map((candidatedetail,index)=>{
            return (
                <CandidateCard
                    key={index}
                    candidate = {candidatedetail.candidate}
                    address = {candidatedetail.address}
                    voterHasVoted = {this.state.voter.hasVoted}
                />
            )
        });
    }

    render(){
        // voting.methods.getCandidates().call().then(candidates =>{
        //     candidates.forEach(address =>{
        //         voting.methods.candidateDetails(address).call().then(candidate=>{
        //             if(candidate.constituency === this.props.voter.constituency){
        //                 let candidatedetail = {
        //                     candidate : candidate,
        //                     address : address
        //                 }
        //                 this.setState(prevState => ({
        //                     approvedCandidates: [...prevState.approvedCandidates, candidatedetail]
        //                   }))
        //             }
        //         })
        //     })
        // })
        return(
            <Layout>
            <Card.Group>
                {this.Candidates()}
            </Card.Group>
            </Layout>
        );
    }
}

export default CandidateList;