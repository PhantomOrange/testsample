# General Overview

This readme file aims to provide an overview of the thought process that has been applied in the preliminary phase of designing an effective testing suite. Please bear in mind that not all variables have been accounted for in this stage.

The task has been approached by dividing it into three main aspects: test range, notification, and integration.

## Test Range

Without fully comprehending the entire set of requirements for the API, it would be impossible to generate appropriate and complete test cases to cover all aspects of testing the API. As a result, only a select sample of test cases has been included in the code samples provided. In the past, when faced with such situations, I've adopted the use of best-practice designs to test the functionalities or scenarios an effectively designed API should be able to handle. This includes systems' load testing, rate limiting, and authentication.

## Notification

This aspect is essential for a mature testing framework. Implementing an effective test suite is futile if access to the results is restricted. However, setting up an email system or other types of notifications at this stage would not be ideal, as it introduces an additional layer of complexity.
It also might generate excessive emails if a test fails repeatedly. Effective notification should ideally be implemented at a higher level of abstraction, once the test suite is integrated with a Continuous Integration (CI) tool.
Though there are cases where implementing a notification system at the test level can be beneficial, it will be omitted in this test sample.

## Integration

Finally, once the test suite is fully designed, it will need to be integrated with a CI tool. Due to a lack of insight into how Cushion deploys changes into the available code bases, this section will also be omitted.

To summarise, the code samples in this repository focus on developing test cases for the specific scenario within the allocated task.

# Technical Overview

This project contains two runnable files, each illustrating a different approach I would take in writing test cases for the Cushion task.

`File 1 (uniqueTests.js)` delineates each test case as a unique function with associated code. The advantages of this approach are:

- Flexibility: Each test case is unique and somewhat self-contained, allowing customization and alterations on the fly in an agile setting.
- Versioning: As this is primarily code-based, changes can be easily tracked if versioned in Git.

The disadvantages include:

- Scaling: Adding new test cases can be time-consuming as new code needs to be written for each one.
- Accessibility: This method is less user-friendly for non-technical individuals.

`File 2 (StandardTests.js)` adopts a data-driven approach, with code written to handle multiple similar test cases. The benefits of this approach are:

- Scalability: Quicker to scale.
- Reusability: Data files can be reused by other test suites if needed.
- User-friendly: Non-technical users may find it easier to work with JSON, CSV, or TSV files than code.

The drawbacks are:

- Lack of flexibility: Test cases usually follow a similar scheme.
- Versioning: Tracking version changes to JSON or other data files can be challenging.

In conclusion, samples of both approaches have been provided as they each have their strengths and weaknesses, and their utility depends on the context. Based on my understanding of the API, I would opt for a data-driven approach, with the possibility to expand and create more unique test cases as necessary.

# Usage Instructions / Code Explanation

In summary, the code samples provided allow the user to run a series of HTTP request tests against an API using predefined test cases (`testCases.json` for File 2). Nock is used to mock API responses, and Chai's expect is used for assertions to verify that the responses match the expected status code and content defined in the test cases. Obviously, the inclusion of Nock would not be required in a production environment and is only used here to illustrate the interaction between an API and our test cases.

To run `StandardTests.js`, use:
npm run testST

To run `uniqueTests.js`, use:
npm run testUT

Note: You will need to have Node.js installed as a prerequisite to run both files. Also, it is worth noting that while the config file has also been committed to GitHub, this is not usual or good practice and has only been done in this instance as part of the test exercise.
