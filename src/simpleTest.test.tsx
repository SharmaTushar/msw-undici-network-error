import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { useEffect, useState } from "react";

const server = setupServer(
  http.get("*", ({ request }) => {
    console.log("Handling request", request.url);
    return HttpResponse.json({
      abc: 123,
    });
  })
);

server.events.on("request:start", ({ request }) => {
  console.log("Outgoing:", request.method, request.url);
});

const SimpleComponent = () => {
  const [state, setState] = useState("");
  useEffect(() => {
    axios
      .get("/test")
      .then(() => setState("123"))
      .catch((error) => {
        console.error(error);
        return setState("456");
      });
  }, []);

  return <div>{state}</div>;
};

describe("Simple Test", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("runs without errors", async () => {
    render(<SimpleComponent />);
    await waitFor(() => {
      expect(screen.getByText("123")).toBeInTheDocument();
    });
  });
});
