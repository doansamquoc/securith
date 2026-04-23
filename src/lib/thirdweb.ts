import { createThirdwebClient, getContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { generateAccount, inAppWallet, smartWallet } from "thirdweb/wallets";
const THIRDWEB_CLIENT_ID = import.meta.env.VITE_THIRDWEB_CLIENT_ID;
const THIRDWEB_SECRET_KEY = import.meta.env.VITE_THIRDWEB_SECRET_KEY;

export const client = createThirdwebClient({
  clientId: THIRDWEB_CLIENT_ID,
  secretKey: THIRDWEB_SECRET_KEY,
});

export const wallets = [
  inAppWallet({
    auth: {
      options: ["google", "telegram", "email", "phone", "apple", "facebook", "tiktok", "github"],
      mode: "popup",
    },
    executionMode: { mode: "EIP7702", sponsorGas: true },
  }),
];

export const wallet = inAppWallet({
  auth: {
    options: [
      /* Ignore, Because I want just to use the Redirect Mode */
    ],
    mode: "redirect",
  },
  executionMode: { mode: "EIP7702", sponsorGas: true },
});
export const smart = smartWallet({ chain: baseSepolia, sponsorGas: true });

export const contract = getContract({
  client,
  chain: baseSepolia,
  address: "0x093D2bfB95f34a0b4F26406821ad7EA43608bf34",
});

export const personalAccount = await generateAccount({
  client: client,
});
