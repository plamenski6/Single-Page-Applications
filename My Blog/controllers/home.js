import extend from '../utils/context.js';
import docModifier from '../utils/docModifier.js';

export default {
    get: {
        home(context) {
            extend(context).then(function () {
                this.partial('../templates/home/home.hbs')
            });
        },
        home2(context) {
            firebase.firestore().collection('posts').get()
            .then((res) => {
        
                const post = res.docs.map(docModifier);
                context.post = post;
                
                extend(context).loadPartials({
                    details: '../templates/dashboard/details.hbs'
                })
                .then(function () {
                    this.partial('../templates/home/home.hbs')
                })
            })  
        }
    }
}