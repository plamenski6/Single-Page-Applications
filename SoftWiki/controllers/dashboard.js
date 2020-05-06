import extend from '../utils/context.js';
import docModifier from '../utils/docModifier.js';

export default {
    get: {
        details(context) {
            const id = context.params.id;
            
            firebase.firestore().collection('articles').doc(id).get()
                .then((res) => {

                    const art = docModifier(res);
                    context.art = art;

                    if (art.creator === localStorage.getItem('userEmail')) {
                        context.isCreator = true;
                    }

                    extend(context).then(function () {
                        this.partial('../templates/dashboard/details.hbs');
                    })

                })
        },
        delete(context) {
            const id = context.params.id;

            firebase.firestore().collection('articles').doc(id).delete()
                .then((res) => {
                    context.redirect('#/home');
                })
        },
        edit(context) {
            const id = context.params.id;

            firebase.firestore().collection('articles').doc(id).get()
                .then((res) => {

                    const art = docModifier(res);
                    context.art = art;

                    extend(context).then(function () {
                        this.partial('../templates/dashboard/edit.hbs')
                    })
                })
        }
    },
    post: {
        edit(context) {
            const { title, category, content, id } = context.params;

            firebase.firestore().collection('articles').doc(id).get()
                .then((res) => {
                    const art = docModifier(res);
                    context.art = art;

                    art.title = title;
                    art.category = category;
                    art.content = content;

                    return firebase.firestore().collection('articles').doc(id).update(art)
                })
                .then((res) => {
                    context.redirect('#/home');
                }).catch((error) => {
                    console.log(error.message)
                })
        }
    }
}