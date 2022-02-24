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
export declare class FeederDikti {
    /**
     * Object yang berisi konfigurasi untuk melakukan request
     */
    options: FeederOptions;
    /**
     * Token yang digunakan untuk melakukan request
     */
    token: string;
    constructor(options: FeederOptions);
    /**
     * Mendapatkan Token untuk dipakai sebagai parameter di fungsi web service lainnya
     * `act: "GetToken"`
     */
    getToken(): Promise<string>;
    /**
     * Mengambil data
     * @param action Jenis data yang ingin diambil
     * @param options Opsi dalam pengambilan data
     */
    get<K extends Get, T extends GetResponse>(action: K, options?: GetOptions): Promise<[T[K]]>;
    /**
     * Menambahkan data
     * @param action Jenis data yang ingin ditambahkan
     * @param record Isi data yang ingin ditambahkan
     * @param options Opsi dalam penambahan data
     */
    insert<K extends Insert, T extends InsertAction>(action: K, record: T[K], options?: InsertOptions): Promise<any>;
    /**
     * Memperbarui data
     * @param action Jenis data yang ingin diperbarui
     * @param key Key dari data yang ingin diperbarui
     * @param record Isi dari data yang ingin diperbarui
     * @param options Opsi dalam pembaruan data
     */
    update<K extends Update, T extends UpdateAction>(action: K, key: T[K]["key"], record: T[K]["record"], options?: UpdateOptions): Promise<any>;
    /**
     * Menghapus data
     * @param action Jenis data yang ingin dihapus
     * @param key Key dari data yang ingin dihapus
     * @param options Opsi dalam penghapusan data
     */
    delete<T extends DeleteAction, K extends keyof DeleteAction>(action: K, key: T[K], options?: DeleteOptions): Promise<any>;
}
