import axios, { type AxiosInstance } from "axios";

import { bkashConfig } from "./bkash.config.js";
import type { IBkashTokenResponse } from "./bkash.interface.js";

class BkashTokenService {
  private readonly client: AxiosInstance;

  private token: string | null = null;

  private tokenExpiryTime = 0;

  private tokenRequest: Promise<string> | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: bkashConfig.baseUrl,
      timeout: 30_000,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  private isTokenValid(): boolean {
    return Boolean(
      this.token && this.tokenExpiryTime && Date.now() < this.tokenExpiryTime,
    );
  }

  private async requestToken(): Promise<string> {
    const response = await this.client.post<IBkashTokenResponse>(
      "/tokenized/checkout/token/grant",
      {
        app_key: bkashConfig.appKey,
        app_secret: bkashConfig.appSecret,
      },
      {
        headers: {
          username: bkashConfig.username,
          password: bkashConfig.password,
        },
      },
    );

    const { id_token, expires_in } = response.data;

    if (!id_token) {
      throw new Error("bKash token was not returned.");
    }

    const expiryBuffer = Math.min(60, Math.max(5, expires_in - 1));

    this.token = id_token;
    this.tokenExpiryTime = Date.now() + (expires_in - expiryBuffer) * 1000;

    return id_token;
  }

  async getToken(): Promise<string> {
    if (this.isTokenValid()) {
      return this.token as string;
    }

    if (this.tokenRequest) {
      return this.tokenRequest;
    }

    this.tokenRequest = this.requestToken().finally(() => {
      this.tokenRequest = null;
    });

    return this.tokenRequest;
  }

  clearToken(): void {
    this.token = null;
    this.tokenExpiryTime = 0;
  }
}

export const bkashTokenService = new BkashTokenService();
