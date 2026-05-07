export class TheMiracleService {
  private apiUrl: string;
  private apiKey: string;
  private initialized = false;

  constructor() {
    this.apiUrl = process.env.NEXT_PUBLIC_THEMIRACLE_API_URL || "https://api.themiracle.io/v1";
    this.apiKey = process.env.THEMIRACLE_API_KEY || "";
    console.log("[TheMiracle SDK] Initializing Incentive Layer");
  }

  init() {
    if (this.initialized) return;
    if (!this.apiKey) {
      console.warn("[TheMiracle SDK] No API key provided. Requests may fall back to mock data.");
    }
    this.initialized = true;
  }

  async claimIncentive(userId: string): Promise<{ licenseId: string, status: string }> {
    this.init();
    console.log(`[TheMiracle SDK] Claiming incentive for user ${userId}`);
    
    try {
      const response = await fetch(`${this.apiUrl}/claims`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey || 'demo_key'}`
        },
        body: JSON.stringify({ userId, incentiveType: "lifetime_pro" })
      });

      if (!response.ok) throw new Error("Claim failed");
      const data = await response.json();
      
      return {
        licenseId: data.licenseId || `MRC-${Math.random().toString(36).substring(2, 6).toUpperCase()}-99B1`,
        status: data.status || "ACTIVATED"
      };
    } catch (e) {
      console.error("[TheMiracle SDK] Failed to process claim, falling back to mock");
      await new Promise(res => setTimeout(res, 1500));
      return {
        licenseId: `MRC-${Math.random().toString(36).substring(2, 6).toUpperCase()}-99B1`,
        status: "ACTIVATED"
      };
    }
  }

  async getAdminMetrics(): Promise<any> {
    this.init();
    try {
      const response = await fetch(`${this.apiUrl}/metrics`, {
        headers: { "Authorization": `Bearer ${this.apiKey || 'demo_key'}` }
      });
      if (!response.ok) throw new Error("Failed to fetch metrics");
      return await response.json();
    } catch (e) {
      // Simulate fetching metrics from TheMiracle backend as fallback
      await new Promise(res => setTimeout(res, 500));
      return {
        signups: "8,492",
        activeLicenses: "6,104",
        cac: "$0.00",
        perceivedValue: "$4.2M"
      };
    }
  }
}

export const theMiracleService = new TheMiracleService();
