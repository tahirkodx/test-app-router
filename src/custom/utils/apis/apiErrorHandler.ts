import { AxiosError } from 'axios';

interface IErrorType
  extends AxiosError<{ message: string; Message: string; responseMessage: string }> {
  title?: string;
}

const ApiErrorHandler = (error: IErrorType) => {
  if (
    error.response?.data?.message ||
    error.response?.data?.Message ||
    error.response?.data?.responseMessage
  ) {
    const { message, Message, responseMessage } = error.response.data;
    return message || Message || responseMessage;
  }
  if (error.message) return error.message;
  if (error.title) return error.title;

  return 'An error occured, please try again';
};

export default ApiErrorHandler;
