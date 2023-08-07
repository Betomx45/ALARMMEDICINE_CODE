let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:3000/api';

//REQUEST POST
describe("Registro de usuarios", () => {
    //One
    it("Debe registrar un nuevo usuario", (done) => {
        chai.request(url)
        .post('/users')
        .send({
            nombre: "Marco Antonio",
            correo: "marcoa.07@gmail.com",
            password: "chikis07"
        })
        .end(function( err, res ) {
            //console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('usuarios');
            expect(res.body).to.have.property('message');
            done();
        });
    });
    //Two
    it("Debe retornar un error si faltan campos obligatorios", (done) => {
        chai.request(url)
        .post('/users')
        .send({
            nombre: '',
            correo: "marcoa.07@gmail.com",
            password: "chikis07"
        })
        .end(function(err, res) {
            //console.log(res.body);
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message'); 
            done();
          });
    });
    //Three
    
    it("Debe retornar error si el usuario ya existe", (done) => {
        chai.request(url)
        .post('/users')
        .send({
            nombre: 'Luis Alberto',
            correo: "betitu@gamil.com",
            password: "betobetitu123"
        })
        .end(function(err, res) {
            //console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message');
            done();
        });
    });
});

//REQUEST GET
describe("Obtener usuarios", () => {

    it("Debe obtener un usuario existente", (done) => {
        chai.request(url)
        .get('/users/1')
        .end(function( err, res ) {
            //console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('nombre');
            expect(res.body).to.have.property('correo');
            done();
        });
    });

    it("Debe obtener varios usuarios existentes", (done) => {
        chai.request(url)
        .get('/users')
        .end(function( err, res ) {
            //console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.length.above(0);
            done();
        });
    });

    it("Debe retornar un error al obtener un usuario inexistente", (done) => {
        chai.request(url)
        .get('/users/11000')
        .end(function( err, res ) {
            //console.log(res.body);
            expect(res).to.have.status(404);
            expect(res.body).to.property('message');
            done();
        });
    });
});

//UPDATE
describe("Actualizar Usuarios", () => {
    it("Debe actualizar un usuario existente", (done) => {
        const updateUser = {
            nombre: "Marc Antony"
        };
        chai.request(url)
        .put('/users/2')
        .send(updateUser)
        .end(function( err, res ) {
            //console.log(res.body);
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('error');
            done();
        });
    });

    it("Debe retornar un error al intentar actualizar un usuario inexistente", (done) => {
        const updateUser = {
            nombre: "Marc Antony",
            correo: "marcoantonio.07102@gmail.com"
        };
        chai.request(url)
        .put('/users/19000')
        .send(updateUser)
        .end(function( err, res ) {
            //console.log(res.body);
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message');
            done();
        });
    });

    it("Debe retornar error si faltan campos obligatorios en la actualizacion de un usuario", (done) => {
        const updateUser = {
            nombre: "",
            correo: "marcoantonio.07102@gmail.com"
        };
        chai.request(url)
        .put('/users/2')
        .send(updateUser)
        .end(function( err, res ) {
            //console.log(res.body);
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message');
            done();
        });
    });
});

//DELETE
describe("Eliminar Usuarios", () => {
    it("Debe eliminar un usuario existente", (done) => {
        chai.request(url)
        .delete('/users?id=103')
        .end(function( err, res ) {
            //console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message');
            done();
        });
    });

    it("Debe retornar error si intenta eliminar un usuario inexistente", (done) => {
        chai.request(url)
        .delete('/users/20')
        .end(function( err, res ) {
            //console.log(res.body);
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message');
            done();
        });
    });

    it("Debe eliminar varios usuarios existentes", (done) => {
        const deleteUsers = [81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100];

        chai.request(url)
        .delete(`/users?id=${deleteUsers}`)
        //.send({ users: deleteUsers })
        .end(function( err, res ) {
            //console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            done();
        });
    });
});