// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MLMWebsite {
    address public owner;
    uint256 public totalInvestors;
    uint256 public totalInvested;
    uint256 public totalWithdrawn;

    struct Investor {
        uint256 id;
        address referrer;
        uint256 plan;
        uint256 level;
        uint256 invested;
        uint256 withdrawn;
        uint256 referralIncome;
        uint256 sponsorIncome;
        uint256 uplineIncome;
        uint256 matrixIncome;
    }

    mapping(address => Investor) public investors;
    mapping(uint256 => address) public idToAddress;

    uint256[] public plans;
    uint256 public constant MATRIX_SIZE = 2;

    mapping(uint256 => mapping(uint256 => address)) public matrix;
    mapping(address => uint256) public matrixIndex;

    event NewInvestor(address indexed investor, address indexed referrer, uint256 indexed id);
    event NewInvestment(address indexed investor, uint256 amount);
    event Withdrawn(address indexed investor, uint256 amount);
    event ReferralIncome(address indexed investor, address indexed referrer, uint256 amount);
    event SponsorIncome(address indexed investor, address indexed sponsor, uint256 amount);
    event UplineIncome(address indexed investor, address indexed upline, uint256 amount);
    event MatrixIncome(address indexed investor, uint256 level, uint256 amount);

    constructor() {
        owner = msg.sender;
        plans = [100 ether, 200 ether, 300 ether, 400 ether, 500 ether, 600 ether, 700 ether];
        totalInvestors = 0;
        totalInvested = 0;
        totalWithdrawn = 0;

        Investor memory investor = Investor({
            id: 1,
            referrer: address(0),
            plan: 0,
            level: 1,
            invested: 0,
            withdrawn: 0,
            referralIncome: 0,
            sponsorIncome: 0,
            uplineIncome: 0,
            matrixIncome: 0
        });

        investors[owner] = investor;
        idToAddress[1] = owner;

        for (uint256 i = 1; i <= MATRIX_SIZE; i++) {
            matrix[1][i] = owner;
        }
    }

    function invest(uint256 _plan, address _referrer) public payable {
        require(_plan > 0 && _plan <= 7, "Invalid plan");
        require(msg.value == plans[_plan - 1], "Invalid amount");

        uint256 id = totalInvestors + 1;
        totalInvestors++;

        Investor memory investor = Investor({
            id: id,
            referrer: _referrer,
            plan: _plan,
            level: 1,
            invested: msg.value,
            withdrawn: 0,
            referralIncome: 0,
            sponsorIncome: 0,
            uplineIncome: 0,
            matrixIncome: 0
        });

        investors[msg.sender] = investor;
        idToAddress[id] = msg.sender;

        totalInvested += msg.value;

        payReferralCommission(msg.value, investor.referrer);

        emit NewInvestor(msg.sender, _referrer, id);
        emit NewInvestment(msg.sender, msg.value);
    }

    function withdraw() public {
    Investor storage investor = investors[msg.sender];

    require(investor.balance > 0, "No balance");

    uint256 totalAmount = investor.balance + investor.uplineBonus;

    investor.balance = 0;
    investor.lastPayout = block.timestamp;

    uint256 adminFee = (totalAmount * ADMIN_FEE_PERCENTAGE) / 100;
    uint256 remainingAmount = totalAmount - adminFee;

    msg.sender.transfer(remainingAmount);

    emit Withdrawn(msg.sender, remainingAmount);

    address payable admin = payable(adminAddress);
    admin.transfer(adminFee);

    emit AdminFeePaid(msg.sender, adminFee);

    payReferralCommission(investor.referrer, totalAmount);
    investor.uplineBonus = 0;

    }

function reinvest() public {
    Investor storage investor = investors[msg.sender];

    require(investor.balance > 0, "No balance");

    uint256 balance = investor.balance;
    investor.balance = 0;

    invest(investor.plan, investor.referrer);

    emit Reinvested(msg.sender, balance);
}

function upgradePlan(uint256 _plan) public {
    require(_plan > investors[msg.sender].plan, "Invalid plan");

    Investor storage investor = investors[msg.sender];

    require(investor.invested >= plans[_plan].minimumInvestment, "Insufficient investment");

    investor.plan = _plan;

    emit PlanUpgraded(msg.sender, _plan);
}

function viewMyTree(address _investor) public view returns (address[] memory) {
    return myTree[_investor];
}

function viewMyUpline(address _investor) public view returns (address) {
    return investors[_investor].upline;
}

function viewMyReferralCommission(address _investor) public view returns (uint256) {
    return investors[_investor].balance;
}

function viewInvestorInfo(address _investor) public view returns (uint256, uint256, uint256, uint256, address, uint256, uint256) {
    Investor storage investor = investors[_investor];

    return (investor.invested, investor.plan, investor.withdrawn, investor.lastPayout, investor.referrer, investor.balance, investor.uplineBonus);
}

function payReferralCommission(address _referral, uint256 _amount) internal {
    address payable referrer = payable(_referral);

    for (uint256 i = 0; i < REFERRAL_PERCENTAGES.length; i++) {
        if (referrer == address(0)) {
            break;
        }

        uint256 commissionPercentage = REFERRAL_PERCENTAGES[i];
        uint256 commission = (_amount * commissionPercentage) / 100;

        uint256 adminFee = (commission * ADMIN_FEE_PERCENTAGE) / 100;
        uint256 remainingCommission = commission - adminFee;

        referrer.transfer(remainingCommission);
        emit ReferralCommissionPaid(referrer, msg.sender, remainingCommission);

        address payable admin = payable(adminAddress);
        admin.transfer(adminFee);
        emit AdminFeePaid(msg.sender, adminFee);

        referrer = payable(investors[referrer].referrer);
    }
}

