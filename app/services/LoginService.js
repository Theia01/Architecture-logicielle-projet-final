module.exports = {

    login : async (email, password) => {
        if(email == null || password == null){
            throw new Error('Données invalides');
        }
        let response;

        // //APPEL MICROSERVICE
        // try {
        //     response = await axios.post(MICROSERVICE_USER+"/login", {auth : { 'username' : email, 'password' : password}});
        // }catch(e){
        //     console.error(e.response ? e.response.data : e)
        //     return;
        // }
    
        return user = {pseudo : "JohnDoe", mail : "johndoe@gmail.com", id : "1"};
    },

    register : async (user) => {
        if(!user.pseudo || !user.email || !user.password){
            throw new Error('Données invalides');
        }
        
        //APPEL MICROSERVICE
        // let response;
        // try {
        //     response = await axios.post(MICROSERVICE_USER+"/register", {'username' : user.pseudo, 'mail' : user.email, 'password' : user.password});
        // }catch(e){
        //     console.error(e.response ? e.response.data : e)
        //     return
        // }

        return user = {pseudo : "JohnDoe", mail : "johndoe@gmail.com", id : "1"};
    }


}
