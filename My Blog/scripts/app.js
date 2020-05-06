import controllers from '../controllers/index.js';

const app = Sammy('#main', function () {

    this.use('Handlebars', 'hbs');

    //Home
    this.get('#/home', controllers.home.get.home);
    this.get('#/home2', controllers.home.get.home2);

    //Register
    this.get('#/register', controllers.register.get.register);
    this.post('#/register', controllers.register.post.register);

    //Login
    this.get('#/login', controllers.login.get.login);
    this.post('#/login', controllers.login.post.login);

    //Logout
    this.get('#/logout', controllers.logout.get.logout);

    //Create
    this.post('#/create', controllers.create.post.create);

    //Details
    this.get('#/details/:id', controllers.dashboard.get.details);
    //Delete
    this.get('#/delete/:id', controllers.dashboard.get.delete);
    //Edit
    this.get('#/edit/:id', controllers.dashboard.get.edit);
    this.post('#/edit/:id', controllers.dashboard.post.edit);


});

(() => {

    app.run('#/home');

})();