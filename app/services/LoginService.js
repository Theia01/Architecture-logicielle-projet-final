module.exports = {

    login : (email, password) => {
        if(email == null || password == null){
            throw new Error('Données invalides');
        }
        //appel module user for login
        return user = {pseudo : "JohnDoe", mail : "johndoe@gmail.com", id : "1"};
    },

    register : (user) => {
        if(!user.pseudo || !user.email || !user.password){
            throw new Error('Données invalides');
        }
        //appel module user for register
        return user = {pseudo : "JohnDoe", mail : "johndoe@gmail.com", id : "1"};
    }


}
