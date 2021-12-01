const axios = require('axios');
const { response } = require('express');

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
            if(e.hasOwnProperty('response')){
                if(e.response.status == 401){
                    return {"error" : "Mauvais identifiant ou mot de passe"};
                }
            }
            return {"error" : "Une erreur inattendu est survenu, veuillez réessayer plus tard"};
        }
        return response.data;
    },

    register : async (user) => {
        if(!user.pseudo || !user.email || !user.password){
            return {"error" : "Données invalides"};
        }
        
        // APPEL MICROSERVICE
        let response;
        try {
            response = await axios.get(MICROSERVICE_USER+"/register", {data : {'pseudo' : user.pseudo, 'email' : user.email, 'password' : user.password}});
        }catch(e){
            if(e.hasOwnProperty('response')){
                if(e.response.status == 400){
                    return {"error" : "Un champ est erroné"};
                }else if(e.response.status == 409){
                    return {"error" : "Un utilisateur existe déjà avec cet email"};
                }
            }
            return {"error" : "Une erreur inattendu est survenu, veuillez réessayer plus tard"};
        }
        console.log(response.data);
        return response.data;
    },

    checkToken : async (token) =>{
        let response;
        try {
            response = await axios.get(MICROSERVICE_USER+"/validate", {data : {'token' : token}});
        }catch(e){
            return false;
        }
        return response;
    }


}
