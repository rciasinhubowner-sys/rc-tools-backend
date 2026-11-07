
import express from "express";
import helmet from "helmet";
import admin from "firebase-admin";

const app = express();

app.use(helmet());
app.use(express.json({ limit: "32kb" }));

const PORT = process.env.PORT || 10000;

const requiredSecrets = [
  "STEXS_API_KEY",
  "DONGVAN_API_KEY",
  "RC_API_KEY",
];

let firebaseReady = false;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });

    firebaseReady = true;
  } catch (error) {
    console.error("Firebase initialization failed");
  }
}

app.get("/", (req, res) => {
  res.json({
    status: "online",
    service: "RC Tools Backend",
    version: "1.0.0",
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    firebase: firebaseReady,
    secretsConfigured: requiredSecrets.every(
      key => Boolean(process.env[key])
    ),
  });
});

// Verify Firebase user
async function authenticate(req, res, next) {
  if (!firebaseReady) {
    return res.status(503).json({
      error: "Authentication service unavailable",
    });
  }

  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ")
    ? header.slice(7)
    : "";

  if (!token) {
    return res.status(401).json({
      error: "Authentication required",
    });
  }

  try {
    req.user = await admin.auth().verifyIdToken(token);
    next();
  } catch {
    return res.status(401).json({
      error: "Invalid authentication token",
    });
  }
}

app.get("/api/profile", authenticate, (req, res) => {
  res.json({
    uid: req.user.uid,
    authenticated: true,
  });
});

// Placeholder: integrate provider APIs after confirming
// their actual endpoints and request formats.
app.post("/api/provider/:name", authenticate, async (req, res) => {
  return res.status(501).json({
    error: "Provider integration not configured",
    message: "Configure the verified provider endpoint first.",
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`RC Tools Backend running on port ${PORT}`);
});

