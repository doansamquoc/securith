export const CREATE_POLL_METHOD =
  "function createPoll(string _title, string _desc, uint256 _startsAt, uint256 _endsAt, string[] _options, (bool multiChoice, bool noDeadline, uint8 resultVisibility) _settings) returns (uint256)";
export const GET_POLL_SUMMARIES =
  "function getPollSummaries(address _user) view returns ((address creator, uint256 id, string title, uint256 pollVotes, uint8 status, uint256 startsAt, uint256 endsAt, uint256 createdAt)[])";
export const GET_POLL_DETAILS =
  "function getPollDetails(uint256 _pollId) view returns ((address creator, string title, string description, uint256 startsAt, uint256 endsAt, (string text, uint256 votes)[] options, uint256 pollVotes, (bool multiChoice, bool noDeadline, uint8 resultVisibility) settings, bool hasVoted, uint256[] votedIndices, uint256 createdAt))";
