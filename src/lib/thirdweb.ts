import { createThirdwebClient } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { inAppWallet } from "thirdweb/wallets";
const THIRDWEB_CLIENT_ID = import.meta.env.VITE_THIRDWEB_CLIENT_ID;
const THIRDWEB_SECRET_KEY = import.meta.env.VITE_THIRDWEB_SECRET_KEY;

console.log("CLIENT ID:" + THIRDWEB_CLIENT_ID);
console.log("SECRET KEY:" + THIRDWEB_SECRET_KEY);

export const client = createThirdwebClient({
  clientId: THIRDWEB_CLIENT_ID,
  secretKey: THIRDWEB_SECRET_KEY,
});

export const wallets = [
  inAppWallet({
    auth: {
      options: ["google", "telegram", "email", "phone", "apple", "facebook", "tiktok", "github"],
    },
    executionMode: {
      mode: "EIP4337",
      smartAccount: { chain: baseSepolia, sponsorGas: true },
    },
  }),
];

export const wallet = inAppWallet({
  executionMode: {
    mode: "EIP4337",
    smartAccount: { chain: baseSepolia, sponsorGas: true },
  },
});
