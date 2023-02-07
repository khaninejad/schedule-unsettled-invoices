export type CustomerRequestDto = {
  email: string;
  text: string;
  schedule: string;
};
export type CustomerResponseDto = {
  email: string;
  text: string;
  paid: boolean;
};
