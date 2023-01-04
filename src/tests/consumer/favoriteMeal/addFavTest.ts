import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1/consumer"
const server = "localhost:3000"
const invalidToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'
const mealId='e88d03d7-be1a-4f6a-bb25-6bd6c3b5fff1'
// this variable will store the token that results from the correct login
let token=''

describe("Test add favorite meal", () => {
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
        .post(baseUrl+'/favoriteMeals/'+ mealId)
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
        .post(baseUrl+'/favoriteMeals/'+ mealId)
        .set("Authorization", invalidToken)
        .then(res => {
          res.should.have.status(401)
            chai.expect(res.body).to.have.property("Error")
        })
      })
    })

   

    describe('- Add favorite meal correctly', () => {
        it('Should return favorite meals', () => {
          return chai
          .request(server)
          .post(baseUrl+'/favoriteMeals/'+ mealId)
          .set("Authorization", token)
          .then(res => {
            res.should.have.status(200)
            // verificar se é um object
            chai.expect(res.body).to.be.an("array")

            chai.expect(res.body[0]).to.be.an("object")
            chai.expect(res.body[0]).to.have.property("favoritemealid")
            chai.expect(res.body[0]).to.have.property("uid")
            chai.expect(res.body[0]).to.have.property("mealid")
    
            chai.expect(res.body[0]['favoritemealid']).to.be.a("string")
            chai.expect(res.body[0]['uid']).to.be.a("string")
            chai.expect(res.body[0]['mealid']).to.be.a("string")
           
          })
        })
    })
})