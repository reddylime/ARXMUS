const fs = require('fs');
const path = require('path');

const storeFile = (tmpFile, storeDir) => {
  try {
    const reader = fs.createReadStream(tmpFile.path);
    const localPath = path.join(storeDir, `${Date.now() + tmpFile.name}`);
    const stream = fs.createWriteStream(localPath);
    reader.pipe(stream);
    return localPath;
  } catch (err) {
    throw err;
  }
};

const storeFiles = (whiteList, files) => {
  const URIs = {};
  whiteList.forEach((name) => {
    if (files[name]) {
      const curPath = storeFile(files[name], `./storage/${name}s`);
      URIs[name] = curPath;
    }
  });
  return URIs;
};

module.exports = {
  storeFile,
  storeFiles,
};
