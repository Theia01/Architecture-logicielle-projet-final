const axios = require('axios');

module.exports = {

    login : async (email, password) => {
        if(email == null || password == null){
            return {"error" : "Données invalides"};
        }
        let response;

        // //APPEL MICROSERVICE
        try {
            response = await axios.get(MICROSERVICE_USER+"/login", {data : {'email' : email, 'password' : password}});
        }catch(e){
            console.error(e.response);
            if(e.response.status){
                if(e.response.status == 401){
                    return {"error" : "Mauvais identifiant ou mot de passe"};
                }
            }
            return {"error" : "Une erreur inattendu est survenu, veuillez réessayer plus tard"};
        }
        console.log(response.data.token);
        return response.data;
    },

    register : async (user) => {
        if(!user.pseudo || !user.email || !user.password){
            throw new Error('Données invalides');
        }
        
        // APPEL MICROSERVICE
        let response;
        try {
            response = await axios.post(MICROSERVICE_USER+"/register", {'username' : user.pseudo, 'mail' : user.email, 'password' : user.password});
        }catch(e){
            console.error(e.response ? e.response.data : e)
            return
        }

        return user = {pseudo : "JohnDoe", mail : "johndoe@gmail.com", id : "1"};
    }


}
