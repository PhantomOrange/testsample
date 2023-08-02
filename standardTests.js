const dotenv = require("dotenv")
const expect = require("chai").expect
const nock = require("nock")
const axios = require("axios")
const testCases = require("./testCases.json") // path to your JSON file
dotenv.config({ path: "./config.env" })

describe("Test Suite: Pension Contributions", () => {
  afterEach(() => {
    //Makes certain that all http interceptors are removed after each test so consequent tests are not affected by the results of previous tests
    nock.cleanAll()
  })
  testCases.forEach((testCase) => {
    it(testCase.description, async () => {
      nock(process.env.cushon_API)
        [testCase.method](
          testCase.path,
          testCase.method === "get" ? undefined : testCase.payload
        )
        .reply(testCase.expectedStatus, testCase.expectedResponse)

      const response = await axios[testCase.method](
        `${process.env.cushon_API}${testCase.path}`,
        testCase.method === "get" ? undefined : testCase.payload
      )

      expect(response.status).to.equal(testCase.expectedStatus)
      expect(response.data).to.deep.equal(testCase.expectedResponse)
    })
  })
})
