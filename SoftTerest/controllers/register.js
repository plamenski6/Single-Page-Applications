import extend from '../utils/context.js';

export default {
    get: {
        register(context) {
            extend(context).then(function () {
                this.partial('../templates/register/register.hbs')
            })
        }
    },
    post: {
        register(context) {
            const { username, password, repeatPassword } = context.params;

            if (username.length >= 3 && password.length >= 3) {
                if(password === repeatPassword){
                firebase.auth().createUserWithEmailAndPassword(username, password)
                    .then((res) => {
                        firebase.auth().signInWithEmailAndPassword(username, password)
                            .then((res) => {
                                context.redirect('#/home');
                            })
                    })
                    .catch(function (error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        alert(errorMessage);
                    });
                } else {
                    alert('Password and repeat password must be equal!');
                }
            } else {
                alert('Username and password must be at least 3 characters long!');
            }
        }
    }
}