import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1/consumer"
const server = "localhost:3000"
const invalidToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'

// this variable will store the token that results from the correct login
let token=''

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
        .get(baseUrl+'/tickets')
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
        .get(baseUrl+'/tickets')
        .set("Authorization", invalidToken)
        .then(res => {
          res.should.have.status(401)
            chai.expect(res.body).to.have.property("Error")
        })
      })
    })

    describe('- Get Tickets History Right', () => {
        it('Should return a array with all the tickets of the user', () => {
          return chai
          .request(server)
          .get(baseUrl+'/tickets')
          .set("Authorization", token)
          .then(res => {
            res.should.have.status(200)
            // verificar se é um object
            chai.expect(res.body).to.be.an("array")
            chai.expect(res.body[0]).to.be.an("object")
    
            // TODO: falta o price e mudar de ticketid para identificador
            chai.expect(res.body[0]).to.have.property("ticketid")
            chai.expect(res.body[0]).to.have.property("ticketamount")
            chai.expect(res.body[0]).to.have.property("name")
    
            chai.expect(res.body[0]['ticketid']).to.be.a("string")
            chai.expect(res.body[0]['ticketamount']).to.be.a("number")
            chai.expect(res.body[0]['name']).to.be.a("string")
          })
        })
    })
})