
export interface ICurrentBill {

}
export interface ICurrentBillListResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: ICurrentBill[];
}