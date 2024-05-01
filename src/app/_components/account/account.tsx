import BountyboardAccount from "./bountyboard-account";

const Account = new BountyboardAccount();

export default function useAccount() {
  return {
    getAccount: Account.getAccount,
    setAccount: Account.setAccount,
    getAccountByEmail: Account.getAccountByEmail,
  };
}