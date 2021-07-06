const { web: config } = require("../src/config");
const express = require("express");
const mustacheExpress = require("mustache-express");
const cors = require("cors");

async function startServer() {
    const app = express();

    app.use(cors());
    app.options("*", cors());
    app.engine("mustache", mustacheExpress());
    app.set("view engine", "mustache");
    app.set("views", "public");
    app.use(express.static("public"));

    const port = config.port;
    await require("./loaders")(app);

    app.listen(port, (err) => {
        if (err) {
            console.log(err);
            process.exit(1);
            return;
        }

        console.log("Example app listening on port " + port);
    });
}

startServer();
