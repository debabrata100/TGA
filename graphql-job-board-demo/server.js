import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer as useWsServer } from "graphql-ws/lib/use/ws";
import { expressjwt } from "express-jwt";
import { readFile } from "fs/promises";
import jwt from "jsonwebtoken";
import { User } from "./db.js";
import { resolvers } from "./resolvers.js";
import { createServer } from "http";

const PORT = "5001";
const JWT_SECRET = Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64");

const app = express();

app.use(
  cors(),
  express.json(),
  expressjwt({
    algorithms: ["HS256"],
    credentialsRequired: false,
    secret: JWT_SECRET,
  })
);

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne((user) => user.email === email);
  if (user && user.password === password) {
    // generate token and return
    const token = jwt.sign({ sub: user.id }, JWT_SECRET);
    res.send({
      data: {
        token,
      },
    });
  } else {
    res.sendStatus(401);
  }
});

const httpServer = createServer(app);
const wsServer = new WebSocketServer({
  server: httpServer, // http://localhost:5001
  path: "/graphql",
});

const typeDefs = await readFile("./schema.graphql", "utf8");
const schema = makeExecutableSchema({ typeDefs, resolvers });
useWsServer({ schema }, wsServer);

const apolloServer = new ApolloServer({ schema });
await apolloServer.start();
apolloServer.applyMiddleware({ app, path: "/graphql" });

//server.applyMiddleware({ app });

httpServer.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL server running at http://localhost:${PORT}/graphql`);
});
