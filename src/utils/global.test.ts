import { resultOrError } from "./global";

describe("resultOrError", () => {
  it("returns resolved value and null error when promise resolves", async () => {
    const [result, error] = await resultOrError(Promise.resolve("ok"));

    expect(result).toBe("ok");
    expect(error).toBeNull();
  });

  it("returns null result and Error when promise rejects with Error", async () => {
    const [result, error] = await resultOrError(Promise.reject(new Error("boom")));

    expect(result).toBeNull();
    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe("boom");
  });

  it("returns null result and Unknown error when promise rejects with non-error", async () => {
    const [result, error] = await resultOrError(Promise.reject("oops"));

    expect(result).toBeNull();
    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe("Unknown error");
  });
});
