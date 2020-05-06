import extend from '../utils/context.js';
import docModifier from '../utils/docModifier.js';

export default {
    get: {
        details(context) {
            const id = context.params.id;

            firebase.firestore().collection('posts').doc(id).get()
                .then((res) => {

                    const post = docModifier(res);
                    context.post = post;
                    
                    if(post.creator === localStorage.getItem('userEmail')){
                        context.isCreator = true;
                    }

                    extend(context).then(function () {
                        this.partial('../templates/dashboard/details.hbs');
                    })

                })
        },
        delete(context) {
            const id = context.params.id;

            firebase.firestore().collection('posts').doc(id).delete()
                .then((res) => {
                    context.redirect('#/home2');
                })
        },
        edit(context) {
            const id = context.params.id;

            firebase.firestore().collection('posts').doc(id).get()
                .then((res) => {

                    const post = docModifier(res);
                    context.post = post;

                    extend(context).then(function () {
                        this.partial('../templates/dashboard/edit.hbs')
                    })
                })
        }
    },
    post: {
        edit(context) {
            const { title, category, content, id } = context.params;
            
            firebase.firestore().collection('posts').doc(id).get()
                .then((res) => {

                    const post = docModifier(res);
                    context.post = post;

                    post.title = title;
                    post.category = category;
                    post.content = content;

                    return firebase.firestore().collection('posts').doc(id).update(post)
                })
                .then((res) => {
                    context.redirect(`#/home2`);
                })

        }
    }
}