export interface IBkashTokenResponse {
  id_token: string;
  token_type: string;
  expires_in: number;
}

export interface IBkashCreatePaymentResponse {
  paymentID: string;

  bkashURL: string;

  statusCode: string;

  statusMessage: string;
}

export interface IBkashExecutePaymentResponse {
  paymentID: string;

  trxID: string;

  transactionStatus: string;
}

export interface IBkashQueryPaymentResponse {
  paymentID: string;

  trxID: string;

  transactionStatus: string;
}
