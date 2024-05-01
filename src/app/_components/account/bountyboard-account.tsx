let account = null;

export default class BountyboardAccount {

  constructor() {}

  getAccount() {
    return account;
  }

  setAccount(user_id, ally_code) {
    account = { user_id, ally_code };
  }

  async getAccountByEmail(email: string, password: string) {
    const response = await fetch("/api/bountyboard/account-by-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch getAccountByEmail (${response.status})`);
    }

    const json = await response.json();
    if (!json.exists) {
      return null;
    }

    account = json.data;
    return account;
  }
}