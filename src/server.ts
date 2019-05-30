import { ApolloServer } from 'apollo-server-express';
import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';
import * as depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import schema from './schema';

const allowDepth: number = 7;
const app = express();
const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(allowDepth)],
});

app.use('*', cors());
app.use(compression());

app.get('/test', (req, res, next) => {
  console.log('Request Type:', req.method);

  res.send('OK');

  next();
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);

httpServer.listen({ port: 3000 }, (): void =>
  console.log('GraphQL is now running at http://localhost:3000/graphql')
);
