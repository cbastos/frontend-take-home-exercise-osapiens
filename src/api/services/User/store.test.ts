import { ActionResultStatus } from "../../../types/global";
import * as globalUtils from "../../../utils/global";
import UserStore from "./store";

describe("UserStore", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("returns SUCCESS and stores user when getOwnUser resolves", async () => {
    jest.useFakeTimers();
    const store = new UserStore();
    const pending = store.getOwnUser();
    jest.advanceTimersByTime(500);
    const response = await pending;
    jest.useRealTimers();

    expect(response.status).toBe(ActionResultStatus.SUCCESS);
    expect(store.user).toEqual({
      firstName: "Aria",
      lastName: "Test",
      eMail: "linda.bolt@osapiens.com"
    });
  });

  it("returns ERROR when resultOrError returns an error", async () => {
    jest
      .spyOn(globalUtils, "resultOrError")
      .mockResolvedValue([null, new Error("request failed")]);
    const store = new UserStore();

    const response = await store.getOwnUser();

    expect(response.status).toBe(ActionResultStatus.ERROR);
    expect(response).toEqual(
      expect.objectContaining({
        error: expect.any(Error),
        knownErrors: {}
      })
    );
    expect(store.user).toBeNull();
  });

  it("returns ERROR with fallback message when result and error are both null", async () => {
    jest.spyOn(globalUtils, "resultOrError").mockResolvedValue([null, null]);
    const store = new UserStore();

    const response = await store.getOwnUser();

    expect(response.status).toBe(ActionResultStatus.ERROR);
    expect(response).toEqual(
      expect.objectContaining({
        error: "Something went wrong.",
        knownErrors: {}
      })
    );
  });
});
