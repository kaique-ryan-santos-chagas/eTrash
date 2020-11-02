const AssistantV1 = require('ibm-watson/assistant/v1');
const { BasicAuthenticator } = require('ibm-watson/auth');

require('dotenv')

const assistant = new AssistantV1({
  version: '2020-04-01',
  authenticator: new BasicAuthenticator({
    username: 'apikey',
    password: '6agMhFUrxXswRZpTgqaoc1WDjK1klo81uv8J4r-6Frwq',
  }),
  url: process.env.ASSISTANT_URL
});

module.exports = {
      async sendChat(req,res){
        const {message} = req.body;
        
        assistant.message({
          workspaceId: '5ac6cc3d-0e5b-4ea5-b862-f587da634ffc',
          input: {'text': message}
          })
          .then(response => {
            res.send(response.result, null, 2);
          })
          .catch(err => {
            res.send('Sem conexão com a internet.');
          });
      }
    }