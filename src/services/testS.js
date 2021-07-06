class testS {
    constructor({ testD }) {
        this.testD = testD;
    }

    async getTestService() {
        try {
            const testData = await this.testD.testData();
            if (testData) {
                return testData;
            }
        } catch (e) {
            return false;
        }
    }
}
module.exports = testS;
