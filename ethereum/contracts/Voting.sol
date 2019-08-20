pragma solidity ^0.4.17;


contract Voting{
    address manager;
    bool public startVote;
    bool public endVote;
    mapping(string => address) winner;
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
    }
    
    struct AdminCandidate{
        string attendance;
        string criminalRecord;
        string fundUtilization;
        string otherDetails;
    }
    
    address[] public candidates;
    mapping(address => Candidate) public candidateDetails;
    mapping(address => AdminCandidate) public adminCandidateDetails;
    mapping(address => uint) totalVotes;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function Voting() public {
        manager=msg.sender;
        startVote = false;
        endVote = false;
        
    }
    
    function CompareStrings(string memory a, string memory b) internal pure returns (bool) {
        if(bytes(a).length != bytes(b).length) {
            return false;
        } else {
            return keccak256(a) == keccak256(b);
        }
    }
    
    function registerVoter(string name, string aadhar, string constituency) public{
        require(!startVote);
        require(!endVote);
        Voter memory newVoter = Voter({
            name : name,
            aadhar : aadhar,
            constituency : constituency,
            isVerified : false,
            hasVoted : false
        });
        
        require(!CompareStrings(voterDetails[msg.sender].aadhar, newVoter.aadhar));
        voterDetails[msg.sender] = newVoter;
        voters.push(msg.sender);
    }
    
    function registerCandidate(string name, string aadhar, string constituency) public{
        require(!startVote);
        require(!endVote);
        Candidate memory newCandidate = Candidate({
            name : name,
            aadhar : aadhar,
            constituency : constituency,
            isVerified : false
        });
        
        require(!CompareStrings(candidateDetails[msg.sender].aadhar, newCandidate.aadhar));
        totalVotes[msg.sender]=0;
        candidateDetails[msg.sender] = newCandidate;
        candidates.push(msg.sender);
    }
    
    function verifyVoter(address voterAddress) public restricted{
        voterDetails[voterAddress].isVerified = true;
    }
    
    function verifyCandidate(address candidateAddress) public restricted {
        candidateDetails[candidateAddress].isVerified = true;
    }
    
    
    function vote(address candidateAddress) public {
        require(startVote);
        require(!endVote);
        require(voterDetails[msg.sender].isVerified);
        require(!voterDetails[msg.sender].hasVoted);
        
        require(CompareStrings(voterDetails[msg.sender].constituency , candidateDetails[candidateAddress].constituency));
        
        totalVotes[candidateAddress]++;
        
        voterDetails[msg.sender].hasVoted = true;
        
    }
    
    function calculateResult(string c) public restricted{
        require(endVote);
        uint votes =0;
        address temp;
        for(uint i =0 ; i<candidates.length;i++){
            if(CompareStrings(candidateDetails[candidates[i]].constituency,c)){
                if(totalVotes[candidates[i]]>votes){
                    temp = candidates[i];
                    votes = totalVotes[candidates[i]];
                }
            }
        }
        winner[c]=temp;
    }
    
    function startElection() public restricted{
        startVote = true;
    }
    
        function endElection() public restricted{
        endVote = true;
    }
    
    
    function addCandidateDetails(
        address candidateAddress, 
        string attendance , 
        string criminalRecord, 
        string fundUtilization,
        string otherDetails) public 
        restricted {
        AdminCandidate memory newAdminCandidate = AdminCandidate({
            attendance : attendance,
            criminalRecord : criminalRecord,
            fundUtilization : fundUtilization,
            otherDetails : otherDetails
        });
        
        adminCandidateDetails[candidateAddress] = newAdminCandidate;
    }
    
    function getVoters() public view returns (address[])
    {
        return voters;
    }
    
    function getCandidates() public view returns (address[])
    {
        return candidates;
    }
    
    function showWinner(string c) public view returns (address){
        require(endVote);
        return winner[c];
    }
    
    function winnerVotes(address candidate) public view returns(uint){
        require(endVote);
        return totalVotes[candidate];
    }
    
    function isManager() public view returns (bool){
        return manager == msg.sender;
    }
    
}