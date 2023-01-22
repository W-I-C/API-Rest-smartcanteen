import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1/consumer"
const server = "localhost:3000"
const invalidToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'
const favMealId = '84df4661-181c-4e59-95c5-8c4b81b31c4c'

// this variable will store the token that results from the correct login
let token = ''

describe("Test get one favorite meal of the user", () => {

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
        .get(baseUrl + '/favoriteMeals/' + favMealId)
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
        .get(baseUrl + '/favoriteMeals/' + favMealId)
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
        .delete(baseUrl + '/favoriteMeals/3aa4e90e-2b7a-464d-b231-c2e7f9aed79c')
        .set("Authorization", token)
        .then(res => {
          res.should.have.status(500)
        })
    })
  })

  describe('- See One Favorite Meal That Does Not Belong To The Person', () => {
    it('Should return user error', () => {
      return chai
        .request(server)
        .get(baseUrl + '/favoriteMeals/27f4b889-8ed9-4bfa-95b1-bd16cfa25f4b')
        .set("Authorization", token)
        .then(res => {
          res.should.have.status(500)
        })
    })
  })

  describe('- Get One Fav Meal Right', () => {
    it('Should return a favorite meal of the user', () => {
      return chai
        .request(server)
        .get(baseUrl + '/favoriteMeals/' + favMealId)
        .set("Authorization", token)
        .then(res => {
          res.should.have.status(200)

          chai.expect(res.body).to.be.an("object")

          chai.expect(res.body).to.have.property("name")
          chai.expect(res.body).to.have.property("preparationtime")
          chai.expect(res.body).to.have.property("price")

          chai.expect(res.body['name']).to.be.a("string")
          chai.expect(res.body['preparationtime']).to.be.a("number")
          chai.expect(res.body['price']).to.be.a("number")
        })
    })
  })
})