import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
import { connect } from "./config/database";
import { resolvers } from "./resolvers/index.resolver"
import { typeDefs } from "./typeDefs/index.typeDef";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import bodyParser from "body-parser";

const app: Express = express();
const port: number = 3000;
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


// Kết nối MongoDB
connect(process.env.MONGO_URL!);

// GraphQL API

const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});


(async () => {
  await server.start();
  app.use('/graphql', expressMiddleware(server));

  httpServer.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}`);
  });
})();
