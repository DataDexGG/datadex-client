import DatabaseAccountFuncs from "./database-account-funcs";

const AccountFuncs = new DatabaseAccountFuncs();

export default function useDatabase() {
  return {
    saveAccount: AccountFuncs.saveAccount,
  };
}