import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1/consumer"
const server = "localhost:3000"
const invalidToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'
const ticketId = 'f6219d36-b8ef-4338-8d2a-cfcd77433dc2'
const notMyTicketId = '534cf037-6a41-475b-81d8-c90af631084f'
const invalidTicketId = 'f6219d36-b8ef-4338-8d2a-cfcd77433dc3'
const ticketInPreperationId = '42977dd1-cfbe-4e0d-a8b0-db1619decb30'
// this variable will store the token that results from the correct login
let token = ''

describe("Test get tickets history of the user", () => {
  // before testing the route we need to login to get the token
  beforeEach((done) => {
    chai
      .request(server)
      .post("/api/v1/login")
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
        .delete(baseUrl + '/tickets/' + ticketId)
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
        .delete(baseUrl + '/tickets/' + ticketId)
        .set("Authorization", invalidToken)
        .then(res => {
          res.should.have.status(401)
          chai.expect(res.body).to.have.property("Error")
        })
    })
  })

  describe('- Ticket that doesnt exist', () => {
    it('Should return invalid token error', () => {
      return chai
        .request(server)
        .delete(baseUrl + '/tickets/' + invalidTicketId)
        .set("Authorization", invalidToken)
        .then(res => {
          res.should.have.status(401)
          chai.expect(res.body).to.have.property("Error")
        })
    })
  })

  describe('- Not my ticket', () => {
    it('Should return invalid token error', () => {
      return chai
        .request(server)
        .delete(baseUrl + '/tickets/' + notMyTicketId)
        .set("Authorization", invalidToken)
        .then(res => {
          res.should.have.status(401)
          chai.expect(res.body).to.have.property("Error")
        })
    })
  })

  describe('- Order In Preparation', () => {
    it('Should return invalid token error', () => {
      return chai
        .request(server)
        .delete(baseUrl + '/tickets/' + ticketInPreperationId)
        .set("Authorization", invalidToken)
        .then(res => {
          res.should.have.status(401)
          chai.expect(res.body).to.have.property("Error")
        })
    })
  })


  describe('- Remove Ticket', () => {
    it('Should return a message with order removed', () => {
      return chai
        .request(server)
        .delete(baseUrl + '/tickets/' + ticketId)
        .set("Authorization", token)
        .then(res => {
          res.should.have.status(200)
          // verificar se é um object
          chai.expect(res.body).to.be.an("object")

          chai.expect(res.body).to.have.property("msg")

          chai.expect(res.body['msg']).to.be.a("string")
        })
    })
  })
})