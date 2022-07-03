import { file } from "../lib/file.js";
import { IsValid } from "../lib/is-valid/IsValid.js";
import { utils } from "../lib/utils.js";

const handler = {};

handler.account = async (data, callback) => {
    // kliento intensija - ka jis nori daryti?
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        const httpMethodFunc = handler._innerMethods[data.httpMethod];
        return await httpMethodFunc(data, callback);
    }

    return callback(405, {
        msg: 'Tavo norimas HTTPmethod yra nepalaikomas',
    });
}

handler._innerMethods = {};

// POST - sukuriame paskyra
handler._innerMethods.post = async (data, callback) => {
    return callback(200, {
        msg: 'Token sukurtas sekmingai',
    });
}

// GET
handler._innerMethods.get = async (data, callback) => {
    return callback(200, {
        msg: 'Token informacija',
    });
}

// PUT (kapitalinis info pakeistimas)
handler._innerMethods.put = async (data, callback) => {
    return callback(200, {
        msg: 'Token informacija sekmingai atnaujinta',
    });
}

// DELETE
handler._innerMethods.delete = async (data, callback) => {
    return callback(200, {
        msg: 'Token istrintas sekmingai',
    });
}

export default handler;