import { ApolloServer, gql } from "apollo-server-express";
import {
	ApolloServerPluginDrainHttpServer,
	ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import http from "http";
import { Application } from "express";

const books = [
	{
		title: "The Awakening",

		author: "Kate Chopin",
	},

	{
		title: "City of Glass",

		author: "Paul Auster",
	},
];

const typeDefs = gql`
	type Query {
		books: [Book]
	}

	type Book {
		name: String
		author: Author
	}

	type Author {
		name: String
		books: [Book]
	}
`;

const resolvers = {
	Query: {
		books: () => books,
	},
};

export const startApollo = async (app: Application) => {
	const httpServer = http.createServer(app);

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		csrfPrevention: true,
		cache: "bounded",
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),
			ApolloServerPluginLandingPageLocalDefault({ embed: true }),
		],
	});

	await server.start();
	server.applyMiddleware({ app });
};
