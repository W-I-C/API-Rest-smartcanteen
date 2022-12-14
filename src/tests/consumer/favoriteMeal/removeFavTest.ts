import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1/consumer"
const server = "localhost:3000"
const invalidToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'
const favMealId = '5a4bbf83-23e7-4956-a7af-3a69c1371907'

// this variable will store the token that results from the correct login
let token=''

describe("Test remove one favorite meal of the user", () => {

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
        .delete(baseUrl+'/favoriteMeals/'+favMealId)
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
        .delete(baseUrl+'/favoriteMeals/'+favMealId)
        .set("Authorization", invalidToken)
        .then(res => {
          res.should.have.status(401)
            chai.expect(res.body).to.have.property("Error")
        })
      })
    })

    describe('- Favorite Meal that dont exist', () => {
        it('Should return invalid meal error', () => {
          return chai
          .request(server)
          .delete(baseUrl+'/favoriteMeals/27f4b889-8ed9-4bfa-95b1-bd16cfa25f4c')
          .set("Authorization", token)
          .then(res => {
            res.should.have.status(500)
          })
        })
      })

      describe('- Remove One Favorite Meal That Does Not Belong To The Person', () => {
        it('Should return user error', () => {
          return chai
          .request(server)
          .get(baseUrl+'/favoriteMeals/27f4b889-8ed9-4bfa-95b1-bd16cfa25f4b')
          .set("Authorization", token)
          .then(res => {
            res.should.have.status(500)
          })
        })
      })

    describe('- Remove One Fav Meal Right', () => {
        it('Should remove a favorite meal of the user', () => {
          return chai
          .request(server)
          .delete(baseUrl+'/favoriteMeals/'+favMealId)
          .set("Authorization", token)
          .then(res => {
            res.should.have.status(200)
            })
        })
    })
})