import { FeederDikti } from "../src/feeder-dikti/index";
import { Agent } from "https";

import constants from "./constants";

describe("Action: GetToken", () => {
  describe("when credential is correct", () => {
    it("returns token", async () => {
      const api = new FeederDikti({
        host: constants.host,
        username: constants.validCreds.username,
        password: constants.validCreds.password,
        agent: new Agent({ rejectUnauthorized: false }),
      });

      await expect(api.getToken()).resolves.toBeDefined();
    });
  });

  describe("when credential is incorrect", () => {
    it("throws error", async () => {
      const api = new FeederDikti({
        host: constants.host,
        username: constants.invalidCreds.username,
        password: constants.invalidCreds.password,
        agent: new Agent({ rejectUnauthorized: false }),
      });

      await expect(api.getToken()).rejects.toThrow("username/password salah");
    });
  });
});
