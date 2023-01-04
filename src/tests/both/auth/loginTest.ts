import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:3000"
const email = 'employe@employee.com'
const password = 'Teste_#'

describe("Test login", function () {
  describe('- Wrong Credentials', () => {
    it('Should return invalid credentials', () => {
      return chai
        .request(server)
        .post(baseUrl + '/login')
        .send({
          email: "testeErrado@teste.com",
          password: "teste"
        })
        .then(res => {
          res.should.have.status(401)
          chai.expect(res.body).to.have.property("msg")
        })
    })
  })
  describe('- Correct Login', () => {
    it('Should return session token', () => {
      return chai
        .request(server)
        .post(baseUrl + '/login')
        .send({
          email: email,
          password: password
        })
        .then(res => {
          res.should.have.status(200)
          // verificar se é um object
          chai.expect(res.body).to.be.an("object")
          chai.expect(res.body).to.have.property("token")
          chai.expect(res.body).property("token").to.be.a("string")
        })
    })
  })
})