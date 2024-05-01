export default class DatabaseAccountFuncs {
  constructor() { }

  async saveAccount(ally_code, email, password) {
    const response = await fetch("/api/database/create-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ally_code,
        email,
        password,
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to saveAccount (${response.status})`);
    }

    return await response.json();
  }
}