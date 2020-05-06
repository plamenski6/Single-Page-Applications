export default function (context) {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            context.loggedIn = true;
            context.email = user.email;
            context.userId = user.uid;
            localStorage.setItem('userId', user.uid);
            localStorage.setItem('userEmail', user.email);
            // ...
        } else {
            // User is signed out.
            context.loggedIn = false;
            context.email = null;
            context.userId = null;
            localStorage.removeItem('userId');
            localStorage.removeItem('userEmail');
            // ...
        }
    });

    return context.loadPartials({
        header: '../templates/common/header.hbs'
    })
    
}