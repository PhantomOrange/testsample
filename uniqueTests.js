const dotenv = require("dotenv")
const expect = require("chai").expect
const nock = require("nock")
const axios = require("axios")
dotenv.config({ path: "./config.env" })

describe("Test Suite: Pension Contributions", () => {
  afterEach(() => {
    //Makes certain that all http interceptors are removed after each test so consequent tests are not affected by the results of previous tests
    nock.cleanAll()
  })

  it("Gets the current monthly contributions", async () => {
    const expectedResponse = { amount: 100 }
    nock(process.env.cushon_API)
      .get("/contributions")
      .reply(200, expectedResponse)

    const response = await axios.get(`${process.env.cushon_API}/contributions`)
    expect(response.status).to.equal(200)
    expect(response.data).to.deep.equal(expectedResponse)
  })

  it("Should update the monthly contributions with allocated amount: 200 ", async () => {
    const updatedAmount = { amount: 200 }

    nock(process.env.cushon_API)
      .put("/contributions", updatedAmount)
      .reply(200, updatedAmount)

    const response = await axios.put(
      `${process.env.cushon_API}/contributions`,
      updatedAmount
    )

    expect(response.status).to.equal(200)
    expect(response.data).to.deep.equal(updatedAmount)
  })

  it("Should update the monthly contributions with the allocated salary percentage: 3%", async () => {
    const newPercentUpdate = { percentage: 3 }
    const calcContributionAmount = { amount: 100 }
    nock(process.env.cushon_API)
      .put("/contributions", newPercentUpdate)
      .reply(200, calcContributionAmount)

    const response = await axios.put(
      `${process.env.cushon_API}/contributions`,
      newPercentUpdate
    )

    expect(response.status).to.equal(200)
    expect(response.data).to.deep.equal(calcContributionAmount)
  })

  it("Should prevent pention amount field from being updated with negative values", async () => {
    const negativeAmount = { amount: -50 }
    const responseMsg = "Incorrect value entered"
    nock(process.env.cushon_API)
      .put("/contributions", negativeAmount)
      .reply(200, responseMsg)

    const response = await axios.put(
      `${process.env.cushon_API}/contributions`,
      negativeAmount
    )

    expect(response.status).to.equal(200)
    expect(response.data).to.deep.equal(responseMsg)
  })

  it("Should prevent pention amount field from being updated with 0", async () => {
    const zeroAmount = { amount: 0 }
    const responseMsg = "Incorrect value entered"
    nock(process.env.cushon_API)
      .put("/contributions", zeroAmount)
      .reply(200, responseMsg)

    const response = await axios.put(
      `${process.env.cushon_API}/contributions`,
      zeroAmount
    )

    expect(response.status).to.equal(200)
    expect(response.data).to.deep.equal(responseMsg)
  })
})
