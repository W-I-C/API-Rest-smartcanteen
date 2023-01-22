import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:3000"
const invalidToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'

// this variable will store the token that results from the correct login
let token = ''

describe("Test edit profile", () => {
  // before testing the route we need to login to get the token
  beforeEach((done) => {
    chai
      .request(server)
      .post(baseUrl + "/login")
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
        .put(baseUrl + '/profile')
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
        .put(baseUrl + '/profile')
        .set("Authorization", invalidToken)
        .then(res => {
          res.should.have.status(401)
          chai.expect(res.body).to.have.property("Error")
        })
    })
  })

  describe('- Edit user profile without body', () => {
    it('Should return incomplete body error', () => {
      return chai
        .request(server)
        .put(baseUrl + '/profile')
        .set("Authorization", token)
        .then(res => {
          res.should.have.status(500)
        })
    })
  })

  describe('- Edit user profile with a campus that doesnt exist', () => {
    it('Should return campus error', () => {
      return chai
        .request(server)
        .put(baseUrl + '/profile')
        .set("Authorization", token)
        .send({
          preferredCampus: "13be23c1-2e9b-43fc-acaa-839c6b3573b",
          preferredBar: "a91aa933-440b-4c80-beef-f4cadd1aefff"
        })
        .then(res => {
          res.should.have.status(500)
        })
    })
  })

  describe('- Edit user profile with a bar that doesnt exist', () => {
    it('Should return bar error', () => {
      return chai
        .request(server)
        .put(baseUrl + '/profile')
        .set("Authorization", token)
        .send({
          preferredCampus: "13be23c1-2e9b-43fc-acaa-839c6b3573bc",
          preferredBar: "a91aa933-440b-4c80-beef-f4cadd1aeff"
        })
        .then(res => {
          res.should.have.status(500)
        })
    })
  })

  describe('- Edit user profile with a bar that doesnt belongs to the campus', () => {
    it('Should return bar campus error', () => {
      return chai
        .request(server)
        .put(baseUrl + '/profile')
        .set("Authorization", token)
        .send({
          preferredCampus: "13be23c1-2e9b-43fc-acaa-839c6b3573bc",
          preferredBar: "ec3b5a78-16c4-4cfc-b7b5-efc64ddc0c70"
        })
        .then(res => {
          res.should.have.status(500)
        })
    })
  })

  describe('- Edit user profile correctly', () => {
    it('Should return the user profile edited', () => {
      return chai
        .request(server)
        .put(baseUrl + '/profile')
        .set("Authorization", token)
        .send({
          preferredCampus: "13be23c1-2e9b-43fc-acaa-839c6b3573bc",
          preferredBar: "a91aa933-440b-4c80-beef-f4cadd1aefff"
        })
        .then(res => {
          res.should.have.status(200)
          // verificar se é um object
          chai.expect(res.body).to.be.an("object")

          chai.expect(res.body).to.have.property("preferredcampus")
          chai.expect(res.body).to.have.property("preferredbar")

          chai.expect(res.body['preferredcampus']).to.be.a("string")
          chai.expect(res.body['preferredbar']).to.be.a("string")
        })
    })
  })
})