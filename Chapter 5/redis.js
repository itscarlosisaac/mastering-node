let redis = require("redis");
let client = redis.createClient();

client.set("userID", "jack", (err) => {
  client.get("userID", (err, data) => {
    console.log(data);
  });
});