// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Polls {
    enum PollStatus {
        Upcoming,
        Open,
        Ended,
        Cancelled
    }

    enum PollResultVisibility {
        Always,
        AfterVote,
        AfterEnd,
        Never
    }

    struct PollSettings {
        bool multiChoice; // Allows voting for multiple different options
        bool noDeadline; // Poll starts immediately and never ends
        PollResultVisibility resultVisibility;
    }

    struct Poll {
        string title;
        string description;
        address creator;
        uint256 startsAt;
        uint256 endsAt;
        string[] options;
        PollStatus internalStatus;
        uint256 totalVotes; // Total number of votes (selections)
        uint256 uniqueVoters; // Total number of participants
        PollSettings settings;
    }

    Poll[] public polls;
    // pollId => optionIndex => voteCount
    mapping(uint256 => mapping(uint256 => uint256)) public pollOptionVotes;
    // pollId => voterAddress => hasVotedAny
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    // pollId => voterAddress => optionIndex => hasVotedSpecificOption
    mapping(uint256 => mapping(address => mapping(uint256 => bool)))
        public hasVotedOption;
    // creatorAddress => pollIds
    mapping(address => uint256[]) public userPolls;

    event PollCreated(uint256 indexed pollId, string title, address creator);
    event VoteCast(
        uint256 indexed pollId,
        uint256 indexed optionIndex,
        address voter
    );
    event PollCancelled(uint256 indexed pollId);

    error PollNotActive();
    error PollAlreadyEnded();
    error PollNotStarted();
    error AlreadyVoted();
    error InvalidOption();
    error Unauthorized();
    error InvalidDates();
    error MinTwoOptionsRequired();
    error NoVotesCast();

    error PollResultVisibleAfterVote();
    error PollResultVisibleAfterEnd();
    error PollResultNeverVisible();

    function createPoll(
        string memory _title,
        string memory _description,
        uint256 _startsAt,
        uint256 _endsAt,
        string[] memory _options,
        PollSettings memory _settings
    ) external returns (uint256) {
        if (!_settings.noDeadline) {
            if (_startsAt >= _endsAt) revert InvalidDates();
            if (_endsAt <= block.timestamp) revert InvalidDates();
        }
        if (_options.length < 2) revert MinTwoOptionsRequired();

        uint256 pollId = polls.length;

        Poll storage newPoll = polls.push();
        newPoll.title = _title;
        newPoll.description = _description;
        newPoll.creator = msg.sender;
        newPoll.options = _options;
        newPoll.internalStatus = PollStatus.Upcoming;
        newPoll.totalVotes = 0;
        newPoll.uniqueVoters = 0;
        newPoll.settings = _settings;

        if (_settings.noDeadline) {
            newPoll.startsAt = block.timestamp;
            newPoll.endsAt = 0;
        } else {
            newPoll.startsAt = _startsAt;
            newPoll.endsAt = _endsAt;
        }

        userPolls[msg.sender].push(pollId);

        emit PollCreated(pollId, _title, msg.sender);
        return pollId;
    }

    function getStatus(uint256 _pollId) public view returns (PollStatus) {
        if (_pollId >= polls.length) revert Unauthorized();
        Poll storage poll = polls[_pollId];

        if (poll.internalStatus == PollStatus.Cancelled)
            return PollStatus.Cancelled;
        if (poll.settings.noDeadline) return PollStatus.Open;

        if (block.timestamp < poll.startsAt) return PollStatus.Upcoming;
        if (block.timestamp <= poll.endsAt) return PollStatus.Open;
        return PollStatus.Ended;
    }

    function vote(uint256 _pollId, uint256 _optionIndex) external {
        if (_pollId >= polls.length) revert Unauthorized();
        PollStatus currentStatus = getStatus(_pollId);

        if (currentStatus == PollStatus.Cancelled) revert PollNotActive();
        if (currentStatus == PollStatus.Upcoming) revert PollNotStarted();
        if (currentStatus == PollStatus.Ended) revert PollAlreadyEnded();

        Poll storage poll = polls[_pollId];
        if (_optionIndex >= poll.options.length) revert InvalidOption();

        if (poll.settings.multiChoice) {
            if (hasVotedOption[_pollId][msg.sender][_optionIndex])
                revert AlreadyVoted();
        } else {
            if (hasVoted[_pollId][msg.sender]) revert AlreadyVoted();
        }

        // Increment unique voters count if this is their first vote in this poll
        if (!hasVoted[_pollId][msg.sender]) {
            poll.uniqueVoters++;
        }

        hasVoted[_pollId][msg.sender] = true;
        hasVotedOption[_pollId][msg.sender][_optionIndex] = true;

        pollOptionVotes[_pollId][_optionIndex]++;
        poll.totalVotes++;

        emit VoteCast(_pollId, _optionIndex, msg.sender);
    }

    /**
     * @notice Get all option vote counts and total unique participants
     * @return results Array of vote counts for each option
     * @return uniqueVoters Number of unique addresses that participated
     */
    function getPollResults(
        uint256 _pollId
    ) external view returns (uint256[] memory results, uint256 uniqueVoters) {
        if (_pollId >= polls.length) revert Unauthorized();
        Poll storage poll = polls[_pollId];

        if (poll.settings.resultVisibility == PollResultVisibility.AfterVote) {
            if (!hasVoted[_pollId][msg.sender])
                revert PollResultVisibleAfterVote();
        } else if (
            poll.settings.resultVisibility == PollResultVisibility.AfterEnd
        ) {
            if (block.timestamp <= poll.endsAt)
                revert PollResultVisibleAfterEnd();
        } else if (poll.settings.resultVisibility == PollResultVisibility.Never)
            revert PollResultNeverVisible();

        uint256 optionsLength = poll.options.length;
        results = new uint256[](optionsLength);

        for (uint256 i = 0; i < optionsLength; i++) {
            results[i] = pollOptionVotes[_pollId][i];
        }

        return (results, poll.uniqueVoters);
    }

    function getVoterDetails(
        uint256 _pollId,
        address _voter
    ) external view returns (bool voted, bool[] memory chosenOptions) {
        if (_pollId >= polls.length) revert Unauthorized();
        Poll storage poll = polls[_pollId];

        voted = hasVoted[_pollId][_voter];
        uint256 optionsLength = poll.options.length;
        chosenOptions = new bool[](optionsLength);

        if (voted) {
            for (uint256 i = 0; i < optionsLength; i++) {
                chosenOptions[i] = hasVotedOption[_pollId][_voter][i];
            }
        }
    }

    function getWinner(
        uint256 _pollId
    ) external view returns (uint256 winnerIndex, uint256 winnerVotes) {
        if (_pollId >= polls.length) revert Unauthorized();
        Poll storage poll = polls[_pollId];
        if (poll.totalVotes == 0) revert NoVotesCast();

        uint256 maxVotes = 0;
        uint256 bestIndex = 0;

        for (uint256 i = 0; i < poll.options.length; i++) {
            uint256 currentOptionVotes = pollOptionVotes[_pollId][i];
            if (currentOptionVotes > maxVotes) {
                maxVotes = currentOptionVotes;
                bestIndex = i;
            }
        }

        return (bestIndex, maxVotes);
    }

    function cancelPoll(uint256 _pollId) external {
        if (_pollId >= polls.length) revert Unauthorized();
        Poll storage poll = polls[_pollId];
        if (msg.sender != poll.creator) revert Unauthorized();
        if (poll.internalStatus == PollStatus.Cancelled) revert PollNotActive();

        poll.internalStatus = PollStatus.Cancelled;
        emit PollCancelled(_pollId);
    }

    function getPoll(uint256 _pollId) external view returns (Poll memory) {
        if (_pollId >= polls.length) revert Unauthorized();
        Poll memory poll = polls[_pollId];
        poll.internalStatus = getStatus(_pollId);
        return poll;
    }

    function getOptionVotes(
        uint256 _pollId,
        uint256 _optionIndex
    ) external view returns (uint256) {
        return pollOptionVotes[_pollId][_optionIndex];
    }

    function getPollsCount() external view returns (uint256) {
        return polls.length;
    }

    function getUserStats(
        address _user
    ) external view returns (uint256 pollsCreated, uint256 totalVotesReceived) {
        uint256[] memory userPollIds = userPolls[_user];
        pollsCreated = userPollIds.length;
        for (uint256 i = 0; i < userPollIds.length; i++) {
            totalVotesReceived += polls[userPollIds[i]].totalVotes;
        }
    }

    function getUserPollsByStatus(
        address _user,
        PollStatus _status
    ) external view returns (uint256[] memory) {
        uint256[] memory allUserPolls = userPolls[_user];
        uint256 count = 0;
        for (uint256 i = 0; i < allUserPolls.length; i++) {
            if (getStatus(allUserPolls[i]) == _status) count++;
        }
        uint256[] memory filteredPollIds = new uint256[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < allUserPolls.length; i++) {
            if (getStatus(allUserPolls[i]) == _status) {
                filteredPollIds[index] = allUserPolls[i];
                index++;
            }
        }
        return filteredPollIds;
    }
}
