import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1/consumer"
const server = "localhost:3000"
const invalidToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'
const favMealId = 'ae10809a-0533-4d19-b763-f01a44986703'

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

    // TODO: tem que dar 500
    describe('- Favorite Meal that dont exist', () => {
        it('Should return invalid meal error', () => {
          return chai
          .request(server)
          .delete(baseUrl+'/favoriteMeals/ae10809a-0533-4d19-b763-f01a44986703')
          .set("Authorization", invalidToken)
          .then(res => {
            res.should.have.status(401)
              chai.expect(res.body).to.have.property("Error")
          })
        })
      })

    // TODO: como a query filtra o uid não vale a pena testar com outro user

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