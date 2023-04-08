// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MLM {
    uint256 constant public INVEST_MIN_AMOUNT = 1 ether;
    uint256 constant public BASE_PERCENT = 10;
    uint256[] public REFERRAL_PERCENTAGES = [50, 30, 20, 10, 5, 5, 5];
    uint256 constant public MARKETING_FEE_PERCENTAGE = 50;
    uint256 constant public ADMIN_FEE_PERCENTAGE = 5;

    address public marketingAddress;
    address public adminAddress = 0xAa2c4B564DAaDf8216540cF798971C705f42E530;

    struct Investor {
        uint256 plan;
        uint256 balance;
        uint256 lastPayout;
        uint256[] referrals;
        address referrer;
        uint256 uplineBonus;
        uint256[7] matrixBonus;
    }

    mapping(address => Investor) public investors;
    mapping(uint256 => address) public idToAddress;
    uint256 public lastUserId = 2;
    uint256 public totalInvestments = 0;
    uint256 public totalInvested = 0;

    event Deposit(address indexed investor, uint256 amount);
    event Withdrawn(address indexed investor, uint256 amount);
    event ReferralCommissionPaid(address indexed referrer, address indexed investor, uint256 amount);
    event MatrixBonusPaid(address indexed investor, uint256 amount, uint8 level);
    event AdminFeePaid(address indexed sender, uint256 amount);

    constructor(address _marketingAddress) {
        marketingAddress = _marketingAddress;

        investors[marketingAddress].plan = 1;
        investors[marketingAddress].balance = type(uint256).max;
        idToAddress[1] = marketingAddress;
    }

    function invest(uint256 _plan, address _referrer) public payable {
        require(_plan >= 1 && _plan <= 7, "Invalid plan");
        require(msg.value >= INVEST_MIN_AMOUNT, "Minimum investment amount is 1 ETH");

        Investor storage investor = investors[msg.sender];

        require(investor.plan == 0, "Investor already exists");

        investor.plan = _plan;
        investor.balance = msg.value;
        investor.lastPayout = block.timestamp;
        investor.referrer = _referrer;

        address upline = investor.referrer;
        for (uint256 i = 0; i < REFERRAL_PERCENTAGES.length; i++) {
            if (upline == address(0)) {
                break;
            }

            investors[upline].referrals.push(msg.sender);

            upline = investors[upline].referrer;
        }

        idToAddress[lastUserId] = msg.sender;
        investor.matrixBonus[0] = lastUserId;
        lastUserId++;

        totalInvestments++;
        totalInvested += msg.value;

        payMarketingFee(msg.value);
        payReferralCommission(investor.referrer, msg.value);

        emit Deposit(msg.sender, msg.value);
    }

    function payMarketingFee(uint256 _amount) internal {
        uint256 marketingFee = (_amount * MARKETING_FEE_PERCENTAGE) / 1000;

        address payable marketing = payable(marketingAddress);
        marketing.transfer(marketingFee);

        uint256 adminFee = (_amount * ADMIN_FEE_PERCENTAGE) / 100;
        address payable admin = payable(adminAddress);
        admin.transfer(adminFee);

        emit AdminFeePaid(msg.sender, adminFee);
    }

    function payReferralCommission(address _referral, uint256 _amount) internal {
    address upline = _referral;
    for (uint256 i = 0; i < REFERRAL_PERCENTAGES.length; i++) {
        if (upline == address(0)) {
            break;
        }

        uint256 amount = (_amount * REFERRAL_PERCENTAGES[i]) / 100;

        investors[upline].uplineBonus += amount;

        emit ReferralCommissionPaid(upline, msg.sender, amount);

        upline = investors[upline].referrer;
    }
}

function withdraw() public {
    Investor storage investor = investors[msg.sender];

    uint256 dividends = getDividends(msg.sender);

    uint256 referralBonus = investor.uplineBonus;
    investor.uplineBonus = 0;

    uint256 matrixBonus = getTotalMatrixBonus(msg.sender);
    if (matrixBonus > 0) {
        investor.matrixBonus = [0, 0, 0, 0, 0, 0, 0];
    }

    uint256 withdrawAmount = dividends + referralBonus + matrixBonus;

    require(withdrawAmount > 0, "Nothing to withdraw");

    investor.lastPayout = block.timestamp;
    investor.balance -= withdrawAmount;

    (bool success, ) = msg.sender.call{value: withdrawAmount}("");
    require(success, "Failed to transfer funds");

    emit Withdrawn(msg.sender, withdrawAmount);
}

function getDividends(address _address) public view returns (uint256) {
    Investor storage investor = investors[_address];

    uint256 plan = investor.plan;
    uint256 balance = investor.balance;
    uint256 lastPayout = investor.lastPayout;

    uint256 timeMultiplier = (block.timestamp - lastPayout) / 1 days;
    uint256 percentage = BASE_PERCENT + (plan - 1) * 5;

    uint256 dailyProfit = (balance * percentage) / 1000;
    uint256 dividends = dailyProfit * timeMultiplier;

    return dividends;
}

function getTotalMatrixBonus(address _address) public view returns (uint256) {
    Investor storage investor = investors[_address];

    uint256[] memory referrals = investor.referrals;

    uint256 totalBonus = 0;

    for (uint8 i = 0; i < referrals.length && i < 7; i++) {
        uint256 referralMatrixBonus = getReferralMatrixBonus(referrals[i], i + 1);
        totalBonus += referralMatrixBonus;

        emit MatrixBonusPaid(referrals[i], referralMatrixBonus, i + 1);
    }

    return totalBonus;
}

function getReferralMatrixBonus(address _address, uint8 _level) public view returns (uint256) {
    Investor storage investor = investors[_address];
    uint256[] memory matrixBonus = investor.matrixBonus;

    if (matrixBonus[_level - 1] == 0 || matrixBonus[_level - 1] == type(uint256).max) {
        return 0;
    }

    uint256 bonus = ((investors[idToAddress[matrixBonus[_level - 1]]].balance * 5) / 100);

    return bonus;
}

function getInvestorReferrals(address _address) public view returns (uint256[] memory) {
    Investor storage investor = investors[_address];

    return investor.referrals;
}

function getInvestorMatrixBonus(address _address) public view returns (uint256[7] memory) {
    Investor storage investor = investors[_address];

    return investor.matrixBonus;
}

function setAdminAddress(address _adminAddress) public {
    require(msg.sender == owner, "Only owner can set admin address");
adminAddress = _adminAddress;
}

function setPlanPrice(uint256 _plan, uint256 _price) public {
    require(msg.sender == owner, "Only owner can set plan price");
    planPrice[_plan] = _price;
}

function setReferralPercentage(uint256[] memory _referralPercentages) public {
    require(msg.sender == owner, "Only owner can set referral percentages");
    REFERRAL_PERCENTAGES = _referralPercentages;
}

function getContractBalance() public view returns (uint256) {
    return address(this).balance;
}

function getInvestorInfo(address _address) public view returns (uint256, uint256, uint256, uint256, uint256, uint256, uint256[7] memory, uint256) {
    Investor storage investor = investors[_address];

    return (
        investor.plan,
        investor.balance,
        investor.lastPayout,
        investor.uplineBonus,
        investor.matrixSize,
        investor.matrixBonusSum,
        investor.matrixBonus,
        investor.referrerCode
    );
}

function setReferrerCode(uint256 _code) public {
    Investor storage investor = investors[msg.sender];
    require(investor.referrerCode == 0, "Referrer code is already set");

    investor.referrerCode = _code;
    codeToAddress[_code] = msg.sender;
}

function useReferrerCode(uint256 _code) public {
    Investor storage investor = investors[msg.sender];
    require(investor.plan == 0, "User is already registered");

    address referrerAddress = codeToAddress[_code];
    require(referrerAddress != address(0), "Invalid referrer code");

    Investor storage referrer = investors[referrerAddress];
    require(referrer.plan > 0, "Referrer does not have an active plan");

    investor.referrer = referrerAddress;
    referrer.referrals.push(investor.id);

    emit ReferrerUsed(msg.sender, referrerAddress);
}


function invest(uint256 _plan, uint256 _referrerCode) public payable {
    require(_plan > 0 && _plan <= 7, "Invalid plan");
    require(msg.value == planPrice[_plan], "Invalid amount");

    Investor storage investor = investors[msg.sender];
    require(investor.plan == 0, "Investor already has an active plan");

    uint256 contractBalance = address(this).balance;
    require(contractBalance > 0, "Contract balance is zero");

    uint256 adminPercentage = (msg.value * ADMIN_PERCENTAGE) / 100;
    uint256 amount = msg.value - adminPercentage;

    owner.transfer(adminPercentage);

    investor.plan = _plan;
    investor.balance = amount;
    investor.lastPayout = block.timestamp;

    if (_referrerCode > 0 && _referrerCode != investor.referrerCode) {
        Investor storage referrer = investors[codeToAddress[_referrerCode]];
        if (referrer.plan > 0) {
            investor.referrer = codeToAddress[_referrerCode];
            referrer.referrals.push(investor.id);

            uint256[] memory refPercentages = REFERRAL_PERCENTAGES;
            for (uint256 i = 0; i < refPercentages.length; i++) {
                uint256 bonusPercentage = refPercentages[i];
                uint256 bonus = (amount * bonusPercentage) / 100;

                referrer.uplineBonus += bonus;
                amount -= bonus;

                if (referrer.referrer == address(0)) {
                    break;
                }

                referrer = investors[referrer.referrer];
            }
        }
    }

    totalInvestments[_plan] += amount;
    totalInvestors++;

    emit NewInvestment(msg.sender, amount, _plan);
}

function withdraw() public {
    Investor storage investor = investors[msg.sender];
    require(investor.balance > 0, "Investor has no balance to withdraw");

    uint256 payout = this.payoutOf(msg.sender);

    investor.lastPayout = block.timestamp;
    investor.balance = 0;

    msg.sender.transfer(payout);

    emit Withdrawn(msg.sender, payout);
}

function reinvest() public {
    Investor storage investor = investors[msg.sender];
    require(investor.balance > 0, "Investor has no balance to reinvest");

    uint256 payout = this.payoutOf(msg.sender);

    investor.lastPayout = block.timestamp;
    investor.balance = 0;

    this.invest(investor.plan, investor.referrerCode);

    emit Reinvested(msg.sender, payout);
}

function payoutOf(address _address) public view returns (uint256 payout) {
    Investor storage investor = investors[_address];

    uint256 plan = investor.plan;
    uint256 depositAmount = investor.balance;
    uint256 depositDate = investor.lastPayout;
    uint256 percent = percentFor(plan);

    uint256 finish = depositDate + DAILY_ROI_PERIOD;
    uint256 since = depositDate;

    while (since < block.timestamp) {
        uint256 till = finish < block.timestamp ? finish : block.timestamp;
        uint256 diff = till - since;
        uint256 dailyPayout = (depositAmount * percent * diff) / (100 * DAILY_ROI_PERIOD);
        payout += dailyPayout;
        since = till;
    }

    uint256 matrixPayout = matrixPayoutOf(_address);
    uint256 totalPayout = payout + matrixPayout + investor.uplineBonus;

    return totalPayout;
}

function matrixPayoutOf(address _address) public view returns (uint256 payout) {
    Investor storage investor = investors[_address];
    uint256 matrixBonus = investor.matrixBonus;
    if (matrixBonus > 0) {
        uint256 matrixPlan = investor.matrixPlan;
        uint256 percent = matrixPercentFor(matrixPlan);
        uint256 maxPayout = totalInvestments[matrixPlan] * MAX_MATRIX_PAYOUT_PERCENTAGE / 100;

        Investor storage upline = investors[investor.referrer];
        uint256 level = 1;

        while (upline.plan > 0 && level <= MATRIX_DEPTH) {
            uint256 bonus = matrixBonus * percent / 100;

            if (upline.matrixBonus + bonus <= maxPayout) {
                upline.matrixBonus += bonus;
                payout += bonus;
            } else {
                bonus = maxPayout - upline.matrixBonus;
                upline.matrixBonus = maxPayout;
                payout += bonus;
                break;
            }

            upline = investors[upline.referrer];
            level++;
        }
    }

    return payout;
}

function percentFor(uint256 _plan) public view returns (uint256) {
    return PLANS[_plan];
}

function matrixPercentFor(uint256 _matrixPlan) public view returns (uint256) {
    return MATRIX_PLANS[_matrixPlan];
}

function setOwner(address payable _owner) public onlyOwner {
    owner = _owner;
}

function setPrice(uint256 _plan, uint256 _price) public onlyOwner {
    planPrice[_plan] = _price;
}

function setMatrixPrice(uint256 _matrixPlan, uint256 _price) public onlyOwner {
    matrixPlanPrice[_matrixPlan] = _price;
}

function setMaxMatrixPayoutPercentage(uint256 _percentage) public onlyOwner {
    MAX_MATRIX_PAYOUT_PERCENTAGE = _percentage;
}

function setReferralPercentages(uint256[] memory _percentages) public onlyOwner {
    require(_percentages.length == REFERRAL_PERCENTAGES.length, "Invalid number of percentages");
    REFERRAL_PERCENTAGES = _percentages;
}

function setMatrixDepths(uint256[] memory _depths) public onlyOwner {
    require(_depths.length == MATRIX_DEPTHS.length, "Invalid number of depths");
    MATRIX_DEPTHS = _depths;
}

function setMatrixPlanPercentages(uint256[] memory _percentages) public onlyOwner {
    require(_percentages.length == MATRIX_PLAN_PERCENTAGES.length, "Invalid number of percentages");
    MATRIX_PLAN_PERCENTAGES = _percentages;
}

function setDailyROI(uint256 _roi) public onlyOwner {
    DAILY_ROI_PERCENTAGE = _roi;
    DAILY_ROI_PERIOD = 1 days * 100 / _roi;
}

function setAdminPercentage(uint256 _percentage) public onlyOwner {
    ADMIN_PERCENTAGE = _percentage;
}

function totalInvestmentsFor(uint256 _plan) public view returns (uint256) {
    return totalInvestments[_plan];
}

function totalInvestors() public view returns (uint256) {
    return totalInvestors;
}

function totalInvestments() public view returns (uint256) {
    uint256 total = 0;
    for (uint256 i = 1; i <= 7; i++) {
        total += totalInvestments[i];
    }
    return total;
}

function investorInfo(address _address) public view returns (uint256 plan, uint256 balance, uint256 lastPayout, uint256 referrerCode, address referrer, uint256 matrixPlan, uint256 matrixBonus, uint256 uplineBonus) {
    Investor storage investor = investors[_address];
    plan = investor.plan;
    balance = investor.balance;
    last
    payout = calculatePayout(msg.sender);

    uint256 adminFee = payout * ADMIN_PERCENTAGE / 100;

    payout -= adminFee;

    totalPayouts += payout;

    msg.sender.transfer(payout);

    owner.transfer(adminFee);

    investor.lastPayout = block.timestamp;

    investor.balance += payout;

    totalReinvestments += payout;

    emit Payout(msg.sender, payout);
}

function reinvest(uint256 _plan) external payable {
    require(_plan >= 1 && _plan <= 7, "Invalid plan");

    Investor storage investor = investors[msg.sender];

    require(investor.plan == _plan, "Invalid plan");
    require(msg.value >= planPrice[_plan], "Invalid amount");

    uint256 amount = msg.value;

    if (now >= investor.lastPayout + DAILY_ROI_PERIOD) {
        uint256 daysSinceLastPayout = (now - investor.lastPayout) / DAILY_ROI_PERIOD;
        uint256 roi = investor.balance * daysSinceLastPayout * DAILY_ROI_PERCENTAGE / 10000;
        amount += roi;
    }

    investor.balance += amount;
    investor.lastPayout = block.timestamp;

    totalReinvestments += amount;

    emit Reinvestment(msg.sender, amount);
}

function withdrawable(address _address) public view returns (uint256) {
    return calculatePayout(_address);
}

function matrix(address _address) public view returns (address[] memory) {
    address[] memory referrals = new address[](MATRIX_WIDTH);
    address currentReferrer = _address;

    for (uint256 i = 0; i < MATRIX_WIDTH; i++) {
        if (currentReferrer == address(0)) {
            break;
        }
        referrals[i] = currentReferrer;
        currentReferrer = investors[currentReferrer].matrixReferrer;
    }

    return referrals;
}

function setMatrixReferrer(address _matrixReferrer) external {
    require(_matrixReferrer != address(0), "Invalid referrer");

    Investor storage investor = investors[msg.sender];

    require(investor.matrixReferrer == address(0), "Matrix referrer already set");

    investor.matrixReferrer = _matrixReferrer;

    address currentReferrer = _matrixReferrer;

    for (uint256 i = 0; i < MATRIX_DEPTH; i++) {
        if (currentReferrer == address(0)) {
            break;
        }

        Investor storage referrer = investors[currentReferrer];

        if (referrer.matrixReferrals.length < MATRIX_WIDTH) {
            referrer.matrixReferrals.push(msg.sender);
            emit NewMatrixReferral(currentReferrer, msg.sender, referrer.matrixReferrals.length);
            break;
        }

        currentReferrer = referrer.matrixReferrals[rand() % MATRIX_WIDTH];
    }
}

function getMatrixReferrals(address _address) public view returns (address[] memory) {
    return investors[_address].matrixReferrals;
}

function calculatePayout(address _address) internal view returns (uint256) {
    Investor storage investor = investors[_address];

    uint256 payout = 0;

    if (investor.plan > 0) {
        uint256 daysSinceLastPayout = (now - investor.lastPayout) / DAILY_ROI_PERIOD;
        uint256 roi = investor.balance * daysSinceLastPayout * DAILY_ROI_PERCENTAGE / 10000;

        payout += roi;

        if (investor.referrer != address(0)) {
            uint256 referralBonus = payout * REFERRAL_PERCENTAGE / 100;

            payout += referralBonus;

            investors[investor.referrer].totalReferralBonus += referralBonus;

            emit ReferralPayout(investor.referrer, _address, referralBonus);
        }

        if (investor.sponsor != address(0)) {
            uint256 sponsorBonus = payout * SPONSOR_PERCENTAGE / 100;

            payout += sponsorBonus;

            investors[investor.sponsor].totalSponsorBonus += sponsorBonus;

            emit SponsorPayout(investor.sponsor, _address, sponsorBonus);
        }

        if (investor.upline != address(0)) {
            uint256 uplineBonus = payout * UPLINE_PERCENTAGE / 100;

            payout += uplineBonus;

            investors[investor.upline].totalUplineBonus += uplineBonus;

            emit UplinePayout(investor.upline, _address, uplineBonus);
        }

        uint256 matrixBonus = calculateMatrixBonus(_address);

        if (matrixBonus > 0) {
            payout += matrixBonus;
        }
    }

    return payout;
}

function calculateMatrixBonus(address _address) internal view returns (uint256) {
    Investor storage investor = investors[_address];

    uint256 bonus = 0;

    for (uint256 i = 0; i < investor.matrixReferrals.length; i++) {
        address ref = investor.matrixReferrals[i];

        if (ref != address(0)) {
            Investor storage referrer = investors[ref];

            uint256 refBonus = MATRIX_PERCENTAGE * investor.balance / 100;

            bonus += refBonus;

            emit MatrixPayout(ref, _address, refBonus);

            if (referrer.matrixReferrals.length >= MATRIX_WIDTH) {
                for (uint256 j = 0; j < MATRIX_WIDTH; j++) {
                    address matrixRef = referrer.matrixReferrals[j];

                    if (matrixRef != address(0)) {
                        bonus += refBonus / MATRIX_WIDTH;

                        emit
                    MatrixPayout(matrixRef, _address, refBonus / MATRIX_WIDTH);
                    }
                }
            }
        }
    }

    return bonus;
}

function withdraw() external {
    Investor storage investor = investors[msg.sender];

    require(investor.balance > 0, "Insufficient balance");

    uint256 payout = calculatePayout(msg.sender);

    require(payout > 0, "Nothing to withdraw");

    uint256 adminFee = payout * ADMIN_PERCENTAGE / 100;

    uint256 totalAmount = payout - adminFee;

    investor.balance += totalAmount;

    investor.lastPayout = now;

    totalWithdrawn += totalAmount;

    totalAdminFee += adminFee;

    payable(msg.sender).transfer(totalAmount);

    payable(owner).transfer(adminFee);

    emit Withdrawal(msg.sender, totalAmount);

    emit AdminFee(totalAmount, adminFee);
}

function reinvest() external {
    Investor storage investor = investors[msg.sender];

    require(investor.balance > 0, "Insufficient balance");

    uint256 payout = calculatePayout(msg.sender);

    require(payout > 0, "Nothing to reinvest");

    investor.balance += payout;

    investor.lastPayout = now;

    emit Reinvestment(msg.sender, payout);
}

function transfer(address _to, uint256 _amount) external {
    Investor storage investor = investors[msg.sender];

    require(_to != address(0), "Invalid address");
    require(_amount > 0, "Invalid amount");
    require(investor.balance >= _amount, "Insufficient balance");

    investor.balance -= _amount;
    investors[_to].balance += _amount;

    emit Transfer(msg.sender, _to, _amount);
}

function getInvestorInfo(address _address) public view returns (uint256, uint256, uint256, address, address, address, uint256, uint256, uint256, uint256, address[] memory) {
    Investor storage investor = investors[_address];

    return (
        investor.balance,
        investor.totalInvested,
        investor.totalWithdrawn,
        investor.referrer,
        investor.sponsor,
        investor.upline,
        investor.lastPayout,
        investor.matrixReferrer == address(0) ? 0 : investors[investor.matrixReferrer].totalInvested,
        investor.totalReferralBonus,
        investor.totalSponsorBonus,
        investor.matrixReferrals
    );
}

function getContractInfo() public view returns (uint256, uint256, uint256, uint256, uint256, uint256, uint256, uint256) {
    return (
        INVEST_MIN_AMOUNT,
        REFERRAL_PERCENTAGE,
        SPONSOR_PERCENTAGE,
        UPLINE_PERCENTAGE,
        DAILY_ROI_PERCENTAGE,
        DAILY_ROI_PERIOD,
        MATRIX_PERCENTAGE,
        MATRIX_DEPTH
    );
}

function getStats() public view returns (uint256, uint256, uint256, uint256, uint256) {
    return (
        totalInvested,
        totalWithdrawn,
        address(this).balance,
        totalAdminFee,
        totalParticipants
    );
}

function rand() internal view returns (uint256) {
    return uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, investors[msg.sender].totalInvested))) % MATRIX_WIDTH;
}

