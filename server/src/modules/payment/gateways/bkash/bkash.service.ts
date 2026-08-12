// src/modules/payment/gateways/bkash/bkash.service.ts

import axios, { type AxiosInstance } from "axios";

import { bkashConfig } from "./bkash.config.js";
import {
  IBkashCreatePaymentResponse,
  IBkashExecutePaymentResponse,
  IBkashQueryPaymentResponse,
} from "./bkash.interface.js";
import { bkashTokenService } from "./bkash.token.service.js";

interface CreatePaymentPayload {
  amount: string;
  invoiceNumber: string;
  callbackURL: string;
}

class BkashService {
  private readonly client: AxiosInstance;

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

  /**
   * Create bKash payment.
   *
   * Flow:
   * 1. Get valid authorization token
   * 2. Call bKash create endpoint
   * 3. Return normalized gateway response
   */
  async createPayment(
    payload: CreatePaymentPayload,
  ): Promise<IBkashCreatePaymentResponse> {
    const token = await bkashTokenService.getToken();

    const response = await this.client.post<IBkashCreatePaymentResponse>(
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
          Authorization: token,
          "X-App-Key": bkashConfig.appKey,
        },
      },
    );

    return response.data;
  }

  /**
   * Execute an authorized bKash payment.
   */
  async executePayment(
    paymentID: string,
  ): Promise<IBkashExecutePaymentResponse> {
    const token = await bkashTokenService.getToken();

    const response = await this.client.post<IBkashExecutePaymentResponse>(
      "/tokenized/checkout/execute",
      {
        paymentID,
      },
      {
        headers: {
          Authorization: token,
          "X-App-Key": bkashConfig.appKey,
        },
      },
    );

    return response.data;
  }

  /**
   * Query current payment status.
   *
   * This should be used as a server-side verification
   * source instead of trusting client-side success.
   */
  async queryPayment(paymentID: string): Promise<IBkashQueryPaymentResponse> {
    const token = await bkashTokenService.getToken();

    const response = await this.client.post<IBkashQueryPaymentResponse>(
      "/tokenized/checkout/payment/status",
      {
        paymentID,
      },
      {
        headers: {
          Authorization: token,
          "X-App-Key": bkashConfig.appKey,
        },
      },
    );

    return response.data;
  }

  /**
   * Search a transaction by bKash transaction ID.
   */
  async searchTransaction(trxID: string): Promise<unknown> {
    const token = await bkashTokenService.getToken();

    const response = await this.client.post(
      "/tokenized/checkout/general/searchTransaction",
      {
        trxID,
      },
      {
        headers: {
          Authorization: token,
          "X-App-Key": bkashConfig.appKey,
        },
      },
    );

    return response.data;
  }
}

export const bkashService = new BkashService();
