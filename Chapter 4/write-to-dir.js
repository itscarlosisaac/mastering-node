const fs = require('fs');
const readline = require('readline');

function WriteQuestion(){
  let cells = 186; // 6 * 31
  let buffer = Buffer.alloc(cells);
  let rand;

  while (cells--) {
    rand = Math.floor(Math.random() * 3);
    buffer[cells] = rand === 0 ? 78 : rand === 1 ? 87 : 76;
  }

  fs.open("scores.txt", "r+", (err, fd) => {
    fs.write(fd, buffer, 0, buffer.length, 0, (err, writtenBytes, buffer) => {
      let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      let quest = () => {
        rl.question("month/day", index => {
          if (!index) return rl.close();
          let md = index.split('/');
          let pos = parseInt(md[0] - 1) * 31 + parseInt(md[1] - 1);
          fs.read(fd, Buffer.alloc(1), 0, 1, pos, (err, bytesRead, buff ) => {
            let v = buff.toString();
            console.log( v === "W" ? "Win!" : v === "L" ? "Loss..." : "No Game");
            quest();
          });
        });
      };
      quest();
    });
  });
}

fs.writeFile('test.txt', 'A string in the file. ', err  => {
  if ( err ) { return console.log(err); }
});

fs.appendFile('test.txt', 'This data to Append', err => {
  if (err) return console.log(err)
})