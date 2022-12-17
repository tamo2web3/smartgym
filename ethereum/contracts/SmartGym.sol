// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
contract SmartGymContract {

    uint constant DATELENGTH = 10; //yyyy/mm/dd
    string constant ERROR_DATELENGTH = "ERROR_DATELENGTH.";
    string constant ERROR_USER = "ERROR_USER.";

    struct Gym {
        address adr;
        string actdate;
        string machine;
        uint min;
        uint cal;
        uint keybefore;
        uint keyafter;
        string stuffmessage;
        string uname;
    }

    struct Account {
        address adr;
        string icon;
        string ufirst;
        string ulast;
        string objective;
        string description;
        string joindate;
    }

    address public manager;
    mapping(address => bool) public managers;
    Account[] accounts;
    Gym[] public gyms;

    constructor() {
        manager = msg.sender;
    }

    modifier checkParam(string memory dates, address adr) {
        require(bytes(dates).length == DATELENGTH, ERROR_DATELENGTH);
        _;
    }

    function createAccount(string memory icon, string memory ufirst, string memory ulast,
     string memory objective, string memory description, string memory joindate
    ) public {
        require(managers[msg.sender] == false, ERROR_USER);

        Account memory a = Account(msg.sender, icon, ufirst, ulast, objective, description, joindate);
        accounts.push(a);
        managers[msg.sender] = true;
    }

    function inputGym(string memory actdate, string memory machine, uint min,
     uint cal, uint keybefore, uint keyafter,
     string memory stuffmessage, string memory uname
    ) public checkParam(actdate, msg.sender) {

        Gym memory g = Gym(msg.sender, actdate, machine, min, cal, keybefore, keyafter, stuffmessage, uname);
        gyms.push(g);
    }

    function getAllAcounts() public view returns (Account[] memory) {
        return accounts;
    }

    function getAllGyms() public view returns (Gym[] memory) {
        return gyms;
    }

    function putMessage(string memory stuffmessage, uint index
    ) public {
        gyms[index].stuffmessage = stuffmessage;
    }

    //make afeter
    // function createEvent () public payable {
    //     //NOP
    // }

    // function takepartinEvent () public payable {
    //     //NOP
    // }

    // function summarizeEvent() public {
    //     //NOP
    // }
}
