module.exports = {
  servers: {
    one: {
      host: 'uh-carpool-and-go.xyz',
      username: 'root',
      password: '1changeMe'
    }
  },
  app: {
    // if you edit the app 'name' field, be sure to run 'mup stop' if the app is already running.
    // otherwise you will have two apps deployed at once, with unpredictable results.
    name: 'meteor-application-template-react',
    path: '../',
    servers: { one: {}, },
    buildOptions: { serverOnly: true },
    env: {
      ROOT_URL: 'https://uh-carpool-and-go.xyz',
      MONGO_URL: 'mongodb://mongodb/meteor',
      MONGO_OPLOG_URL: 'mongodb://mongodb/local',
    },
    docker: { image: 'zodern/meteor:latest' },
    enableUploadProgressBar: true
  },
  proxy: {
    domains: 'uh-carpool-and-go.xyz',
    ssl: {
      letsEncryptEmail: 'michaelito03@gmail.com',
      forceSSL: true
    }
  },
  mongo: { version: '5.0.5', servers: { one: {} }
  },
};
