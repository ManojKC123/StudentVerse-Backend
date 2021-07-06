const { Router } = require("express");
const { container } = require("../../loaders/dependencyInjector");

const test = (app) => {
    const route = Router();
    app.use("/test", route);

    route.get("/", async (req, res) => {
        const testS = container.resolve("testS");
        const getTestService = await testS.getTestService();
        if (getTestService) {
            return res.status(200).json({ datas: getTestService });
        }
        return res.status(400).json({ status: "Fail" });
    });
};

module.exports = test;
