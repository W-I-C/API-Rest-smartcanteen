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

let token=''

describe("Test accept one Trade", () => {

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
        .put(baseUrl+'/trades/'+ticketId)
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
        .put(baseUrl+'/trades/'+ticketId)
        .set("Authorization", invalidToken)
        .then(res => {
          res.should.have.status(401)
            chai.expect(res.body).to.have.property("Error")
        })
      })
    })

    describe('- Accept a Trade without body', () => {
        it('Should return incomplete body error', () => {
          return chai
            .request(server)
            .put(baseUrl+'/trades/'+ticketId)
            .set("Authorization", token)
            .then(res => {
              res.should.have.status(500)
            })
        })
      })

    describe('- Accept a Trade that doesnt exist', () => {
        it('Should return trade error', () => {
          return chai
            .request(server)
            .put(baseUrl+'/trades/6e81af81-e551-4078-9e6f-919b2142681')
            .set("Authorization", token)
            .send({
                receptorDecision: 1
              })
            .then(res => {
              res.should.have.status(500)
            })
        })
      })

    describe('- The trade proposal does not exist', () => {
        it('Should return user error', () => {
          return chai
            .request(server)
            .put(baseUrl+'/trades/534cf037-6a41-475b-81d8-c90af631084c')
            .set("Authorization", token)
            .send({
                receptorDecision: 1
              })
            .then(res => {
              res.should.have.status(500)
            })
        })
      })
      
    describe('- The user accepting the trade is not the user receiving the trade', () => {
        it('Should return user error', () => {
          return chai
            .request(server)
            .put(baseUrl+'/trades/534cf037-6a41-475b-81d8-c90af631084f')
            .set("Authorization", token)
            .send({
                receptorDecision: 1
              })
            .then(res => {
              res.should.have.status(500)
            })
        })
      })

    describe('- Accept a Trade correctly', () => {
        it('Should return the trade accepted', () => {
          return chai
          .request(server)
          .put(baseUrl+'/trades/'+ticketId)
          .set("Authorization", token)
          .send({
            receptorDecision: 1
          })
          .then(res => {
            res.should.have.status(500)
            
            chai.expect(res.body).to.be.an("object")

            chai.expect(res.body).to.have.property("isconfirmed")
            chai.expect(res.body).to.have.property("confirmationdate")
            chai.expect(res.body).to.have.property("receptordecision")
            
            chai.expect(res.body['isconfirmed']).to.be.a("boolean")
            chai.expect(res.body['confirmationdate']).to.be.a("string")
            chai.expect(res.body['receptordecision']).to.be.a("number")
          })
        })
    })
})