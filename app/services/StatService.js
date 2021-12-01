const axios = require('axios');

module.exports = {

    addStat : async (token, numberOfQuestions, score, name)=>{
        let response;
        try {
            response = await axios.get(MICROSERVICE_STAT+"/games", {data : {'token' : token, 'game' : {'name' : name, 'numberOfQuestions' : numberOfQuestions, 'finalScore': score}}});
        }catch(e){
            if(e.hasOwnProperty('response')){
                if(e.response.status == 401){
                    return {"error" : "login-again"};
                }
            }
            return {"error" : "Une erreur inattendu est survenu, veuillez réessayer plus tard"};
        }
        console.log(response.data);
        return response.data;
    },
    
    getScore : async (token) =>{
        let response;
        try {
            response = await axios.get(MICROSERVICE_STAT+"/stat", {data : {'token' : token}});
        }catch(e){
            if(e.hasOwnProperty('response')){
                if(e.response.status == 401){
                    return {"error" : "login-again"};
                }
            }
            return {"error" : "Une erreur inattendu est survenu, veuillez réessayer plus tard"};
        }
        return response.data;
    },

    getListGame : async (token) =>{
        let response;
        try {
            response = await axios.get(MICROSERVICE_STAT+"/games", {data : {'token' : token}});
        }catch(e){
            if(e.hasOwnProperty('response')){
                if(e.response.status == 401){
                    return {"error" : "login-again"};
                }
            }
            return {"error" : "Une erreur inattendu est survenu, veuillez réessayer plus tard"};
        }
        return response.data;
    }
}