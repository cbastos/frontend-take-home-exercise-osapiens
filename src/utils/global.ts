export type ResultOrErrorResponse<T> = [T | null, Error | null];

export const resultOrError = async (
  promise: Promise<any>,
): Promise<ResultOrErrorResponse<any>> => {
  try {
    const result = await promise;
    return [result, null];
  } catch (error) {
    return [null, error instanceof Error ? error : new Error("Unknown error")];
  }
};
