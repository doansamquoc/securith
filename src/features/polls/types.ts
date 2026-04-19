export const PollStatus = {
  NotStarted: 0,
  Active: 1,
  Ended: 2,
  Cancelled: 3,
} as const;

export type PollStatus = (typeof PollStatus)[keyof typeof PollStatus];

export interface PollSettings {
  multiChoice: boolean;
  noDeadline: boolean;
}

export interface Poll {
  id: string;
  title: string;
  description: string;
  creator: string;
  startsAt: bigint;
  endsAt: bigint;
  options: string[];
  status: PollStatus;
  totalVotes: bigint;
  uniqueVoters: bigint;
  settings: PollSettings;
}

export interface PollResult {
  pollId: string;
  results: bigint[];
  uniqueVoters: bigint;
}

export interface PollWinner {
  pollId: string;
  winnerIndex: bigint;
  winnerVotes: bigint;
}

export interface VoterDetails {
  pollId: string;
  voter: string;
  voted: boolean;
  chosenOptions: boolean[];
}

export interface PollAnalytics {
  pollId: string;
  totalVotes: bigint;
  uniqueVoters: bigint;
  voteDistribution: {
    option: string;
    votes: bigint;
    percentage: number;
  }[];
}

export interface UserStats {
  address: string;
  pollsCreated: number;
  totalVotesReceived: number;
}
