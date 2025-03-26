require("dotenv").config();
const app = require("./config/app");

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  return res.json({ Hello: "Hello" });
});

app.listen(PORT, () => {
  console.log(`Successfully served on port: ${PORT}`);
});
