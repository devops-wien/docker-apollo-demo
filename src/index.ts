import { ApolloServer, gql } from 'apollo-server'
import { TerraformApi } from './datasources/TerraformApi'

const typeDefs = gql`
	type Workspace_Set {
	    workspaces: [Workspace]
	    total: Int
	    applied: Int
	    none: Int
	}
	
	type Workspace {
		id: ID
		name: String
		createdAt: String
		updatedAt: String
	}

	type Query {
		workspaces(organizationName: String): Workspace_Set
	}
`;

const resolvers = {
    Query: {
        // Returns array of all workspaces.
        workspaces: async (obj, args, context) => {
            const ret = await context.dataSources.terraformApi.getWorkspaces(args.organizationName)
            console.log(ret['links'])
            //const statusCounts = ret.data.meta['status-counts']
            return {
                workspaces: ret.data,
                //total: statusCounts.total,
                //applied: statusCounts.applied,
                //none: statusCounts.none
            }
        },
    }
};

const context = {}
const server = new ApolloServer({
    typeDefs, 
    resolvers,
    dataSources: () => {
        return {
            terraformApi: new TerraformApi(context),
        }
    }
})

// The `listen` method launches a web server.
server.listen({port: 4001}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
});
