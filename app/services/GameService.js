const axios = require('axios');

module.exports = {
    questions : async (token, theme, difficulty, number) => {

        let response;
        // //APPEL MICROSERVICE
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
        console.log(response.data);
        return response.data;
    }
}
        