import { PathParams } from "../types/global";

export const validateParams = (path: string, params: unknown) => {
  if (!(params instanceof Object)) return false;

  const paramSet = new Set(Object.keys(params));

  // Validate params
  const requiredParams = path
    .split("/")
    .filter((s) => s.startsWith(":"))
    .map((s) => s.substr(1));

  for (const param of requiredParams) {
    if (!paramSet.has(param)) return false;
  }

  return true;
};

// build a valid url with the path and its parameters
export const buildUrl = (path: string, params: PathParams): string => {
  let ret: string = path;

  // Upcast `params` to be used in string replacement.
  const paramObj: { [i: string]: string } = params;

  for (const key of Object.keys(paramObj)) {
    ret = ret.replace(`:${key}`, paramObj[key]);
  }

  return ret;
};
