const fs = require('fs');

function openFile(path){
  fs.open(path, 'r', (err, fd) => {
    fs.fstat(fd, (err, stats) => {
      let totalBytes = stats.size;
      let buffer = Buffer.alloc(totalBytes);
      let bytesRead = 0;
      let read = chuckSize => {
        fs.read(fd, buffer, bytesRead, chuckSize, bytesRead, (err, numBytes, bufRef) => {
          if( (bytesRead += numBytes ) < totalBytes){
            return read(Math.min(512, totalBytes - bytesRead));
          }
          fs.close(fd)
          console.log(`File read complete. Total bytes read: ${totalBytes}`);
          console.log(bufRef.toString());
        });
      }
      read(Math.min(512, totalBytes));
    })
  })
}

openFile('./moving-dirs.js');