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
            const { email, password, repeatPassword } = context.params;

            if (email.length > 0 && password.length > 0) {
                if (password === repeatPassword) {
                    
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
            } else {
                alert('Email and password must be non-empty fields!');
            }

        }
    }
}