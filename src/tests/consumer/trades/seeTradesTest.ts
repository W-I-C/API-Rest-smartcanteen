import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1/consumer"
const server = "localhost:3000"
const invalidToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'
const campusid='13be23c1-2e9b-43fc-acaa-839c6b3573bc'
// this variable will store the token that results from the correct login
let token=''

describe("Test see trades available", () => {
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
        .get(baseUrl+'/trades/available/'+campusid)
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
        .get(baseUrl+'/trades/available/'+ campusid)
        .set("Authorization", invalidToken)
        .then(res => {
          res.should.have.status(401)
            chai.expect(res.body).to.have.property("Error")
        })
      })
    })

    describe('- see trades available', () => {
        it('Should return available trades', () => {
          return chai
          .request(server)
          .get(baseUrl+'/trades/available/'+campusid)
          .set("Authorization", token)
          .then(res => {
          
            res.should.have.status(200)
            // verificar se é um object

            chai.expect(res.body).to.be.an("array")

            if(res.body.length>0){
              for(let i = 0; i < res.body.length; i++){

                chai.expect(res.body[i]).to.be.an("object")
            
                chai.expect(res.body[i]).to.have.property("campusid")
                chai.expect(res.body[i]).to.have.property("name")
                chai.expect(res.body[i]).to.have.property("barid")
                chai.expect(res.body[i]).to.have.property("ticketid")
                chai.expect(res.body[i]).to.have.property("uid")
                chai.expect(res.body[i]).to.have.property("stateid")
                chai.expect(res.body[i]).to.have.property("paymentmethodid")
                chai.expect(res.body[i]).to.have.property("cartid")
                chai.expect(res.body[i]).to.have.property("emissiondate")
                chai.expect(res.body[i]).to.have.property("pickuptime")
                chai.expect(res.body[i]).to.have.property("istakingaway")
                chai.expect(res.body[i]).to.have.property("ispickedup")
                chai.expect(res.body[i]).to.have.property("istrading")
                chai.expect(res.body[i]).to.have.property("ticketamount")
                chai.expect(res.body[i]).to.have.property("total")
                chai.expect(res.body[i]).to.have.property("nencomenda")
                chai.expect(res.body[i]).to.have.property("isdeleted")
                chai.expect(res.body[i]).to.have.property("isdirecttrade")
                chai.expect(res.body[i]).to.have.property("isconfirmed")
                chai.expect(res.body[i]).to.have.property("proposaldate")
                chai.expect(res.body[i]).to.have.property("confirmationdate")
                chai.expect(res.body[i]).to.have.property("receptordecision")
                chai.expect(res.body[i]).to.have.property("tradeId")

                chai.expect(res.body[i]['campusid']).to.be.a("string")
                chai.expect(res.body[i]['name']).to.be.a("string")
                chai.expect(res.body[i]['barid']).to.be.a("string")
                chai.expect(res.body[i]['ticketid']).to.be.a("string")
                chai.expect(res.body[i]['uid']).to.be.a("string")
                chai.expect(res.body[i]['stateid']).to.be.a("string")
                chai.expect(res.body[i]['paymentmethodid']).to.be.a("string")
                chai.expect(res.body[i]['cartid']).to.be.a("string")
                chai.expect(res.body[i]['emissiondate']).to.be.a("string")
                chai.expect(res.body[i]['pickuptime']).to.be.a("string")
                chai.expect(res.body[i]['istakingaway']).to.be.a("boolean")
                chai.expect(res.body[i]['ispickedup']).to.be.a("boolean")
                chai.expect(res.body[i]['istrading']).to.be.a("boolean")
                chai.expect(res.body[i]['ticketamount']).to.be.a("number")
                chai.expect(res.body[i]['total']).to.be.a("number")
                chai.expect(res.body[i]['nencomenda']).to.be.a("number")
                chai.expect(res.body[i]['isdeleted']).to.be.a("boolean")
                chai.expect(res.body[i]['isdirecttrade']).to.be.a("boolean")
                chai.expect(res.body[i]['isconfirmed']).to.be.a("boolean")
                chai.expect(res.body[i]['proposaldate']).to.be.a("string")
                chai.expect(res.body[i]['confirmationdate']).to.be.a("string")
                chai.expect(res.body[i]['receptordecision']).to.be.a("boolean")
                chai.expect(res.body[i]['tradeId']).to.be.a("string")

              }
            }
          })
        })
    })
})