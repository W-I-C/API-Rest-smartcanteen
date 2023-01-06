import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1/employee"
const server = "localhost:3000"
const invalidToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'
const barId = '0d9c0499-f2f8-44d5-9b49-a0529266433a'
const invalidBarId = 'a91aa933-440b-4c80-beef-f4cadd1aefff'
// this variable will store the token that results from the correct login
let token = ''

describe("Test get bar statistics", () => {
  // before testing the route we need to login to get the token
  beforeEach((done) => {
    chai
      .request(server)
      .post("/api/v1/login")
      .send({
        email: "employe@employee.com",
        password: "Teste_#",
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
        .get(baseUrl + '/bar/' + barId + '/statistics')
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
        .get(baseUrl + '/bar/' + barId + '/statistics')
        .set("Authorization", invalidToken)
        .then(res => {
          res.should.have.status(401)
          chai.expect(res.body).to.have.property("Error")
        })
    })
  })

  describe('- Get Statistics from another bar', () => {
    it('Should return meal error', () => {
      return chai
        .request(server)
        .get(baseUrl + '/bar/' + invalidBarId + '/statistics')
        .set("Authorization", token)
        .send({
          status: false
        })
        .then(res => {
          res.should.have.status(500)
        })
    })
  })

  describe('- Get Statistics successfully', () => {
    it('Should return the can be made success', () => {
      return chai
        .request(server)
        .get(baseUrl + '/bar/' + barId + '/statistics')
        .set("Authorization", token)
        .send({
          status: false
        })
        .then(res => {

          res.should.have.status(200)

          chai.expect(res.body).to.be.an("object")

          chai.expect(res.body).to.have.property("totalTickets")
          chai.expect(res.body).to.have.property("deliveredTickets")
          chai.expect(res.body).to.have.property("toDeliverTickets")
          chai.expect(res.body).to.have.property("tradedTickets")

          chai.expect(res.body['totalTickets']).to.be.a("number")
          chai.expect(res.body['deliveredTickets']).to.be.a("number")
          chai.expect(res.body['toDeliverTickets']).to.be.a("number")
          chai.expect(res.body['tradedTickets']).to.be.a("number")

        })
    })
  })
})
