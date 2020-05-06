import extend from '../utils/context.js';
import docModifier from '../utils/docModifier.js';

export default {
    get: {
        home(context) {
            firebase.firestore().collection('articles').get()
            .then((res) => {
        
                const art = res.docs.map(docModifier);
                context.art = art;
                
                context.js = art.filter(x => x.category.toLowerCase() === "javascript");
                context.cSharp = art.filter(x => x.category.toLowerCase() === "c#");
                context.java = art.filter(x => x.category.toLowerCase() === "java");
                context.python = art.filter(x => x.category.toLowerCase() === "python");

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