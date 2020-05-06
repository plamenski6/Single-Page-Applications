import extend from '../utils/context.js';
import docModifier from '../utils/docModifier.js';

export default {
    get: {
        dashboard(context) {
            firebase.firestore().collection('ideas').get()
                .then((res) => {

                    const idea = res.docs.map(docModifier);
                    context.idea = idea;
                    
                    extend(context).loadPartials({
                        details: '../templates/dashboard/details.hbs'
                    })
                    .then(function () {
                        this.partial('../templates/dashboard/dashboard.hbs')
                    })
                })
        },
        details(context) {
            const id = context.params.id;

            firebase.firestore().collection('ideas').doc(id).get()
                .then((res) => {

                    const idea = docModifier(res);
                    context.idea = idea;

                    if (idea.creator === localStorage.getItem('userEmail')) {
                        context.isCreator = true;
                    }

                    extend(context).then(function () {
                        this.partial('../templates/dashboard/details.hbs');
                    })

                })
        },
        delete(context) {
            const id = context.params.id;

            firebase.firestore().collection('ideas').doc(id).delete()
                .then((res) => {
                    context.redirect('#/dashboard');
                })
        },
        like(context) {
            const id = context.params.id;

            firebase.firestore().collection('ideas').doc(id).get()
                .then((res) => {

                    const idea = docModifier(res);
                    context.idea = idea;

                    idea.likes++

                    return firebase.firestore().collection('ideas').doc(id).update(idea)
                }).then((res) => {
                    context.redirect(`#/details/${id}`);
                })
        }
    },
    post: {
        comment(context) {
            const { newComment, id } = context.params;

            firebase.firestore().collection('ideas').doc(id).get()
                .then((res) => {

                    const idea = docModifier(res);
                    context.idea = idea;

                    idea.comments.push(`${localStorage.getItem('userEmail')}: ${newComment}`);

                    return firebase.firestore().collection('ideas').doc(id).update(idea)
                })
                .then((res) => {
                    context.redirect(`#/details/${id}`);
                })
        }
    }
}