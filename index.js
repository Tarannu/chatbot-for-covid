// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
const axios=require('axios');
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

 
  /*function rhymehandler(agent){
   const word = agent.parameters.word;
    agent.add(`Here are the rhyming words for ${word}`);
    return axios.get(`https://api.datamuse.com/words?rel_rhy=${word}`)
    .then((result) => {
        result.data.map(wordObj => {
        	agent.add(wordObj.word);
        });
    });
  }*/
  function covsymHandler(agent) {
    const virus = agent.parameters.virus;
    agent.add('intent called'+ virus);
    
  }
  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  //intentMap.set('RhymingWord', rhymehandler);
  intentMap.set('COVIDsymptom', covsymHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
