import {
  prepareEvent,
  prepareContractCall,
  readContract,
  type BaseTransactionOptions,
  type AbiParameterToPrimitiveType,
} from "thirdweb";

/**
* Contract events
*/

/**
 * Represents the filters for the "PollClosed" event.
 */
export type PollClosedEventFilters = Partial<{
  creator: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"creator","type":"address"}>
pollId: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"uint256","name":"pollId","type":"uint256"}>
}>;

/**
 * Creates an event object for the PollClosed event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { pollClosedEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  pollClosedEvent({
 *  creator: ...,
 *  pollId: ...,
 * })
 * ],
 * });
 * ```
 */
export function pollClosedEvent(filters: PollClosedEventFilters = {}) {
  return prepareEvent({
    signature: "event PollClosed(address indexed creator, uint256 indexed pollId)",
    filters,
  });
};
  

/**
 * Represents the filters for the "PollCreated" event.
 */
export type PollCreatedEventFilters = Partial<{
  creator: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"creator","type":"address"}>
pollId: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"uint256","name":"pollId","type":"uint256"}>
}>;

/**
 * Creates an event object for the PollCreated event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { pollCreatedEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  pollCreatedEvent({
 *  creator: ...,
 *  pollId: ...,
 * })
 * ],
 * });
 * ```
 */
export function pollCreatedEvent(filters: PollCreatedEventFilters = {}) {
  return prepareEvent({
    signature: "event PollCreated(address indexed creator, uint256 indexed pollId)",
    filters,
  });
};
  

/**
 * Represents the filters for the "PollDeleted" event.
 */
export type PollDeletedEventFilters = Partial<{
  creator: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"creator","type":"address"}>
pollId: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"uint256","name":"pollId","type":"uint256"}>
}>;

/**
 * Creates an event object for the PollDeleted event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { pollDeletedEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  pollDeletedEvent({
 *  creator: ...,
 *  pollId: ...,
 * })
 * ],
 * });
 * ```
 */
export function pollDeletedEvent(filters: PollDeletedEventFilters = {}) {
  return prepareEvent({
    signature: "event PollDeleted(address indexed creator, uint256 indexed pollId)",
    filters,
  });
};
  

/**
 * Represents the filters for the "VoteCast" event.
 */
export type VoteCastEventFilters = Partial<{
  voter: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"voter","type":"address"}>
}>;

/**
 * Creates an event object for the VoteCast event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { voteCastEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  voteCastEvent({
 *  voter: ...,
 * })
 * ],
 * });
 * ```
 */
export function voteCastEvent(filters: VoteCastEventFilters = {}) {
  return prepareEvent({
    signature: "event VoteCast(address indexed voter, uint256 pollId, uint256[] optionIndices)",
    filters,
  });
};
  

/**
* Contract read functions
*/

/**
 * Represents the parameters for the "getPollDetails" function.
 */
export type GetPollDetailsParams = {
  pollId: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_pollId","type":"uint256"}>
};

/**
 * Calls the "getPollDetails" function on the contract.
 * @param options - The options for the getPollDetails function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getPollDetails } from "TODO";
 *
 * const result = await getPollDetails({
 *  pollId: ...,
 * });
 *
 * ```
 */
export async function getPollDetails(
  options: BaseTransactionOptions<GetPollDetailsParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x9a0040e4",
  [
    {
      "internalType": "uint256",
      "name": "_pollId",
      "type": "uint256"
    }
  ],
  [
    {
      "components": [
        {
          "internalType": "address",
          "name": "creator",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "title",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "startsAt",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "endsAt",
          "type": "uint256"
        },
        {
          "internalType": "string[]",
          "name": "options",
          "type": "string[]"
        },
        {
          "internalType": "uint256",
          "name": "participants",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalVotes",
          "type": "uint256"
        },
        {
          "internalType": "enum Polls.Status",
          "name": "status",
          "type": "uint8"
        },
        {
          "components": [
            {
              "internalType": "bool",
              "name": "multiChoice",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "noDeadline",
              "type": "bool"
            },
            {
              "internalType": "enum Polls.ResultVisibility",
              "name": "resultVisibility",
              "type": "uint8"
            }
          ],
          "internalType": "struct Polls.Settings",
          "name": "settings",
          "type": "tuple"
        },
        {
          "internalType": "bool",
          "name": "hasVoted",
          "type": "bool"
        },
        {
          "internalType": "uint256[]",
          "name": "votedIndices",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256",
          "name": "createdAt",
          "type": "uint256"
        }
      ],
      "internalType": "struct Polls.Details",
      "name": "",
      "type": "tuple"
    }
  ]
],
    params: [options.pollId]
  });
};


/**
 * Represents the parameters for the "getPollResults" function.
 */
export type GetPollResultsParams = {
  pollId: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_pollId","type":"uint256"}>
voter: AbiParameterToPrimitiveType<{"internalType":"address","name":"_voter","type":"address"}>
};

/**
 * Calls the "getPollResults" function on the contract.
 * @param options - The options for the getPollResults function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getPollResults } from "TODO";
 *
 * const result = await getPollResults({
 *  pollId: ...,
 *  voter: ...,
 * });
 *
 * ```
 */
export async function getPollResults(
  options: BaseTransactionOptions<GetPollResultsParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x14956b6f",
  [
    {
      "internalType": "uint256",
      "name": "_pollId",
      "type": "uint256"
    },
    {
      "internalType": "address",
      "name": "_voter",
      "type": "address"
    }
  ],
  [
    {
      "components": [
        {
          "internalType": "string",
          "name": "title",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "creator",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "participants",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalVotes",
          "type": "uint256"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "text",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "totalVotes",
              "type": "uint256"
            }
          ],
          "internalType": "struct Polls.OptionResult[]",
          "name": "optionsResult",
          "type": "tuple[]"
        },
        {
          "internalType": "uint256",
          "name": "createdAt",
          "type": "uint256"
        }
      ],
      "internalType": "struct Polls.Result",
      "name": "",
      "type": "tuple"
    }
  ]
],
    params: [options.pollId, options.voter]
  });
};




/**
 * Calls the "getPollSummaries" function on the contract.
 * @param options - The options for the getPollSummaries function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getPollSummaries } from "TODO";
 *
 * const result = await getPollSummaries();
 *
 * ```
 */
export async function getPollSummaries(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xdfcaab88",
  [],
  [
    {
      "components": [
        {
          "internalType": "address",
          "name": "creator",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "title",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "participants",
          "type": "uint256"
        },
        {
          "internalType": "enum Polls.Status",
          "name": "status",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "startsAt",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "endsAt",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "createdAt",
          "type": "uint256"
        }
      ],
      "internalType": "struct Polls.Summary[]",
      "name": "",
      "type": "tuple[]"
    }
  ]
],
    params: []
  });
};


/**
 * Represents the parameters for the "getUserStats" function.
 */
export type GetUserStatsParams = {
  user: AbiParameterToPrimitiveType<{"internalType":"address","name":"_user","type":"address"}>
};

/**
 * Calls the "getUserStats" function on the contract.
 * @param options - The options for the getUserStats function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getUserStats } from "TODO";
 *
 * const result = await getUserStats({
 *  user: ...,
 * });
 *
 * ```
 */
export async function getUserStats(
  options: BaseTransactionOptions<GetUserStatsParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x4e43603a",
  [
    {
      "internalType": "address",
      "name": "_user",
      "type": "address"
    }
  ],
  [
    {
      "components": [
        {
          "internalType": "uint256",
          "name": "totalPollsCreated",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalVotesReceived",
          "type": "uint256"
        }
      ],
      "internalType": "struct Polls.UserStats",
      "name": "",
      "type": "tuple"
    }
  ]
],
    params: [options.user]
  });
};


/**
* Contract write functions
*/

/**
 * Represents the parameters for the "castVote" function.
 */
export type CastVoteParams = {
  pollId: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_pollId","type":"uint256"}>
optionIndices: AbiParameterToPrimitiveType<{"internalType":"uint256[]","name":"_optionIndices","type":"uint256[]"}>
};

/**
 * Calls the "castVote" function on the contract.
 * @param options - The options for the "castVote" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { castVote } from "TODO";
 *
 * const transaction = castVote({
 *  pollId: ...,
 *  optionIndices: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function castVote(
  options: BaseTransactionOptions<CastVoteParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x2fa48e9e",
  [
    {
      "internalType": "uint256",
      "name": "_pollId",
      "type": "uint256"
    },
    {
      "internalType": "uint256[]",
      "name": "_optionIndices",
      "type": "uint256[]"
    }
  ],
  []
],
    params: [options.pollId, options.optionIndices]
  });
};


/**
 * Represents the parameters for the "closePoll" function.
 */
export type ClosePollParams = {
  pollId: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_pollId","type":"uint256"}>
};

/**
 * Calls the "closePoll" function on the contract.
 * @param options - The options for the "closePoll" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { closePoll } from "TODO";
 *
 * const transaction = closePoll({
 *  pollId: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function closePoll(
  options: BaseTransactionOptions<ClosePollParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x9534e637",
  [
    {
      "internalType": "uint256",
      "name": "_pollId",
      "type": "uint256"
    }
  ],
  []
],
    params: [options.pollId]
  });
};


/**
 * Represents the parameters for the "createPoll" function.
 */
export type CreatePollParams = {
  title: AbiParameterToPrimitiveType<{"internalType":"string","name":"_title","type":"string"}>
desc: AbiParameterToPrimitiveType<{"internalType":"string","name":"_desc","type":"string"}>
startsAt: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_startsAt","type":"uint256"}>
endsAt: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_endsAt","type":"uint256"}>
options: AbiParameterToPrimitiveType<{"internalType":"string[]","name":"_options","type":"string[]"}>
settings: AbiParameterToPrimitiveType<{"components":[{"internalType":"bool","name":"multiChoice","type":"bool"},{"internalType":"bool","name":"noDeadline","type":"bool"},{"internalType":"enum Polls.ResultVisibility","name":"resultVisibility","type":"uint8"}],"internalType":"struct Polls.Settings","name":"_settings","type":"tuple"}>
};

/**
 * Calls the "createPoll" function on the contract.
 * @param options - The options for the "createPoll" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { createPoll } from "TODO";
 *
 * const transaction = createPoll({
 *  title: ...,
 *  desc: ...,
 *  startsAt: ...,
 *  endsAt: ...,
 *  options: ...,
 *  settings: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function createPoll(
  options: BaseTransactionOptions<CreatePollParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x21b91db5",
  [
    {
      "internalType": "string",
      "name": "_title",
      "type": "string"
    },
    {
      "internalType": "string",
      "name": "_desc",
      "type": "string"
    },
    {
      "internalType": "uint256",
      "name": "_startsAt",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "_endsAt",
      "type": "uint256"
    },
    {
      "internalType": "string[]",
      "name": "_options",
      "type": "string[]"
    },
    {
      "components": [
        {
          "internalType": "bool",
          "name": "multiChoice",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "noDeadline",
          "type": "bool"
        },
        {
          "internalType": "enum Polls.ResultVisibility",
          "name": "resultVisibility",
          "type": "uint8"
        }
      ],
      "internalType": "struct Polls.Settings",
      "name": "_settings",
      "type": "tuple"
    }
  ],
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ]
],
    params: [options.title, options.desc, options.startsAt, options.endsAt, options.options, options.settings]
  });
};


/**
 * Represents the parameters for the "deletePoll" function.
 */
export type DeletePollParams = {
  pollId: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_pollId","type":"uint256"}>
};

/**
 * Calls the "deletePoll" function on the contract.
 * @param options - The options for the "deletePoll" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { deletePoll } from "TODO";
 *
 * const transaction = deletePoll({
 *  pollId: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function deletePoll(
  options: BaseTransactionOptions<DeletePollParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x1f35b51d",
  [
    {
      "internalType": "uint256",
      "name": "_pollId",
      "type": "uint256"
    }
  ],
  []
],
    params: [options.pollId]
  });
};


