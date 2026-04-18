import {
  type Poll,
  PollStatus,
  type PollResult,
  type PollWinner,
  type VoterDetails,
  type PollAnalytics,
  type UserStats,
} from "./types";

const MOCK_CREATOR = "0x1234567890123456789012345678901234567890";
const MOCK_VOTER = "0x0987654321098765432109876543210987654321";

export const MOCK_POLLS: Poll[] = [
  {
    id: "1",
    title: "Favorite Programming Language",
    description: "Vote for your primary programming language for web development.",
    creator: MOCK_CREATOR,
    startsAt: BigInt(Math.floor(Date.now() / 1000) - 86400), // Started yesterday
    endsAt: BigInt(Math.floor(Date.now() / 1000) + 86400 * 7), // Ends in 7 days
    options: ["TypeScript", "JavaScript", "Python", "Rust", "Go"],
    status: PollStatus.Active,
    totalVotes: BigInt(150),
    uniqueVoters: BigInt(150),
    settings: {
      multiChoice: false,
      noDeadline: false,
    },
  },
  {
    id: "2",
    title: "Best Frontend Framework 2026",
    description: "Which framework are you most excited about this year?",
    creator: MOCK_CREATOR,
    startsAt: BigInt(Math.floor(Date.now() / 1000) - 172800), // Started 2 days ago
    endsAt: BigInt(Math.floor(Date.now() / 1000) - 3600), // Ended 1 hour ago
    options: ["React 19", "Next.js", "Vue 4", "Svelte 5", "Angular 20"],
    status: PollStatus.Ended,
    totalVotes: BigInt(450),
    uniqueVoters: BigInt(450),
    settings: {
      multiChoice: false,
      noDeadline: false,
    },
  },
  {
    id: "3",
    title: "Upcoming Community Meetup Location",
    description: "Select all cities you would be willing to travel to for the next meetup.",
    creator: MOCK_CREATOR,
    startsAt: BigInt(Math.floor(Date.now() / 1000) + 3600), // Starts in 1 hour
    endsAt: BigInt(Math.floor(Date.now() / 1000) + 86400 * 14), // Ends in 14 days
    options: ["New York", "London", "Tokyo", "Berlin", "Singapore"],
    status: PollStatus.NotStarted,
    totalVotes: BigInt(0),
    uniqueVoters: BigInt(0),
    settings: {
      multiChoice: true,
      noDeadline: false,
    },
  },
  {
    id: "4",
    title: "Decentralized Governance Proposal #42",
    description: "Should we implement a treasury fee for all transactions?",
    creator: MOCK_CREATOR,
    startsAt: BigInt(Math.floor(Date.now() / 1000) - 604800), // Started 1 week ago
    endsAt: BigInt(Math.floor(Date.now() / 1000) + 86400 * 30), // Ends in 30 days
    options: ["Yes", "No", "Abstain"],
    status: PollStatus.Active,
    totalVotes: BigInt(1250),
    uniqueVoters: BigInt(1250),
    settings: {
      multiChoice: false,
      noDeadline: true,
    },
  },
];

export const MOCK_POLL_RESULTS: Record<string, PollResult> = {
  "1": {
    pollId: "1",
    results: [BigInt(60), BigInt(40), BigInt(20), BigInt(20), BigInt(10)],
    uniqueVoters: BigInt(150),
  },
  "2": {
    pollId: "2",
    results: [BigInt(200), BigInt(150), BigInt(50), BigInt(30), BigInt(20)],
    uniqueVoters: BigInt(450),
  },
};

export const MOCK_POLL_WINNERS: Record<string, PollWinner> = {
  "2": {
    pollId: "2",
    winnerIndex: BigInt(0),
    winnerVotes: BigInt(200),
  },
};

export const MOCK_VOTER_DETAILS: Record<string, VoterDetails> = {
  "1": {
    pollId: "1",
    voter: MOCK_VOTER,
    voted: true,
    chosenOptions: [true, false, false, false, false], // Voted for TypeScript
  },
  "2": {
    pollId: "2",
    voter: MOCK_VOTER,
    voted: true,
    chosenOptions: [false, true, false, false, false], // Voted for Next.js
  },
  "3": {
    pollId: "3",
    voter: MOCK_VOTER,
    voted: false,
    chosenOptions: [false, false, false, false, false],
  },
};

export const MOCK_POLL_ANALYTICS: Record<string, PollAnalytics> = {
  "1": {
    pollId: "1",
    totalVotes: BigInt(150),
    uniqueVoters: BigInt(150),
    voteDistribution: [
      { option: "TypeScript", votes: BigInt(60), percentage: 40 },
      { option: "JavaScript", votes: BigInt(40), percentage: 26.67 },
      { option: "Python", votes: BigInt(20), percentage: 13.33 },
      { option: "Rust", votes: BigInt(20), percentage: 13.33 },
      { option: "Go", votes: BigInt(10), percentage: 6.67 },
    ],
  },
  "2": {
    pollId: "2",
    totalVotes: BigInt(450),
    uniqueVoters: BigInt(450),
    voteDistribution: [
      { option: "React 19", votes: BigInt(200), percentage: 44.44 },
      { option: "Next.js", votes: BigInt(150), percentage: 33.33 },
      { option: "Vue 4", votes: BigInt(50), percentage: 11.11 },
      { option: "Svelte 5", votes: BigInt(30), percentage: 6.67 },
      { option: "Angular 20", votes: BigInt(20), percentage: 4.44 },
    ],
  },
};

export const MOCK_USER_STATS: UserStats = {
  address: MOCK_CREATOR,
  pollsCreated: BigInt(4),
  totalVotesReceived: BigInt(1850),
};
