import extend from '../utils/context.js';
import docModifier from '../utils/docModifier.js';

export default {
    get: {
        profile(context) {
            firebase.firestore().collection('ideas').get()
                .then((res) => {

                    const idea = res.docs.map(docModifier);
                    context.idea = idea;
                    idea.num = 0;
                    
                    idea.forEach((obj) => {
                        if (obj.creator === localStorage.getItem('userEmail')) {
                            idea.num++
                        }
                    })

                    extend(context).then(function () {
                        this.partial('../templates/profile/profile.hbs')
                    })
                })
        }
    }
}