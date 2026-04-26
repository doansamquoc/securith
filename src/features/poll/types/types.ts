export const PollStatus = {
  NotStarted: 0,
  Active: 1,
  Ended: 2,
  Cancelled: 3,
} as const;

export type PollStatus = (typeof PollStatus)[keyof typeof PollStatus];

export const ResultVisibility = {
  Always: 0,
  AfterVote: 1,
  AfterEnd: 2,
  Never: 3,
} as const;

export type ResultVisibility = (typeof ResultVisibility)[keyof typeof ResultVisibility];

export interface Settings {
  multiChoice: boolean;
  noDeadline: boolean;
  resultVisibility: number;
}

export interface Poll {
  id: bigint;
  creator: bigint;
  startsAt: bigint;
  endsAt: bigint;
  participants: bigint;
  totalVotes: bigint;
  createdAt: bigint;
  isDeleted: boolean;
  settings: Settings;
  title: string;
  description: string;
  options: string[];
}

export interface PollSummary {
  creator: string;
  id: bigint;
  title: string;
  participants: bigint;
  totalVotes: bigint;
  status: number;
  startsAt: bigint;
  endsAt: bigint;
  createdAt: bigint;
}

export interface PollDetails {
  creator: string;
  title: string;
  description: string;
  startsAt: bigint;
  endsAt: bigint;
  options: readonly string[];
  participants: bigint;
  totalVotes: bigint;
  status: number;
  settings: {
    multiChoice: boolean;
    noDeadline: boolean;
    resultVisibility: number;
  };
  hasVoted: boolean;
  votedIndices: readonly bigint[];
  createdAt: bigint;
}

export interface PollResult {
  title: string;
  creator: string;
  participants: bigint;
  totalVotes: bigint;
  optionsResult: readonly {
    text: string;
    totalVotes: bigint;
  }[];
  createdAt: bigint;
}

export interface OptionResult {
  text: string;
  votes: bigint;
}

export interface UserStats {
  totalPollsCreated: bigint;
  totalVotesReceived: bigint;
}
