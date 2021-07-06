const test = require("./routes/test");
const { Router } = require("express");

const router = () => {
    const app = Router();
    test(app);

    return app;
};

module.exports = router;
