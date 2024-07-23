const express = require("express");
const next = require("next");
const cors = require("cors");
const path = require("path");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: "./client" });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  // Enable CORS
  server.use(cors());

  // Serve static files from the client directory
  server.use(express.static(path.join(__dirname, "client/.next")));

  // Custom route example (optional)
  server.get("/custom", (req, res) => {
    return app.render(req, res, "/custom", req.query);
  });

  // Default catch-all handler to allow Next.js to handle all other routes
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
