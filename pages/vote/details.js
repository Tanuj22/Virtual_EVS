import React, {Component} from 'react';
import Layout from '../../components/Layout';
import { Grid, Button } from 'semantic-ui-react'
import web3 from '../../ethereum/web3';
import voting from '../../ethereum/voting';
import { Router, Link } from '../../routes';

class VoterDetails extends Component{
    static async getInitialProps(){
        const accounts = await web3.eth.getAccounts();
        const voter = await voting.methods.voterDetails(accounts[0]).call();
        if(!voter.aadhar || !voter.isVerified)
        {
            Router.pushRoute('/register/voter');
        }
        else
        {
            return { voter };
        }
    }

    render(){
        return(
            <Layout>
                <div style = {{paddingTop : '25px'}}>
                <Grid columns = {2}>
                    <Grid.Row>
                        <Grid.Column>
                            Name : <br/>
                            {this.props.voter.name}
                        </Grid.Column>
                        <Grid.Column>
                            Aadhar Number : <br/>
                            {this.props.voter.aadhar}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                    <Grid.Column>
                        Constituency : <br/>
                        {this.props.voter.constituency}
                    </Grid.Column>
                    <Grid.Column>
                            <Link route = '/vote/candidateslist'>
                                <Button >Vote Now</Button>
                            </Link>
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
                </div>
            </Layout>
        );
    }
}

export default VoterDetails;