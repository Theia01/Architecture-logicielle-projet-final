const axios = require('axios');

module.exports = {
    questions : async (token, theme, difficulty, number) => {
        // //APPEL MICROSERVICE
        let response;
        try {
            response = await axios.get(MICROSERVICE_GAME+"/questions", {data : {'token' : token, 'theme' : theme, 'difficulty': difficulty, 'number' : number}});
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

    getCategories : async() =>{
        let response;
        try {
            response = await axios.get(MICROSERVICE_GAME+"/categories");
        }catch(e){
            return {"error" : "Une erreur inattendu est survenu, veuillez réessayer plus tard"};
        }
        return response.data;
    }
}
        