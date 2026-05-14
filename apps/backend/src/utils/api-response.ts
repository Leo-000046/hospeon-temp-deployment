export const successResponse = <T>(message: string, data: T | null = null) => {
  return {
    success: true,
    message,
    data,
  };
};

export const errorResponse = (message: string, error?: any) => {
  return {
    success: false,
    message,
    ...(error && { error }),
  };
};
