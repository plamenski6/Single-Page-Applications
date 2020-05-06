import extend from '../utils/context.js';

export default {
    get: {
        create(context) {
            extend(context).then(function () {
                this.partial('../templates/dashboard/create.hbs')
            })
        }
    },
    post: {
        create(context) {
            const data = {
                ...context.params,
                creator: localStorage.getItem('userEmail')
            }
            
            if (data.title.length > 0 && data.category.length > 0 && data.content.length > 0) {

                    firebase.firestore().collection('articles').add(data)
                    .then((res) => {
                        context.redirect('#/home');
                    })

            } else {
                alert('The input fields must be non-empty!');
            }

        }
    }
}