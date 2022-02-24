import { FeederDikti } from "../src/index";
import { Agent } from "https";

import constants from "./constants";

const api = new FeederDikti({
  host: constants.host,
  username: constants.validCreds.username,
  password: constants.validCreds.password,
  agent: new Agent({ rejectUnauthorized: false }),
});

const expectedResult = [
  {
    id_agama: "1",
    nama_agama: "Islam",
  },
  {
    id_agama: "2",
    nama_agama: "Kristen",
  },
  {
    id_agama: "3",
    nama_agama: "Katolik",
  },
  {
    id_agama: "4",
    nama_agama: "Hindu",
  },
  {
    id_agama: "5",
    nama_agama: "Budha",
  },
  {
    id_agama: "6",
    nama_agama: "Khonghucu",
  },
  {
    id_agama: "99",
    nama_agama: "Lainnya",
  },
];

describe("Action: GetAgama", () => {
  describe("when using no token", () => {
    it("returns correct data", async () => {
      await expect(api.get("Agama")).resolves.toEqual(
        expect.arrayContaining(expectedResult)
      );
    });
  });

  describe("when using token", () => {
    it("returns correct data", async () => {
      const token = await api.getToken();

      await expect(api.get("Agama", { token })).resolves.toEqual(
        expect.arrayContaining(expectedResult)
      );
    });
  });

  describe("when using no filter", () => {
    it("returns correct data", async () => {
      await expect(api.get("Agama")).resolves.toEqual(
        expect.arrayContaining(expectedResult)
      );
    });
  });

  describe("when using filter", () => {
    it("returns correct data", async () => {
      await expect(
        api.get("Agama", { filter: "id_agama = 1" })
      ).resolves.toEqual([expectedResult[0]]);
    });
  });

  describe("when using limit", () => {
    it("returns correct data", async () => {
      await expect(api.get("Agama", { limit: 1 })).resolves.toEqual([
        expectedResult[0],
      ]);
    });
  });

  describe("when using limit and offset", () => {
    it("returns correct data", async () => {
      await expect(api.get("Agama", { limit: 2, offset: 1 })).resolves.toEqual([
        expectedResult[1],
        expectedResult[2],
      ]);
    });
  });

  describe("when using order", () => {
    it("returns correct data", async () => {
      await expect(
        api.get("Agama", {
          order: "nama_agama desc",
        })
      ).resolves.toEqual(
        expectedResult.sort((a, b) => {
          if (a.nama_agama > b.nama_agama) {
            return -1;
          }

          if (b.nama_agama > a.nama_agama) {
            return 1;
          }

          return 0;
        })
      );
    });
  });
});
