import app from "./index.js";

let port;
if (process.env.PORT) {
  port = process.env.PORT;
} else {
  port = 3000;
}

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
