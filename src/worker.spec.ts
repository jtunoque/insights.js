import { init } from "./worker";
import nock from "nock";

describe("worker", (): void => {
  describe("init", (): void => {
    it("should return a promise", (): Promise<void> => {
      /* eslint-disable @typescript-eslint/camelcase */
      const fakeResponse: Config = {
        apiKey: "d00fe9b6-91c6-4434-8e77-14630e263a26",
        session:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkMDBmZTliNi05MWM2LTQ0MzQtOGU3Ny0xNDYzMGUyNjNhMjYiLCJleHAiOjE1NTY3MDUxNjIsImlhdCI6MTU1NjcwNTEwM30.Pig3FCY94l2vIfBsIHAPsCzE2mgkGpXcbe0QKHPJcq4",
        hosts: {
          host: "test.fastly-insights.com",
          lookup: "eu.u.test.fastly-insights.com"
        },
        settings: {
          initial_delay: 0,
          max_tasks: 20,
          report_errors: false,
          sample_rate: 0.4
        },
        server: {
          datacenter: "LCY"
        },
        tasks: [
          {
            name: "MAD",
            req_header: "",
            resource: "https://mad-v4.pops.test.fastly-insights.com/o.svg",
            resp_header: "",
            type: "pop",
            weight: 3.23
          },
          {
            name: "LCY",
            req_header: "",
            resource: "https://lcy-v4.pops.test.fastly-insights.com/o.svg",
            resp_header: "",
            type: "pop",
            weight: 1.01
          },
          {
            name: "rtt",
            req_header: "",
            resource: "https://www.fastly-insights.com/rtt.json",
            resp_header: "",
            type: "fetch",
            weight: 1
          }
        ]
      };
      /* eslint-enable @typescript-eslint/camelcase */

      nock("https://api.fastly.com")
        .defaultReplyHeaders({ "access-control-allow-origin": "*" })
        .get("/api/url")
        .reply(200, fakeResponse);

      return init().then(
        (output): void => {
          expect(output.apiKey).toEqual("d00fe9b6-91c6-4434-8e77-14630e263a26");
        }
      );
    });
  });
});
