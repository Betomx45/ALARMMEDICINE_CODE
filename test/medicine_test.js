const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

const url = 'https://alarm-medice.vercel.app/api';

describe("Módulo de Medicamentos", () => {

    describe("Registrar un nuevo Medicamento", () => {
        it("Debe agregar un nuevo medicamento con datos correctos", (done) => {
            chai.request(url)
                .post('/tratamiento')
                .send({
                    fechaInicio: "2023-07-24 21:41:56",
                    fechaFinal: "2023-07-25 21:41:56",
                    intervaloDosis: 8,
                    userId: 1,
                    medicamento: {
                        nombre: "Pearls",
                        descripcion: "Lactobacilus para infecciones estomacales",
                        medicamentoId: "1"
                    }
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
                    fechaInicio: "2023-07-24 21:41:56",
                    fechaFinal: null,
                    intervaloDosis: 8,
                    userId: 1,
                    medicamento: {
                        nombre: null,
                        descripcion: "Lactobacilus para infecciones estomacales",
                        medicamentoId: "1"
                    }
                })
                .end((err, res) => {
                    //console.log(res.body);
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('error');
                    expect(res.body.error).to.be.true;
                    done();
                });
        });

        it("Debe devolver un error al enviar datos incorrectos", (done) => {
            chai.request(url)
                .post('/tratamiento')
                .send({
                    fechaInicio: 8,
                    fechaFinal: 9,
                    intervaloDosis: 8,
                    userId: 1,
                    medicamento: {
                        nombre: 1,
                        descripcion: "234567890",
                        medicamentoId: 1
                    }
                })
                .end((err, res) => {
                    //console.log(res.body);
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('error');
                    expect(res.body.error).to.be.true;
                    done();
                });
        });

    });

    describe("Actualizar Medicamento", () => {
        it("Debe actualizar un medicamento existente con datos correctos", (done) => {
            chai.request(url)
                .put('/tratamiento?id=1')
                .send({
                    fechaInicio: "2023-07-24 21:41:56",
                    fechaFinal: "2023-07-25 21:41:56",
                    intervaloDosis: 8,
                    userId: 1,
                    medicamento: {
                        nombre: "Naproxeno",
                        descripcion: "Lactobacilus para infecciones estomacales",
                        medicamentoId: "1"
                    }
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
                .put('/tratamiento?id=1')
                .send({
                    fechaInicio: 1,
                    fechaFinal: 2,
                    intervaloDosis: null,
                    userId: null,
                    medicamento: {
                        nombre: null,
                        descripcion: null,
                        medicamentoId: 1
                    }
                })
                .end((err, res) => {
                    //console.log(res.body);
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('error');
                    expect(res.body.error).to.be.true;
                    done();
                });
        });
        it("Debe devolver un error al enviar datos incorrectos para actualizar", (done) => {
            chai.request(url)
                .put('/tratamiento?id=1')
                .send({
                    fechaInicio: 1,
                    fechaFinal: 2,
                    intervaloDosis: null,
                    userId: null,
                    medicamento: {
                        nombre: null,
                        descripcion: null,
                        medicamentoId: 1
                    }
                })
                .end((err, res) => {
                    //console.log(res.body);
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('error');
                    expect(res.body.error).to.be.true;
                    done();
                });
        });

    });

    describe("Leer Medicamentos", () => {

        it("Debe leer todos los medicamentos existentes", (done) => {
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
                    expect(res.body.error).to.be.true;
                    done();
                });
        });

        it("Debe devolver un error al proporcionar un Id no existente", (done) => {
            chai.request(url)
                .get('/tratamiento?id=65432')
                .end((err, res) => {
                    //console.log(res.body);
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('error');
                    expect(res.body.error).to.be.true;
                    done();
                });
        });

    });

    describe("Eliminar Medicamento", () => {

        it("Debe eliminar un tratamiento existente", (done) => {
            chai.request(url)
                .delete('/tratamiento?id=2')
                .end((err, res) => {
                    //console.log(res.body);
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message');
                    done();
                });
        });

        it("Debe devolver un error al faltar el ID del tratamiento para eliminar", (done) => {
            chai.request(url)
                .delete('/tratamiento')
                .end((err, res) => {
                    //console.log(res.body);
                    expect(res).to.have.status(400);
                    expect(res.body.error).to.be.true;
                    done();
                });
        });

        it("Debe devolver un error al enviar un ID incorrecto para eliminar", (done) => {
            chai.request(url)
                .delete('/tratamiento?id=uytr')
                .end((err, res) => {
                    //console.log(res.body);
                    expect(res).to.have.status(400);
                    expect(res.body.error).to.be.true;
                    done();
                });
        });

    });
});