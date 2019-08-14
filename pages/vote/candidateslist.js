import React, {Component} from 'react';
import Layout from '../../components/Layout';
import { Card } from 'semantic-ui-react'
import web3 from '../../ethereum/web3';
import voting from '../../ethereum/voting';
import { Router, Link } from '../../routes';
import CandidateCard from '../../components/candidateCard';

class CandidateList extends Component{
    static async getInitialProps(){
        const accounts = await web3.eth.getAccounts();
        const voter = await voting.methods.voterDetails(accounts[0]).call();
        if(!voter.aadhar && !voter.isVerified)
        {
            Router.push('/register/voter');
        }
        else
        {   let candidates = [];
            candidates = await voting.methods.getCandidates().call();
            let approvedCandidates = [];
            candidates.forEach( async (address) => {
                let candidate =  await voting.methods.candidateDetails(address).call();
                if(candidate.constituency === voter.constituency){
                    let candidatedetail = {
                                            candidate : candidate,
                                            address : address
                                        }
                    approvedCandidates.push(candidatedetail);
                }
            });
            return { approvedCandidates };
        }
    }

    Candidates(){
        return this.props.approvedCandidates.map((candidatedetail,index)=>{
            return (
                <CandidateCard
                    key={index}
                    candidate = {candidatedetail.candidate}
                    address = {candidatedetail.address}
                    
                />
            )
        });
    }

    render(){
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