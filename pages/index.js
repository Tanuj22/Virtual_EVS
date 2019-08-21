import React, {Component} from 'react';
import Layout from '../components/Layout.js';
import {Button} from 'semantic-ui-react';
import voting from '../ethereum/voting';
import {Link } from '../routes';

class VotingIndex extends Component{
    static async getInitialProps(){
        const start = await voting.methods.startVote().call();
        const end = await voting.methods.endVote().call();
        return{start,end}
    }
    render(){
        return(
            <Layout>
                <center><h1 style={{paddingTop :'25px'}}>Democracy is the Strength of this Country</h1>
                <div style  = {{paddingTop : '40px'}}>
                { !this.props.start ? (<Link route ='/register'><Button size = "massive">Register</Button></Link>) : (!this.props.end ? (<Link route ='/vote/details'><Button size = "massive">Vote Now</Button></Link>):(<Link route ='/results'><Button size = "massive">Results</Button></Link>))}
                </div>
                </center>
            </Layout>
        );
    }
}

export default VotingIndex;