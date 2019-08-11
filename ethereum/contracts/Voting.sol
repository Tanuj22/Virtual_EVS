pragma solidity ^0.4.17;


contract Voting{
    address manager;
    struct Voter{
        string name;
        string aadhar;
        string constituency;
        bool isVerified;
        bool hasVoted;
            
    }
    address[] public voters;
    mapping(address => Voter) public voterDetails;
    
    struct Candidate{
        string name;
        string aadhar;
        string constituency;
        bool isVerified;
        uint totalVotes;
    }
    address[] public candidates;
    mapping(address => Candidate) public candidateDetails;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function Voting() public {
        manager=msg.sender;
    }
    
    function registerVoter(string name, string aadhar, string constituency) public{
        Voter memory newVoter = Voter({
            name : name,
            aadhar : aadhar,
            constituency : constituency,
            isVerified : false,
            hasVoted : false
        });
        
        voterDetails[msg.sender] = newVoter;
        voters.push(msg.sender);
    }
    
    function registerCandidate(string name, string aadhar, string constituency) public{
        Candidate memory newCandidate = Candidate({
            name : name,
            aadhar : aadhar,
            constituency : constituency,
            isVerified : false,
            totalVotes : 0
        });
        
        candidateDetails[msg.sender] = newCandidate;
        candidates.push(msg.sender);
    }
    
    function verifyVoter(address voterAddress) public restricted{
        voterDetails[voterAddress].isVerified = true;
    }
    
    function verifyCandidate(address candidateAddress) public restricted {
        candidateDetails[candidateAddress].isVerified = true;
    }
    
    function CompareStrings(string memory a, string memory b) internal pure returns (bool) {
        if(bytes(a).length != bytes(b).length) {
            return false;
        } else {
            return keccak256(a) == keccak256(b);
        }
    }
    
    function vote(address candidateAddress) public {
        require(voterDetails[msg.sender].isVerified);
        require(!voterDetails[msg.sender].hasVoted);
        
        require(CompareStrings(voterDetails[msg.sender].constituency , candidateDetails[candidateAddress].constituency));
        
        candidateDetails[candidateAddress].totalVotes++;
        
        voterDetails[msg.sender].hasVoted = true;
        
    }
    
    function getVoters() public view returns (address[])
    {
        return voters;
    }
    
    function getCandidates() public view returns (address[])
    {
        return candidates;
    }
    
    function isManager() public view returns (bool){
        return manager == msg.sender;
    }
    
}