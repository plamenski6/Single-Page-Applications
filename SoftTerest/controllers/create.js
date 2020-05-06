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
                creator: localStorage.getItem('userEmail'),
                userId: localStorage.getItem('userId'),
                likes: 0,
                comments: []
            }
            
            if (data.title.length >= 6 && data.description.length >= 10) {
                if (data.imageURL.slice(0, 4) === 'http') {

                    firebase.firestore().collection('ideas').add(data)
                    .then((res) => {
                        context.redirect('#/dashboard');
                    })

                } else {
                    alert('ImageURL must start with "http://" or "https://"!')
                }

            } else {
                alert('Title must be at least 6 characters long and description at least 10');
            }

        }
    }
}