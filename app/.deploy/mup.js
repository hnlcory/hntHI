module.exports = {
  servers: {
    one: {
      host: '167.71.66.48',
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
      ROOT_URL: 'http://167.71.66.48',
      MONGO_URL: 'mongodb://mongodb/meteor',
      MONGO_OPLOG_URL: 'mongodb://mongodb/local',
    },
    docker: { image: 'zodern/meteor:latest' },
    enableUploadProgressBar: true
  },
  mongo: { version: '5.0.5', servers: { one: {} }
  },
};
