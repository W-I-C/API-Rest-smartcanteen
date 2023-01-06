import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1/consumer"
const server = "localhost:3000"
const invalidToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'
const ticketId = '42977dd1-cfbe-4e0d-a8b0-db1619decb30'
const invalidTicketId = '42977dd1-cfbe-4e0d-a8b0-db1619decb31'
const notMyTicketId = 'f6219d36-b8ef-4338-8d2a-cfcd77433dc2'
const receiverId = '5fa801a1-2645-4dbc-a633-3a5cec7202be'
const invalidReceiverId = '5fa801a1-2645-4dbc-a633-3a5cec7202bc'
const employeeId = '56e4b0b7-41f2-4c88-bcb4-7f11c9a76fda'



let token = ''

describe("Direct Ticket Trade", () => {

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
        .put(baseUrl + '/trades/' + invalidTicketId + '/direct/' + receiverId)
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
        .put(baseUrl + '/trades/' + invalidTicketId + '/direct/' + receiverId)
        .set("Authorization", invalidToken)
        .then(res => {
          res.should.have.status(401)
          chai.expect(res.body).to.have.property("Error")
        })
    })
  })


  describe('- Direct Trade a ticket that doesnt exist', () => {
    it('Should return ticket error', () => {
      return chai
        .request(server)
        .put(baseUrl + '/trades/' + invalidTicketId + '/direct/' + receiverId)
        .set("Authorization", token)
        .then(res => {
          res.should.have.status(500)
        })
    })
  })

  describe('- Direct Trade with an user that doesnt exist', () => {
    it('Should return user error', () => {
      return chai
        .request(server)
        .put(baseUrl + '/trades/' + ticketId + '/direct/' + invalidReceiverId)
        .set("Authorization", token)
        .then(res => {
          res.should.have.status(500)
        })
    })
  })

  describe('- Direct trade with an employee', () => {
    it('Should return role error', () => {
      return chai
        .request(server)
        .put(baseUrl + '/trades/' + ticketId + '/direct/' + employeeId)
        .set("Authorization", token)
        .then(res => {
          res.should.have.status(500)
        })
    })
  })

  describe('- Make a direct trade correctly', () => {
    it('Should return proposal done successfully', () => {
      return chai
        .request(server)
        .put(baseUrl + '/trades/' + ticketId + '/direct/' + receiverId)
        .set("Authorization", token)
        .then(res => {
          res.should.have.status(200)

          chai.expect(res.body).to.be.an("object")

          chai.expect(res.body).to.have.property("msg")

          chai.expect(res.body['msg']).to.be.a("string")
        })
    })
  })
  describe('- Make a direct trade with the same user', () => {
    it('Should return erro trade already sent', () => {
      return chai
        .request(server)
        .put(baseUrl + '/trades/' + ticketId + '/direct/' + receiverId)
        .set("Authorization", token)
        .then(res => {
          res.should.have.status(500)
        })
    })
  })
  describe('- Make a direct trade with a ticket that i already traded', () => {
    it('Should return error not your order', () => {
      return chai
        .request(server)
        .put(baseUrl + '/trades/' + notMyTicketId + '/direct/' + receiverId)
        .set("Authorization", token)
        .then(res => {
          res.should.have.status(500)
        })
    })
  })
})