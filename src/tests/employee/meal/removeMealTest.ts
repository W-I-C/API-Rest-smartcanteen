import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1/employee"
const server = "localhost:3000"
const invalidToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'
const mealId = '04720b43-2c3b-4c78-baef-fcada0a40baa'

// this variable will store the token that results from the correct login
let token=''

// TODO: fazer esta rota

describe("Test remove one meal of the bar that employee works", () => {

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
        .delete(baseUrl+'/favoriteMeals/'+mealId)
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
        .delete(baseUrl+'/meal/'+mealId)
        .set("Authorization", invalidToken)
        .then(res => {
          res.should.have.status(401)
            chai.expect(res.body).to.have.property("Error")
        })
      })
    })

    // TODO: tem que dar 500
    describe('- Meal that dont exist', () => {
        it('Should return invalid meal error', () => {
          return chai
          .request(server)
          .delete(baseUrl+'/meal/04720b43-2c3b-4c78-baef-fcada0a40b')
          .set("Authorization", invalidToken)
          .then(res => {
            res.should.have.status(401)
              chai.expect(res.body).to.have.property("Error")
          })
        })
      })

    // TODO: como a query filtra o uid não vale a pena testar com outro user

    describe('- Remove One Meal Right', () => {
        it('Should remove a meal of the bar that employee works', () => {
          return chai
          .request(server)
          .delete(baseUrl+'/meal/'+mealId)
          .set("Authorization", token)
          .then(res => {
            res.should.have.status(200)
            })
        })
    })
})