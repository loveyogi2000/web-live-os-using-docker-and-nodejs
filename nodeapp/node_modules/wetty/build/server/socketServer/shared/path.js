import findUp from 'find-up';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
const filePath = dirname(findUp.sync('package.json', {
    cwd: dirname(fileURLToPath(import.meta.url)),
}) || process.cwd());
export const assetsPath = (...args) => resolve(filePath, 'build', ...args);
//# sourceMappingURL=path.js.map