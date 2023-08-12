const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
const url = 'https://alarm-medice.vercel.app/api';

describe("Registro de usuarios", () => {
    it("Debe registrar un nuevo usuario", (done) => {
        chai.request(url)
            .post('/users')
            .send({
                name: "Marco Antonio",
                email: "marcoa.07@gmail.com",
                password: "chikis07"
            })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('usuario');
                expect(res.body).to.have.property('message');
                done();
            });
    });

    it("Debe retornar un error si faltan campos obligatorios", (done) => {
        chai.request(url)
            .post('/users')
            .send({
                email: "marcoa.07@gmail.com",
                password: "chikis07"
            })
            .end(function(err, res) {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('object');
                done();
            });
    });

    it("Debe retornar error si el usuario ya existe", (done) => {
        chai.request(url)
            .post('/users')
            .send({
                name: 'Luis Alberto',
                email: "nievaluisalberto35@gmail.com",
                password: "betobetitu123"
            })
            .end(function(err, res) {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('object');
                done();
            });
    });
});

describe("Obtener usuarios", () => {
    it("Debe obtener un usuario existente", (done) => {
        chai.request(url)
            .get('/users/1')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    });

    it("Debe obtener varios usuarios existentes", (done) => {
        chai.request(url)
            .get('/users')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.length.above(0);
                done();
            });
    });

    it("Debe retornar un error al obtener un usuario inexistente", (done) => {
        chai.request(url)
            .get('/users/11000')
            .end(function(err, res) {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('object');
                done();
            });
    });
});

describe("Actualizar Usuarios", () => {
    it("Debe actualizar un usuario existente", (done) => {
        const updateUser = {
            name: "Luis Castillo",
            email: "nievaluisalberto35@gmail.com"
        };
        chai.request(url)
            .put('/users?id=1')
            .send(updateUser)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('object');
                done();
            });
    });

    it("Debe retornar un error al intentar actualizar un usuario inexistente", (done) => {
        const updateUser = {
            name: "Marc Antony",
            email: "marcoantonio.07102@gmail.com"
        };
        chai.request(url)
            .put('/users?id=19000')
            .send(updateUser)
            .end(function(err, res) {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('object');
                done();
            });
    });

    it("Debe retornar error si faltan campos obligatorios en la actualizacion de un usuario", (done) => {
        const updateUser = {
            name:null,
            email: "marcoantonio.07102@gmail.com"
        };
        chai.request(url)
            .put('/users?id=1')
            .send(updateUser)
            .end(function(err, res) {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('object');
                done();
            });
    });
});

describe("Eliminar Usuarios", () => {
    it("Debe eliminar un usuario existente", (done) => {
        chai.request(url)
            .delete('/users?id=1')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done();
            });
    });

    it("Debe retornar error si intenta eliminar un usuario inexistente", (done) => {
        chai.request(url)
            .delete('/users?id=20')
            .end(function(err, res) {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('object');
                done();
            });
    });

    it("Debe retornar un error al proporcionar un id invalido", (done) => {
        const idInvalido = "rty";

        chai.request(url)
            .delete(`/users?id=${idInvalido}`)
            .end(function(err, res) {
                expect(res).to.have.status(404);
                expect(res.body).to.be.an('object');
                expect(res.body.object).to.be.true;
                done();
            });
    });
});
