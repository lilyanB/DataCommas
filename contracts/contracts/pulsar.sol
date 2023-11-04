// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Pulsar
 * @dev A smart contract for managing user subscriptions to different levels (Free, Investor, Trader) using USDC.
 */
contract Pulsar is Ownable {
    IERC20 public usdcToken;

    enum SubscriptionLevel {
        Free,
        Investor,
        Trader
    }

    // Mapping to track users' subscription levels
    mapping(address => SubscriptionLevel) public userSubscriptions;

    uint256 public monthlyPriceInvestor = 5 * 1e6; // Monthly subscription price for Investor level (in USDC with 6 decimals)
    uint256 public monthlyPriceTrader = 9 * 1e6; // Monthly subscription price for Trader level (in USDC with 6 decimals)

    // Array to store subscriber addresses
    address[] public subscribers;

    /**
     * @dev Modifier to restrict access to functions to subscribers only.
     */
    modifier onlySubscriber() {
        require(
            userSubscriptions[msg.sender] != SubscriptionLevel.Free,
            "You are not a subscriber"
        );
        _;
    }

    /**
     * @dev Constructor to initialize the contract with the address of the USDC token contract.
     * @param _usdcTokenAddress Address of the USDC token contract.
     */
    constructor(address _usdcTokenAddress) Ownable(msg.sender) {
        usdcToken = IERC20(_usdcTokenAddress);
    }

    /**
     * @dev Allows a user to subscribe to a particular level (Investor or Trader) by paying the monthly fee in USDC.
     * @param level The subscription level the user wants to subscribe to.
     */
    function subscribe(SubscriptionLevel level) external {
        require(
            level != SubscriptionLevel.Free,
            "Free subscription is not allowed"
        );
        require(
            userSubscriptions[msg.sender] == SubscriptionLevel.Free,
            "Already subscribed"
        );

        uint256 monthlyPrice = (level == SubscriptionLevel.Investor)
            ? monthlyPriceInvestor
            : monthlyPriceTrader;

        // Transfer the monthly fee in USDC from the user to this contract
        require(
            usdcToken.transferFrom(msg.sender, address(this), monthlyPrice),
            "USDC transfer failed"
        );

        // Set the user's subscription level and add them to the list of subscribers
        userSubscriptions[msg.sender] = level;
        subscribers.push(msg.sender);
    }

    /**
     * @dev Allows a subscriber to unsubscribe and change their subscription level to Free.
     */
    function unsubscribe() external onlySubscriber {
        userSubscriptions[msg.sender] = SubscriptionLevel.Free;

        // Remove the unsubscribed user from the list of subscribers
        for (uint256 i = 0; i < subscribers.length; i++) {
            if (subscribers[i] == msg.sender) {
                subscribers[i] = subscribers[subscribers.length - 1];
                subscribers.pop();
                break;
            }
        }
    }

    /**
     * @dev Allows the owner to collect the monthly payments from all subscribers.
     */
    function collectPayments() external onlyOwner {
        for (uint256 i = 0; i < subscribers.length; i++) {
            address subscriber = subscribers[i];
            SubscriptionLevel level = userSubscriptions[subscriber];
            uint256 monthlyPrice = (level == SubscriptionLevel.Investor)
                ? monthlyPriceInvestor
                : monthlyPriceTrader;

            // Transfer the monthly fee in USDC from this contract to the owner
            require(
                usdcToken.transfer(owner(), monthlyPrice),
                "USDC transfer to owner failed"
            );
        }
    }

    /**
     * @dev Allows the owner to set the monthly subscription price for the Investor level.
     * @param price New monthly subscription price for the Investor level (in USDC with 6 decimals).
     */
    function setMonthlyPriceInvestor(uint256 price) external onlyOwner {
        monthlyPriceInvestor = price;
    }

    /**
     * @dev Allows the owner to set the monthly subscription price for the Trader level.
     * @param price New monthly subscription price for the Trader level (in USDC with 6 decimals).
     */
    function setMonthlyPriceTrader(uint256 price) external onlyOwner {
        monthlyPriceTrader = price;
    }

    /**
     * @dev Allows the owner to change the address of the USDC token contract.
     * @param _usdcTokenAddress New address of the USDC token contract.
     */
    function setUsdcTokenAddress(address _usdcTokenAddress) external onlyOwner {
        usdcToken = IERC20(_usdcTokenAddress);
    }

    /**
     * @dev Returns the list of subscriber addresses.
     * @return An array of subscriber addresses.
     */
    function getSubscribers() external view returns (address[] memory) {
        return subscribers;
    }
}
