//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
// Importing libraries
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Arrays.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// MLM Smart Contract
/*The referral system is based on the user's wallet address and their 
referrer's address, which are stored in the users mapping. When a user registers with a referrer's address, 
their referrer is stored in the referrals mapping, and the referrer's number of referrals is incremented. 
The referral system operates based on this mapping and the user's wallet address*/
contract MineMatic is Ownable{
    using SafeERC20 for IERC20;
    using SafeMath for uint256;
    using Address for address;
    using Arrays for uint256[];
    using Strings for uint256;
    address public owner;
    mapping(address => bool) public admins;
    mapping(address => bool) public moderators;
    mapping(address => uint256) public balances;
    mapping(address => uint256) public totalWithdrawals;
    mapping(address => uint256) public totalInvested;
    mapping(address => uint256) public totalReinvested;
    mapping(address => uint256) public totalReferralsIncome;
    mapping(address => uint256) public totalSponsorIncome;
    mapping(address => uint256) public totalUplineIncome;
    mapping(address => mapping(uint256 => address)) public downlines;
    mapping(address => uint256) public totalDownlines;
    mapping(address => uint256) public lastActiveTime;
    mapping(uint256 => uint256) public matrixLevelIncome;
    mapping(uint256 => uint256) public matrixLevelMemberCount;
    mapping(uint256 => uint256) public matrixLevelUpgradeFee;
    mapping(uint256 => uint256) public matrixLevelIncomePerMember;
    uint256[] public matrixLevelIds;
    uint256 public totalInvestors;
    uint256 public totalInvestment;
    uint256 public totalWithdrawal;
    uint256 public totalReinvestment;
    uint256 public totalReferrals;
    uint256 public totalSponsors;
    uint256 public totalUplines;
    uint256 public totalAdminWithdrawal;
    uint256 public constant ADMIN_FEE = 5;
    uint256 public constant REFERRAL_INCOME_PERCENT = 5;
    uint256 public constant SPONSOR_INCOME_PERCENT = 10;
    uint256 public constant UPLINE_INCOME_PERCENT = 10;
    uint256 public constant MATRIX_INCOME_PERCENT = 50;
    uint256 public constant TOTAL_INCOME = 1900;

    // Struct for storing plan details
    struct Plan {
        string name;
        uint256 basePrice;
        uint256 maxPurchaseQty;
        uint256 maxEarningsMultiplier;
        uint256 levelEarningsMultiplier;
        uint256[] dailyIncomePercentages;
        uint256[] directReferralBonuses;
        uint256[] levelIncomePercentages;
        uint256[] matrixBonuses;
        uint256 maxIncomeWithdrawalPercent;
        uint256 incomeWithdrawalInterval;
        uint256 planMaxSupply;
        uint256 entry;
        uint256 upgrade1;
        uint256 upgrade2;
        uint256 levelIncome1;
        uint256 levelIncome2;
        uint256 levelIncome3;
        uint256 upgradeFee1;
        uint256 upgradeFee2;
        uint256 turnover;
        uint256 income;
        uint256 sponsorCount;
        uint256 uplineCount;
        uint256 team;
    }
    
    // Array of plans
    Plan[] public plans;

    // Player struct
    struct Player {
        uint256[] activePlanIds;
        uint256[] inactivePlanIds;
        uint256[] referralCounts;
        uint256[] levelIncomeEarned;
        uint256[] matrixIncomeEarned;
        uint256[] incomeWithdrawalTimeStamps;
        uint256 totalInvested;
        uint256 totalWithdrawn;
        uint256 totalDirectReferralBonusEarned;
        uint256 totalLevelIncomeEarned;
        uint256 totalMatrixIncomeEarned;
        uint256 totalIncomeWithdrawn;
        uint256 totalReinvestment;
        uint256 lastSettledTime;
        address referrer;
        uint256 cycle;
        uint256 referrals;
        uint256 planCount;
        mapping(uint256 => Plan) plans;
        mapping(uint256 => Matrix) matrix;
        mapping(address => Referral) referralsReceived;
        mapping(address => Sponsor) sponsorsReceived;
        mapping(address => Upline) uplinesReceived;
    }
    
    // Mapping of player addresses to player information
    mapping(address => Player) public players;
    string[] public planNames;

    event Invest(address indexed user, uint256 amount);
    event Reinvest(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event ReferralIncome(address indexed user, address indexed referral, uint256 amount);
    event SponsorIncome(address indexed user, address indexed sponsor, uint256 amount);
    event UplineIncome(address indexed user, address indexed upline, uint256 amount);
    event MatrixIncome(address indexed user, uint256 amount);
    event Upgrade(address indexed user, string planName);
    event Register(address indexed user, address indexed sponsor);

  constructor() public {
        owner = msg.sender;
        admins[msg.sender] = true;
  }
 function addPlans() internal {
    // Add plans
    plans.push(Plan(
        "Global Matrix Income", 
        1, // levelLimit
        2, // matrixTotalLevels
        4, // x3MatrixLevels
        8, // x6MatrixLevels
        [30, 40, 60], // x3MatrixSlots
        [100, 200], // x6MatrixSlots
        [20, 100, 380], // x3MatrixAmounts
        [40, 60, 100], // x6MatrixAmounts
        100, // registrationCost
        5, // referralBonus
        1900 // maxWithdrawalPercent
    ));
    plans.push(Plan(
        "Silver Matrix Income",
        4,
        16,
        0,
        0,
        [100],
        [1600],
        [1300],
        [300],
        300,
        5,
        5700
    ));
    plans.push(Plan(
        "Gold Matrix Income",
        5,
        32,
        0,
        0,
        [300],
        [9600],
        [9000],
        [600],
        600,
        5,
        9000
    ));
    plans.push(Plan(
        "Royal Matrix Income",
        6,
        64,
        0,
        0,
        [600],
        [38400],
        [37200],
        [1200],
        1200,
        5,
        22800
    ));
    plans.push(Plan(
        "Diamond Matrix Income",
        7,
        128,
        0,
        0,
        [1200],
        [153600],
        [151110],
        [2500],
        2500,
        5,
        47500
    ));
    plans.push(Plan(
        "Crown Matrix Income",
        8,
        256,
        0,
        0,
        [2500],
        [640000],
        [635000],
        [5000],
        5000,
        5,
        95000
    ));
    plans.push(Plan(
        "Universal Matrix Income",
        9,
        512,
        0,
        0,
        [5000],
        [2560000],
        [2550000],
        [10000],
        10000,
        5,
        190000
    ));
  }
 
    function register(address sponsorAddress) public payable {
        require(msg.value == currentPackagePrice, "Incorrect Value");

        uint256 _referrerID = 0;
        uint256 _sponsorID = 0;
        bool _isPackageValid = false;

        ( _referrerID, _sponsorID, _isPackageValid ) = findReferrer(sponsorAddress);

        require(_isPackageValid, "Invalid Package");

        players[msg.sender].currentPackage = currentPackage;
        players[msg.sender].totalInvestment += currentPackagePrice;

        players[msg.sender].lastSettledTime = uint40(block.timestamp);

        players[msg.sender].id = lastUidId;

        pId[currentId] = msg.sender;
        idToAddress[lastUidId] = msg.sender;
        lastUidId++;

        Player storage player = players[msg.sender];
        player.referrer = _referrerID;
        player.sponsor = _sponsorID;

        address _upline = idToAddress[player.referrer];
        for(uint i = 0; i < refBoner.length; i++) {
            if(_upline == address(0)) break;
            players[_upline].referralIncome += (currentPackagePrice * refBoner[i]) / 100;
            _upline = idToAddress[players[_upline].referrer];
        }

        emit RegisterUserEvent(msg.sender, idToAddress[player.referrer], block.timestamp);
    }

    function buyNextPackage() external payable {
        require(players[msg.sender].currentPackage != LAST_PACKAGE, "You already have the highest package");

        uint256 _nextPackage = getNextPackagePrice(players[msg.sender].currentPackage);

        require(msg.value == _nextPackage, "Incorrect Value");

        currentPackagePrice = _nextPackage;
        currentPackage = packages[currentPackage + 1];

        register(idToAddress[players[msg.sender].referrer]);
    }

    function getNextPackagePrice(uint256 _currentPackage) private view returns (uint256) {
        for (uint i = 1; i <= LAST_PACKAGE; i++) {
            if (_currentPackage == packages[i]) {
                return packages[i + 1];
            }
        }
    }

    function findReferrer(address _sponsor) public view returns (uint256, uint256, bool) {
        bool _isPackageValid = false;
        uint256 _referrerID;
        uint256 _sponsorID;

        if (_sponsor == address(0)) {
            _referrerID = 0;
            _sponsorID = 0;
            _isPackageValid = true;
        } else {
            Player storage referrer = players[_sponsor];
            require(referrer.currentPackage != 0, "Incorrect Sponsor");
            _isPackageValid = referrer.currentPackage >= currentPackage;

            if (_isPackageValid) {
                _referrerID = referrer.id;
                _sponsorID = referrer.sponsor;
            }
        }

        if (!_isPackageValid) {
            _referrerID = players[address(this)].id;
            _sponsorID = players[address(this)].sponsor;
        }

        return (_referrerID, _sponsorID, _isPackageValid);
    }



  function buyLevel(uint8 matrix, uint8 level) external payable {
    require(msg.value == levelPrice[level], "Invalid amount");
    require(level > 1 && level <= LAST_LEVEL, "Invalid level");
    require(matrix == 1 || users[msg.sender].matrix == matrix - 1, "Invalid matrix");
    require(users[msg.sender].activeLevels[level] == false, "Level already activated");

    if (matrix > 1) {
        require(users[msg.sender].activeLevels[level-1] == true, "Please activate previous level");
    }

    if (users[msg.sender].activeMatrix.length == 0) {
        users[msg.sender].activeMatrix.push(1);
    }

    if (users[msg.sender].activeMatrix.length < matrix) {
        for (uint8 i = users[msg.sender].activeMatrix.length; i < matrix; i++) {
            users[msg.sender].activeMatrix.push(1);
        }
    }

    uint256 adminFee = msg.value.mul(adminPercent).div(100);
    address adminAddress = payable(admin);

    adminAddress.transfer(adminFee);

    uint256 refAmount;
    uint256 sponsorAmount;
    uint256 uplineAmount;
    uint256 matrixAmount;

    users[msg.sender].activeLevels[level] = true;
    users[msg.sender].matrix = matrix;

    address upline = findUpline(msg.sender, matrix);

    if (upline != address(0)) {
        refAmount = msg.value.mul(refPercent).div(100);
        sponsorAmount = msg.value.mul(sponsorPercent).div(100);
        uplineAmount = msg.value.mul(uplinePercent).div(100);
        matrixAmount = msg.value.mul(matrixPercent[level]).div(100);

        users[upline].totalRefBonus = users[upline].totalRefBonus.add(refAmount);
        users[upline].totalSponsorBonus = users[upline].totalSponsorBonus.add(sponsorAmount);
        users[upline].totalUplineBonus = users[upline].totalUplineBonus.add(uplineAmount);

        users[upline].activeMatrixAmount = users[upline].activeMatrixAmount.add(matrixAmount);

        if (matrix == 1) {
            updateGlobalMatrix(upline, matrixAmount);
        } else {
            address uplineMatrix = findUplineMatrix(upline, matrix-1, 1);
            if (uplineMatrix != address(0)) {
                updateMatrix(uplineMatrix, matrix, matrixAmount);
            }
        }

        emit NewUserPlace(msg.sender, upline, matrix, level, now);
        emit UplineIncome(upline, msg.sender, matrix, uplineAmount, now);
        emit ReferralIncome(msg.sender, upline, refAmount, now);
        emit SponsorIncome(msg.sender, sponsorAmount, now);
        emit MatrixIncome(msg.sender, matrixAmount, matrix, level, now);
    } else {
        matrixAmount = msg.value.mul(matrixPercent[level]).div(100);

        users[admin].activeMatrixAmount = users[admin].activeMatrixAmount.add(matrixAmount);

        if (matrix == 1) {
            updateGlobalMatrix(admin, matrixAmount);
        }

        emit NewUserPlace(msg.sender, address(0), matrix, level, now);
        emit MatrixIncome(msg.sender, matrixAmount, matrix, level, now);
    }
  }
  function upgrade(uint _matrix, uint _level) public payable {
        require(_matrix >= 1 && _matrix <= LAST_LEVEL, "Invalid matrix");
        require(_level > 1 && _level <= 9, "Invalid level");
        require(msg.value == levelPrice[_level].upgrade, "Invalid amount");

        uint earnings = updateMatrix(msg.sender, _matrix, _level);
        uint adminFee = (levelPrice[_level].upgrade * 5) / 100;
        admin.transfer(adminFee);
        emit Upgrade(msg.sender, _matrix, _level, earnings);
  }
  function withdraw() public {
        User storage user = users[msg.sender];
        uint256 totalAmount = getUserDividends(msg.sender);
        require(totalAmount > 0, "No dividends available for withdrawal");
        uint256 contractBalance = address(this).balance;
        if (contractBalance < totalAmount) {
            totalAmount = contractBalance;
        }
        user.totalWithdrawn = user.totalWithdrawn.add(totalAmount);
        user.withdrawnAt = block.timestamp;
        msg.sender.transfer(totalAmount);
        emit Withdraw(msg.sender, totalAmount);
    }

    function withdrawableDividends(address userAddress) public view returns (uint256) {
        return getUserDividends(userAddress);
    }
  } 
    function reinvest() public {
        User storage user = users[msg.sender];
        uint256 totalAmount = getUserDividends(msg.sender);
        require(totalAmount > 0, "No dividends available for reinvestment");
        user.totalReinvested = user.totalReinvested.add(totalAmount);
        uint256 availableBalance = getUserAvailableBalance(msg.sender);
        require(availableBalance >= totalAmount, "Insufficient available balance for reinvestment");
        user.referralBonus = 0;
        user.lastReinvestedAt = block.timestamp;
        user.paidAt = block.timestamp;
        buyLevel(msg.sender, user.currentLevel, totalAmount);
        emit Reinvest(msg.sender, totalAmount);
    }
    
    function totalUsers() public view returns (uint256) {
        return userAddresses.length;
    }
    
    function contractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function setOwner(address _newOwner) public onlyOwner {
        require(_newOwner != address(0), "Invalid owner address");
        owner = _newOwner;
    }

    function setFeePercentage(uint256 _feePercentage) public onlyOwner {
        require(_feePercentage >= 0 && _feePercentage <= 100, "Invalid fee percentage");
        feePercentage = _feePercentage;
    }

    function setReentry(uint8 _reentry) public onlyOwner {
        reentry = _reentry;
    }

    function setUpgradeFees(uint256[] memory _upgradeFees) public onlyOwner {
        upgradeFees = _upgradeFees;
    }

    function setLevelIncome(uint256[] memory _levelIncome) public onlyOwner {
        levelIncome = _levelIncome;
    }

    function setMatrixIncome(uint256[] memory _matrixIncome) public onlyOwner {
        matrixIncome = _matrixIncome;
    }

    function setEntryFees(uint256[] memory _entryFees) public onlyOwner {
        entryFees = _entryFees;
    }

    function setMatrixCount(uint8 _matrixCount) public onlyOwner {
        matrixCount = _matrixCount;
    }

    function setMatrixDepth(uint8 _matrixDepth) public onlyOwner {
        matrixDepth = _matrixDepth;
    }

    function setMatrixBonus(uint256[] memory _matrixBonus) public onlyOwner {
        matrixBonus = _matrixBonus;
    }

    function setReferralBonus(uint256 _referralBonus) public onlyOwner {
        referralBonus = _referralBonus;
    }

    function setAdminFee(uint256 _adminFee) public onlyOwner {
        adminFee = _adminFee;
    }

    function contractBalance() public view returns (uint256) {
        return address(this).balance;
    }
    // fallback() external payable {
    //     buyLevel(1);
    // }
    /**
     * @dev Transfer balance to admin
     */
    function withdrawAdminFee(uint256 amount) external {
        require(msg.sender == admin, "Only admin can call this function.");
        require(amount <= address(this).balance, "Insufficient balance.");
        admin.transfer(amount);
    }

    /**
     * @dev View the number of direct referrals for an address.
     */
    function getReferralCount(address _addr) external view returns (uint256) {
        return players[_addr].referrals.length;
    }

    /**
     * @dev View the total number of players in the contract.
     */
    function getTotalPlayers() external view returns (uint256) {
        return playersArray.length;
    }

    /**
     * @dev View the user's level information.
     */
    function getUserLevel(address _addr) external view returns (uint256, uint256, uint256) {
        return (players[_addr].levelMatrix, players[_addr].currentMatrix, players[_addr].matrixExpires);
    }

    function _isUserExists(address _user) private view returns(bool) {
        return (users[_user].id != 0);
    }
}