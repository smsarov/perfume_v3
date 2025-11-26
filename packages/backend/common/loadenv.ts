import path from "path";
import dotenvFlow from "dotenv-flow";

dotenvFlow.config({
  path: path.resolve(__dirname, "../../../")
});
