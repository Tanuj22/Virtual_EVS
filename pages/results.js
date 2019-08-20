import React, {Component} from 'react';
import voting from '../ethereum/voting';
import Layout from '../components/Layout';
import { Router } from '../routes';
import { Form ,Button , Input, Message,Grid} from 'semantic-ui-react';

class Results extends Component{
    async componentWillMount(){
        const endElection = await voting.methods.endVote().call();
        if(!endElection){
            Router.pushRoute('/');
        }
    }

    state = {
        submitted : false,
        constituency : '',
        loading : false,
        errorMessage : '',
        winnerDetails :{},
        moreWinnerDetails : {},
        votesWon : 0,
    }

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({loading : true , errorMessage : '',submitted : false});

        try {
            let winner = await voting.methods.showWinner(this.state.constituency).call();
            let details = await voting.methods.candidateDetails(winner).call();
            let admindetails = await voting.methods.adminCandidateDetails(winner).call();
            let votes = await voting.methods.winnerVotes(winner).call()
            this.setState({winnerDetails : details});
            this.setState({moreWinnerDetails : admindetails});
            this.setState({votesWon : votes});

        } catch(err){
            this.setState({ errorMessage : err.message })
        }
        
        this.setState({loading : false,submitted : true})
    };

    render(){
        return(
            <Layout>
                <h3>Enter the constituency to check result in</h3>
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
                { !this.state.submitted ? null : ( 
                    <div style = {{paddingTop : '25px'}}>
                    <Grid columns = {2}>
                        <Grid.Row>
                            <Grid.Column>
                                Name : <br/>
                                {this.state.winnerDetails.name}
                            </Grid.Column>
                            <Grid.Column>
                                Aadhar Number : <br/>
                                {this.state.winnerDetails.aadhar}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                        <Grid.Column>
                            Constituency : <br/>
                            {this.state.winnerDetails.constituency}
                        </Grid.Column>
                        <Grid.Column>
                                Attendance in the House : <br/>
                                {this.state.moreWinnerDetails.attendance}
                        </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                        <Grid.Column>
                            Criminal Record : <br/>
                            {this.state.moreWinnerDetails.criminalRecord}
                        </Grid.Column>
                        <Grid.Column>
                            Fund Utilization : <br/>
                                {this.state.moreWinnerDetails.fundUtilization}
                        </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                        <Grid.Column>
                            Other Details : <br/>
                            {this.state.moreWinnerDetails.otherDetails}
                        </Grid.Column>
                        <Grid.Column>
                            Votes Won <br/>
                                {this.state.votesWon}
                        </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    </div>
                )} 
            </Layout>
        );
    }
}

export default Results;