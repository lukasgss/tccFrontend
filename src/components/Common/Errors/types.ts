export interface ApiError {
  message: string;
  statusCode: number;
}

export const defaultErrorMessage = "Erro interno no sistema, tente novamente mais tarde";
