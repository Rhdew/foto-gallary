import user from './user'

const resolvers = {
    Query: {
        hello: () => `Hello world!`,
        login: user.login,
    },

    Mutation: {
        hi: () => 'hey',
        createUser: user.createUser,
    }
    
}

export { resolvers as default };