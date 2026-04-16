import { createThirdwebClient } from "thirdweb";
import { inAppWallet } from "thirdweb/wallets";
const THIRDWEB_CLIENT_ID = import.meta.env.VITE_THIRDWEB_CLIENT_ID;
const THIRDWEB_SECRET_KEY = import.meta.env.VITE_THIRDWED_SECRET_KEY;

console.log(THIRDWEB_CLIENT_ID);
export const client = createThirdwebClient({
  clientId: "1984562aaa79cf1553e75b94ced536b0",
  // secretKey: THIRDWEB_SECRET_KEY
});

export const wallets = [
  inAppWallet({
    auth: {
      options: ["google", "telegram", "email", "phone", "apple", "facebook", "tiktok", "github"],
    },
  }),
];
