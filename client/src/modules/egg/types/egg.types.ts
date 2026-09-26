export interface ICreateEggDto {
  memberId: number;
  quantity: number;
}

export interface IUpdateEggDto {
  memberId: number;
  quantity: number;
}

export interface IEggMember {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
}

export interface IEgg {
  id: number;
  tenantId: number;
  mealSessionId: number;
  memberId: number;
  quantity: string;
  member: IEggMember;
  eggDate: string | null | Date;
}
