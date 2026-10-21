
export interface IKhalaBill {

}
export interface IKhalaBillListResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: IKhalaBill[];
}