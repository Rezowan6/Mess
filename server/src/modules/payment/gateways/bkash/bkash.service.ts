import axios, { AxiosInstance } from "axios";

import { bkashConfig } from "./bkash.config.js";

interface IBkashTokenResponse {
  id_token: string;
  token_type: string;
  expires_in: number;
}

class BkashService {
  private token: string | null = null;

  private tokenExpiryTime: number | null = null;

  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: bkashConfig.baseUrl,
      timeout: 30000,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
    });
  }

  /**
   * Check token validity
   */
  private isTokenValid(): boolean {
    if (!this.token || !this.tokenExpiryTime) {
      return false;
    }

    return Date.now() < this.tokenExpiryTime;
  }

  /**
   * Generate bKash Token
   */
  async getToken(): Promise<string> {
    if (this.isTokenValid()) {
      return this.token!;
    }

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

    const data = response.data;

    this.token = data.id_token;

    /**
     * expires_in usually comes in seconds
     * keep 60 sec buffer
     */
    this.tokenExpiryTime = Date.now() + (data.expires_in - 60) * 1000;

    return this.token;
  }

  /**
   * Create Payment
   */
  async createPayment(payload: {
    amount: string;
    invoiceNumber: string;
    callbackURL: string;
  }) {
    const token = await this.getToken();

    const response = await this.client.post(
      "/tokenized/checkout/create",
      {
        mode: "0011",
        payerReference: payload.invoiceNumber,
        callbackURL: payload.callbackURL,
        amount: payload.amount,
        currency: "BDT",
        intent: "sale",
        merchantInvoiceNumber: payload.invoiceNumber,
      },
      {
        headers: {
          authorization: token,
          "x-app-key": bkashConfig.appKey,
        },
      },
    );

    return response.data;
  }

  /**
   * Execute Payment
   */
  async executePayment(paymentID: string) {
    const token = await this.getToken();

    const response = await this.client.post(
      "/tokenized/checkout/execute",
      {
        paymentID,
      },
      {
        headers: {
          authorization: token,
          "x-app-key": bkashConfig.appKey,
        },
      },
    );

    return response.data;
  }

  /**
   * Query Payment
   */
  async queryPayment(paymentID: string) {
    const token = await this.getToken();

    const response = await this.client.post(
      "/tokenized/checkout/payment/status",
      {
        paymentID,
      },
      {
        headers: {
          authorization: token,
          "x-app-key": bkashConfig.appKey,
        },
      },
    );

    return response.data;
  }

  /**
   * Search Transaction
   * Future use
   */
  async searchTransaction(trxID: string) {
    const token = await this.getToken();

    const response = await this.client.post(
      "/tokenized/checkout/general/searchTransaction",
      {
        trxID,
      },
      {
        headers: {
          authorization: token,
          "x-app-key": bkashConfig.appKey,
        },
      },
    );

    return response.data;
  }
}

export const bkashService = new BkashService();
