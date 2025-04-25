const app = require("./src/app");

app.listen(process.env.PORT || 3001, () => {
  console.log("Auth service is running on port", process.env.PORT || 3001);
});
