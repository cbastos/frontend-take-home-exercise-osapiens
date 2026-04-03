import { buildUrl, validateParams } from "./router";

describe("validateParams", () => {
  it("returns false when params is not an object", () => {
    const result = validateParams("/event/:eventId", null);

    expect(result).toBe(false);
  });

  it("returns false when a required param is missing", () => {
    const result = validateParams("/event/:eventId/user/:userId", { eventId: "123" });

    expect(result).toBe(false);
  });

  it("returns true when all required params are present", () => {
    const result = validateParams("/event/:eventId/user/:userId", {
      eventId: "123",
      userId: "456"
    });

    expect(result).toBe(true);
  });
});

describe("buildUrl", () => {
  it("returns url with all params replaced", () => {
    const url = buildUrl("/event/:eventId/user/:userId", {
      eventId: "123",
      userId: "456"
    });

    expect(url).toBe("/event/123/user/456");
  });

  it("returns original path when no params are provided", () => {
    const url = buildUrl("/home", {});

    expect(url).toBe("/home");
  });
});
