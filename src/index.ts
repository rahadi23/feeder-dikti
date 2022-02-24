import { Agent } from "http";
import fetch, { RequestInit } from "node-fetch";

import Response from "./classes/Response";

import { GetActions } from "./constants/get.actions";
import { InsertActions } from "./constants/insert.actions";
import { DeleteActions } from "./constants/delete.actions";
import { UpdateActions } from "./constants/update.actions";

import { Get } from "./types/get.type";
import { Insert } from "./types/insert.type";
import { Update } from "./types/update.type";

import { FeederOptions } from "./types/options/feeder.option.type";
import { GetOptions } from "./types/options/get.option.type";
import { InsertOptions } from "./types/options/insert.option.type";
import { UpdateOptions } from "./types/options/update.option.type";
import { DeleteOptions } from "./types/options/delete.option.type";

import { InsertAction } from "./types/actions/insert.action.type";
import { UpdateAction } from "./types/actions/update.action.type";
import { DeleteAction } from "./types/actions/delete.action.type";

import { GetResponse } from "./types/responses/get.response.type";

/**
 * Mendapatkan URL Endpoint
 */
function getEndpoint(host: string, endpoint: string): string {
  return `${host}/${endpoint}`;
}

/**
 * Membuat body dengan method post dan data berupa json
 */
function createPostJsonBody(
  data: { act: string; body: any },
  agent: Agent | ((parsedUrl: URL) => Agent)
): RequestInit {
  return {
    method: "post",
    body: JSON.stringify({ act: data.act, ...data.body }),
    headers: { "Content-Type": "application/json" },
    agent: agent,
  };
}

export class FeederDikti {
  /**
   * Object yang berisi konfigurasi untuk melakukan request
   */
  options: FeederOptions;
  /**
   * Token yang digunakan untuk melakukan request
   */
  token: string;

  constructor(options: FeederOptions) {
    this.options = {
      host: "",
      username: "",
      password: "",
      endpoint: "ws/live2.php",
    } as FeederOptions;

    Object.assign(this.options, options);
  }

  /**
   * Mendapatkan Token untuk dipakai sebagai parameter di fungsi web service lainnya
   * `act: "GetToken"`
   */
  async getToken() {
    try {
      const request = await fetch(
        getEndpoint(this.options.host, this.options.endpoint),
        createPostJsonBody(
          {
            act: "GetToken",
            body: {
              username: this.options.username,
              password: this.options.password,
            },
          },
          this.options.agent
        )
      );

      const response = await request.json();
      const creds = new Response(response, "GetToken");

      if (creds.data) {
        this.token = creds.data.token;
        return this.token;
      }

      throw creds.error;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Mengambil data
   * @param action Jenis data yang ingin diambil
   * @param options Opsi dalam pengambilan data
   */
  async get<K extends Get, T extends GetResponse>(
    action: K,
    options: GetOptions = {}
  ): Promise<[T[K]]> {
    try {
      if (!options || (options && !options.token)) {
        options.token = await this.getToken();
      }

      const request = await fetch(
        getEndpoint(this.options.host, this.options.endpoint),
        createPostJsonBody(
          {
            act: GetActions[action],
            body: options,
          },
          this.options.agent
        )
      );

      const response = await request.json();
      const result = new Response(response, GetActions[action]);

      if (result.data) {
        return result.data;
      }

      throw result.error;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Menambahkan data
   * @param action Jenis data yang ingin ditambahkan
   * @param record Isi data yang ingin ditambahkan
   * @param options Opsi dalam penambahan data
   */
  async insert<K extends Insert, T extends InsertAction>(
    action: K,
    record: T[K],
    options: InsertOptions = {}
  ) {
    try {
      if (!options || (options && !options.token)) {
        if (!this.token) {
          await this.getToken();
        }

        options.token = this.token;
      }

      const request = await fetch(
        getEndpoint(this.options.host, this.options.endpoint),
        createPostJsonBody(
          {
            act: InsertActions[action],
            body: {
              token: options.token,
              record,
            },
          },
          this.options.agent
        )
      );

      const response = await request.json();
      const result = new Response(response, InsertActions[action]);

      if (result.data) {
        return result.data;
      }

      throw result.error;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Memperbarui data
   * @param action Jenis data yang ingin diperbarui
   * @param key Key dari data yang ingin diperbarui
   * @param record Isi dari data yang ingin diperbarui
   * @param options Opsi dalam pembaruan data
   */
  async update<K extends Update, T extends UpdateAction>(
    action: K,
    key: T[K]["key"],
    record: T[K]["record"],
    options: UpdateOptions = {}
  ) {
    try {
      if (!options || (options && !options.token)) {
        if (!this.token) {
          await this.getToken();
        }

        options.token = this.token;
      }

      const request = await fetch(
        getEndpoint(this.options.host, this.options.endpoint),
        createPostJsonBody(
          {
            act: UpdateActions[action],
            body: {
              token: options.token,
              key,
              record,
            },
          },
          this.options.agent
        )
      );

      const response = await request.json();
      const result = new Response(response, UpdateActions[action]);

      if (result.data) {
        return result.data;
      }

      throw result.error;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Menghapus data
   * @param action Jenis data yang ingin dihapus
   * @param key Key dari data yang ingin dihapus
   * @param options Opsi dalam penghapusan data
   */
  async delete<T extends DeleteAction, K extends keyof DeleteAction>(
    action: K,
    key: T[K],
    options: DeleteOptions = {}
  ) {
    try {
      if (!options || (options && !options.token)) {
        if (!this.token) {
          await this.getToken();
        }

        options.token = this.token;
      }

      const request = await fetch(
        getEndpoint(this.options.host, this.options.endpoint),
        createPostJsonBody(
          {
            act: DeleteActions[action],
            body: {
              token: options.token,
              key,
            },
          },
          this.options.agent
        )
      );

      const response = await request.json();
      const result = new Response(response, DeleteActions[action]);

      if (result.data) {
        return result.data;
      }

      throw result.error;
    } catch (err) {
      throw err;
    }
  }
}
