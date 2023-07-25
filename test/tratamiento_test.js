const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

const url = 'http://localhost:3000/api';

describe("Módulo de Tratamientos", () => {

    describe("Registrar un nuevo Tratamiento", () => {
        it("Debe agregar un nuevo tratamiento con datos correctos", (done) => {
            chai.request(url)
                .post('/tratamiento')
                .send({
                    fechaInicio: "2023-07-24T21:41:56.000Z",
                    fechaFinal: "2023-07-25T21:41:56.000Z",
                    intervaloDosis: 8,
                    userId: 1
                })
                .end((err, res) => {
                    //console.log(res.body);
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message');
                    done();
                });
        });
        it("Debe devolver un error al faltar datos obligatorios", (done) => {
            chai.request(url)
                .post('/tratamiento')
                .send({
                    fechaInicio: "2023-07-24T21:41:56.000Z",
                    fechaInicio: null,
                    intervaloDosis: 8,
                    userId: null
                })
                .end((err, res) => {
                    //console.log(res.body);
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });
        it("Debe devolver un error al enviar datos incorrectos", (done) => {
            chai.request(url)
                .post('/tratamiento')
                .send({
                    fechaInicio: null,
                    fechaFinal: 9,
                    intervaloDosis: 8,
                    userId: 1
                })
                .end((err, res) => {
                    //console.log(res.body);
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });

    });

    describe("Actualizar Tratamiento", () => {
        it("Debe actualizar un tratamiento existente con datos correctos", (done) => {
            chai.request(url)
                .put('/tratamiento?id=7')
                .send({
                    fechaInicio: "2023-06-23T21:41:56.000Z",
                    fechaFinal: "2023-07-23T21:41:56.000Z",
                    intervaloDosis: 12,
                    userId: 1
                })
                .end((err, res) => {
                    //console.log(res.body);
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message');
                    done();
                });
        });
        it("Debe devolver un error al faltar datos obligatorios para actualizar", (done) => {
            chai.request(url)
                .put('/tratamiento?id=7')
                .send({
                    fechaInicio: null,
                    fechaFinal: "2023-07-23T21:41:56.000Z",
                    intervaloDosis: 8,
                    userId: 1
                })
                .end((err, res) => {
                    //console.log(res.body);
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });
        it("Debe devolver un error al enviar datos incorrectos para actualizar", (done) => {
            chai.request(url)
                .put('/tratamiento?id=7')
                .send({
                    fechaInicio: "2023-06-27T21:41:56.000Z",
                    fechaFinal: "2023-07-28T21:41:56.000Z",
                    intervaloDosis: "XYZ",
                    userId: "abc"
                })
                .end((err, res) => {
                    //console.log(res.body);
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });

    });

    describe("Leer Tratamientos", () => {

        it("Debe leer todos los tratamientos existentes", (done) => {
            chai.request(url)
                .get('/tratamiento')
                .end((err, res) => {
                    //console.log(res.body);
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });

        it("Debe devolver un error al poner un id invalido para leer los tratamientos", (done) => {
            chai.request(url)
                .get('/tratamiento?id=rt')
                .end((err, res) => {
                    //console.log(res.body);
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });

        it("Debe devolver un error al proporcionar un Id no existente", (done) => {
            chai.request(url)
                .get('/tratamiento?id=0')
                .end((err, res) => {
                    //console.log(res.body);
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });

    });

    describe("Eliminar Tratamiento", () => {

        it("Debe eliminar un tratamiento existente", (done) => {
            chai.request(url)
                .delete('/tratamiento?id=7')
                .end((err, res) => {
                    //console.log(res.body);
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message');
                    done();
                });
        });

        it("Debe devolver un error al faltar el ID del medicamento para eliminar", (done) => {
            chai.request(url)
                .delete('/tratamiento?id=200')
                .end((err, res) => {
                    //console.log(res.body);
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('message');
                    done();
                });
        });

        it("Debe devolver un error al enviar un ID incorrecto para eliminar", (done) => {
            chai.request(url)
                .delete('/tratamiento?id=mm')
                .end((err, res) => {
                    //console.log(res.body);
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });

    });
});