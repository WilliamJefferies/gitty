const fs = require('fs');
const path = require('path');

/*
Handles and transforms file paths
 */
module.exports = {
    getCurrentDirectoryBase: () => {
        path.basename(process.cwd());
    },
    directoryExists: (filePath) => {
        try {
            return fs.statSync(filePath).isDirectory();
        } catch (e) {
            return false
        }
    }
};
