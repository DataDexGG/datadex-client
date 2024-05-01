export default class ComlinkEvent {

  constructor() {}

  async getEvents() {
    const response = await fetch("/api/comlink-events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch getEvents (${response.status})`);
    }

    return await response.json();
  }

}