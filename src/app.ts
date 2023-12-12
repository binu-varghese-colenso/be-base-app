import fastify, { FastifyInstance } from "fastify";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import fastifyRawBody from 'fastify-raw-body';
import jwtMiddleware from './middlewares/jwtMiddleware';
import forgerockRoutes from "./routes/forgerock";
import snipRoutes from "./routes/snip";
import authRoutes from "./routes/auth/routes"; // Importing a combined auth route file
import { version } from "../package.json";

let isTerminating = false;
const isProd = process.env.NODE_ENV === "production";
// readiness probe is set failureThreshold: 2, periodSeconds: 2 (4s) + small delay
const GRACEFUL_DELAY = 2 * 2 * 1000 + 5000;

const app: FastifyInstance = fastify({
  logger: {
    level: process.env.LOG_LEVEL || "info",
  },
  trustProxy: true,
});

const gracefulShutdown = () => {
  app.log.info("starting termination");
  isTerminating = true;
  setTimeout(async () => {
    await app.close();
    process.exit();
  }, GRACEFUL_DELAY);
};
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

app.register(helmet);
// Configure CORS
app.register(cors, {
  origin: (origin, cb) => {
    // Allow requests with no 'origin' (like mobile apps, curl, etc.)
    if (!isProd || !origin) return cb(null, true);

    // Check if the origin is a subdomain of goodpoints.com
    if (/^[a-zA-Z0-9-]+\.goodpoints\.com$/.test(origin)) {
      // Allow
      return cb(null, true);
    }

    // Block other origins
    return cb(new Error("Not allowed by CORS"), false);
  },
  methods: ["GET", "PUT", "POST"],
});

// JWT auth middleware
app.register(jwtMiddleware);

app.register(fastifyRawBody, {
    field: 'rawBody',
    global: false,
    encoding: 'utf8',
    runFirst: true,
  });

  app.setErrorHandler((err, req, res) => {
    req.log.error({ err }, err.message);
    res.code(500).send({ statusCode: 500, error: 'Internal Server Error' });
  });

  app.get('/health', (req, res) => {
    if (isTerminating) {
      res.status(500).send({
        status: "down",
        version: version,
      });
    } else {
      res.send({
        status: "up",
        version: version,
      });
    }
  });

  app.get('/liveness', (req, res) => {
    res.send({
        status: "up",
        version: version,
      });
  });

// Prefix all routes with '/api'
app.register(forgerockRoutes, { prefix: "/api" });
app.register(snipRoutes, { prefix: "/api" });
app.register(authRoutes, { prefix: "/api" });


export default app;
