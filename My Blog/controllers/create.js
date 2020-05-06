import extend from '../utils/context.js';

export default {
    post: {
        create(context) {
            const data = {
                ...context.params,
                creator: localStorage.getItem('userEmail')
            };

            if (data.title.length > 0 && data.category.length > 0 && data.content.length > 0) {

                firebase.firestore().collection('posts').add(data)
                    .then((res) => {
                        context.redirect('#/home2');
                    })

            } else {
                alert('The fields must be non-empty!');
            }

        }
    }
}