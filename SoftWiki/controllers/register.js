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
            const email = context.params.email;
            const password = context.params.password;
            const rePassword = context.params["rep-pass"];

            if (password === rePassword) {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((res) => {
                        context.redirect('#/login');
                    })
                    .catch(function (error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        alert(errorMessage);
                    });
            } else {
                alert('Password and repeat password must be equal!');
            }
            
        }
    }
}