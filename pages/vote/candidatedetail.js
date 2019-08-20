import React, {Component} from 'react';
import Layout from '../../components/Layout';
import { Grid , Button } from 'semantic-ui-react'
import voting from '../../ethereum/voting';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes.js';

class CandidateDetail extends Component{
    static async getInitialProps(props) {
        const {address} = props.query;
        const details = await voting.methods.candidateDetails(address).call();
        const adminDetails = await voting.methods.adminCandidateDetails(address).call();
        const accounts = await web3.eth.getAccounts();
        const voter = await voting.methods.voterDetails(accounts[0]).call();
        const voterHasVoted = voter.hasVoted;
        return{voterHasVoted,address,details,adminDetails};
    }

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
            Router.pushRoute('/');
        }catch(err){
            this.setState({ errorMessage : err.message });
        }

        this.setState({loading : false});

    }

    render(){
        return(
            <Layout>
                <div style = {{paddingTop : '25px'}}>
                <Grid columns = {2}>
                    <Grid.Row>
                        <Grid.Column>
                            Name : <br/>
                            {this.props.details.name}
                        </Grid.Column>
                        <Grid.Column>
                            Aadhar Number : <br/>
                            {this.props.details.aadhar}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                    <Grid.Column>
                        Constituency : <br/>
                        {this.props.details.constituency}
                    </Grid.Column>
                    <Grid.Column>
                        Attendance in the House : <br/>
                        {this.props.adminDetails.attendance}
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                    <Grid.Column>
                        Criminal Record : <br/>
                        {this.props.adminDetails.criminalRecord}
                    </Grid.Column>
                    <Grid.Column>
                        Attendance in the House : <br/>
                        {this.props.adminDetails.fundUtilization}
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                    <Grid.Column>
                        Other Details : <br/>
                        {this.props.adminDetails.otherDetails}
                    </Grid.Column>
                    <Grid.Column>
                    { !!this.props.voterHasVoted ? null : (
                        <Button onClick = {this.onVote} loading= { this.state.loading }>Vote</Button>
                    )}
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
                </div>
            </Layout>
        );
    }
}

export default CandidateDetail;