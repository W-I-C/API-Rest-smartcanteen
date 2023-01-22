import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:3000"
const email = 'consumer3@consumer.com'
const invalidEmail = 'consumer@consumer.com'
const invalidSchoolno = 1222
const password = 'Teste_#'

describe("Test register", function () {
  describe('- Email exists Credentials', () => {
    it('Should return email already registered', () => {
      return chai
        .request(server)
        .post(baseUrl + '/register')
        .send({
          roleid: "68271d1d-a6ab-46a3-a498-e2dda2850083",
          preferredcampus: "3b30ea61-1565-4fdc-8329-24b70511452b",
          preferredbar: "ec3b5a78-16c4-4cfc-b7b5-efc64ddc0c70",
          email: invalidEmail,
          name: "consumer",
          password: password,
          schoolno: 1222,
          birthdate: "1999-10-10"
        })
        .then(res => {
          res.should.have.status(500)
          chai.expect(res.body).to.be.a("string")
        })
    })
  })
  it('Should return schoolno already registered', () => {
    return chai
      .request(server)
      .post(baseUrl + '/register')
      .send({
        roleid: "68271d1d-a6ab-46a3-a498-e2dda2850083",
        preferredcampus: "3b30ea61-1565-4fdc-8329-24b70511452b",
        preferredbar: "ec3b5a78-16c4-4cfc-b7b5-efc64ddc0c70",
        email: email,
        name: "consumer",
        password: password,
        schoolno: invalidSchoolno,
        birthdate: "1999-10-10"
      })
      .then(res => {
        res.should.have.status(500)
        chai.expect(res.body).to.be.a("string")
      })
  })
})
describe('- No body test', () => {
  it('Should return incomplete body error', () => {
    return chai
      .request(server)
      .post(baseUrl + '/register')
      .then(res => {
        res.should.have.status(500)
        chai.expect(res.body).to.be.a("string")
      })
  })
})
describe('- Correct Register', () => {
  it('Should return session token', () => {
    return chai
      .request(server)
      .post(baseUrl + '/register')
      .send({
        roleid: "68271d1d-a6ab-46a3-a498-e2dda2850083",
        preferredcampus: "3b30ea61-1565-4fdc-8329-24b70511452b",
        preferredbar: "ec3b5a78-16c4-4cfc-b7b5-efc64ddc0c70",
        email: email,
        name: "consumer",
        password: password,
        schoolno: 123124,
        birthdate: "1999-10-10"
      })
      .then(res => {
        res.should.have.status(200)
        // verificar se é um object
        chai.expect(res.body).to.be.an("object")
        chai.expect(res.body).to.have.property("msg")
        chai.expect(res.body).property("msg").to.be.a("string")
      })
  })
})