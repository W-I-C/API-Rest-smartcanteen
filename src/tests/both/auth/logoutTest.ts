import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:3000"
const invalidToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'

// this variable will store the token that results from the correct login
let token = ''

describe("Test logout", () => {
  // before testing the route we need to login to get the token
  beforeEach((done) => {
    chai
      .request(server)
      .post(baseUrl + "/login")
      .send({
        email: "consumer@consumer.com",
        password: "Teste#",
      })
      .end((err, res) => {
        token = `Bearer ${res.body.token}`;
        res.should.have.status(200);
        done();
      });
  });

  describe('- No token', () => {
    it('Should return invalid token error', () => {
      return chai
        .request(server)
        .get(baseUrl + '/logout')
        .then(res => {
          res.should.have.status(401)
          chai.expect(res.body).to.have.property("Error")
        })
    })
  })

  describe('- Invalid token', () => {
    it('Should return invalid token error', () => {
      return chai
        .request(server)
        .get(baseUrl + '/logout')
        .set("Authorization", invalidToken)
        .then(res => {
          res.should.have.status(401)
          chai.expect(res.body).to.have.property("Error")
        })
    })
  })

  describe('- Logout correctly', () => {
    it('Should return logout successful', () => {
      return chai
        .request(server)
        .get(baseUrl + '/logout')
        .set("Authorization", token)
        .then(res => {
          console.log(res.body)
          res.should.have.status(200)
          // verificar se é um object
          chai.expect(res.body).to.be.a("string")
        })
    })
  })
})
