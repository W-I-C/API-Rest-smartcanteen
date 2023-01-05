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

describe("Test see cart meals", () => {
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
        .get(baseUrl+'/cart/meals')
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
        .get(baseUrl+'/cart/meals')
        .set("Authorization", invalidToken)
        .then(res => {
          res.should.have.status(401)
            chai.expect(res.body).to.have.property("Error")
        })
      })
    })

    describe('- Get cart meals', () => {
        it('Should return a cart meals', () => {
          return chai
          .request(server)
          .get(baseUrl+'/cart/meals')
          .set("Authorization", token)
          .then(res => {
            res.should.have.status(200)
            // verificar se é um object

            chai.expect(res.body).to.be.an("array")

            if(res.body.length>0){
              for(let i = 0; i < res.body.length; i++){

                chai.expect(res.body[i]).to.be.an("object")

                chai.expect(res.body[i]).to.have.property("cartid")
                chai.expect(res.body[i]).to.have.property("uid")
                chai.expect(res.body[i]).to.have.property("date")
                chai.expect(res.body[i]).to.have.property("iscompleted")
        
                chai.expect(res.body[i]['cartid']).to.be.a("string")
                chai.expect(res.body[i]['uid']).to.be.a("string")
                chai.expect(res.body[i]['date']).to.be.a("string")
                chai.expect(res.body[i]['iscompleted']).to.be.a("boolean")
              }
            }
          })
        })
    })
})