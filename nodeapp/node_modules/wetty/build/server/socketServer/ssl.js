import fs from 'fs-extra';
import isUndefined from 'lodash/isUndefined.js';
import { resolve } from 'path';
export async function loadSSL(ssl) {
    if (isUndefined(ssl) || isUndefined(ssl.key) || isUndefined(ssl.cert))
        return {};
    const [key, cert] = await Promise.all([
        fs.readFile(resolve(ssl.key)),
        fs.readFile(resolve(ssl.cert)),
    ]);
    return { key, cert };
}
//# sourceMappingURL=ssl.js.map