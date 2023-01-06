import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1/employee"
const server = "localhost:3000"
const invalidToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'
const mealId = 'e88d03d7-be1a-4f6a-bb25-6bd6c3b5fff1'

// this variable will store the token that results from the correct login
let token=''

describe("Test edit one Meal", () => {
    // before testing the route we need to login to get the token
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
        .put(baseUrl+'/meal/'+mealId)
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
        .put(baseUrl+'/meal/'+mealId)
        .set("Authorization", invalidToken)
        .then(res => {
          res.should.have.status(401)
            chai.expect(res.body).to.have.property("Error")
        })
      })
    })

    describe('- Edit meal without body', () => {
        it('Should return incomplete body error', () => {
          return chai
            .request(server)
            .put(baseUrl+'/meal/'+mealId)
            .set("Authorization", token)
            .then(res => {
              res.should.have.status(500)
            })
        })
      })

    describe('- Edit a meal that doesnt exist', () => {
        it('Should return campus error', () => {
          return chai
            .request(server)
            .put(baseUrl+'/meal/29efcbf0-6b9d-4b0c-ab23-0a7906310b5')
            .set("Authorization", token)
            .send({
                name: "bife com arroz",
                preparationTime: 30,
                description: "prego",
                canTakeaway: true,
                price: 0.02,
                allowedChanges:[{		
                    ingname: "atum",
                    ingdosage: "porção",
                    isremoveonly: true,
                    canbeincremented: true,
                    canbedecremented: true,
                    incrementedlimit: 2,
                    decrementedlimit: 1
                },
                {		
                    ingname: "fiambre",
                    ingdosage: "porção",
                    isremoveonly: true,
                    canbeincremented: true,
                    canbedecremented: true,
                    incrementedlimit: 2,
                    decrementedlimit: 1
                },
                {		
                    ingname: "ovo",
                    ingdosage: "porção",
                    isremoveonly: true,
                    canbeincremented: true,
                    canbedecremented: true,
                    incrementedlimit: 2,
                    decrementedlimit: 1
	            }]
              })
            .then(res => {
              res.should.have.status(500)
            })
        })
      })

      describe('- Edit a meal that is associated with a different bar than the employee', () => {
        it('Should return campus error', () => {
          return chai
            .request(server)
            .put(baseUrl+'/meal/04720b43-2c3b-4c78-baef-fcada0a40baa')
            .set("Authorization", token)
            .send({
                name: "bife com arroz",
                preparationTime: 30,
                description: "prego",
                canTakeaway: true,
                price: 0.02,
                allowedChanges:[{		
                    ingname: "atum",
                    ingdosage: "porção",
                    isremoveonly: true,
                    canbeincremented: true,
                    canbedecremented: true,
                    incrementedlimit: 2,
                    decrementedlimit: 1
                },
                {		
                    ingname: "fiambre",
                    ingdosage: "porção",
                    isremoveonly: true,
                    canbeincremented: true,
                    canbedecremented: true,
                    incrementedlimit: 2,
                    decrementedlimit: 1
                },
                {		
                    ingname: "ovo",
                    ingdosage: "porção",
                    isremoveonly: true,
                    canbeincremented: true,
                    canbedecremented: true,
                    incrementedlimit: 2,
                    decrementedlimit: 1
	            }]
              })
            .then(res => {
              res.should.have.status(500)
            })
        })
      })

    describe('- Edit a meal with a name that already exists in the bar', () => {
        it('Should return name error', () => {
          return chai
            .request(server)
            .put(baseUrl+'/meal/'+mealId)
            .set("Authorization", token)
            .send({
                name: "bife com arroz",
                preparationTime: 30,
                description: "prego",
                canTakeaway: true,
                price: 0.02,
                allowedChanges:[{		
                    ingname: "atum",
                    ingdosage: "porção",
                    isremoveonly: true,
                    canbeincremented: true,
                    canbedecremented: true,
                    incrementedlimit: 2,
                    decrementedlimit: 1
                }]
              })
            .then(res => {
              res.should.have.status(500)
            })
        })
      })

    describe('- Edit Meal correctly', () => {
        it('Should return the meal edited', () => {
          return chai
          .request(server)
          .put(baseUrl+'/meal/'+mealId)
          .set("Authorization", token)
          .send({
            name: "bife com batata",
            preparationTime: 30,
            description: "prego",
            canTakeaway: true,
            price: 0.02,
            allowedChanges:[{		
                ingname: "atum",
                ingdosage: "porção",
                isremoveonly: true,
                canbeincremented: true,
                canbedecremented: true,
                incrementlimit: 2,
                decrementlimit: 1
            },{		
                ingname: "salada",
                ingdosage: "porção",
                isremoveonly: true,
                canbeincremented: true,
                canbedecremented: true,
                incrementlimit: 2,
                decrementlimit: 1
            }]
          })
          .then(res => {
            res.should.have.status(200)
            chai.expect(res.body).to.be.an("object")

            chai.expect(res.body).to.have.property("name")
            chai.expect(res.body).to.have.property("preparationtime")
            chai.expect(res.body).to.have.property("description")
            chai.expect(res.body).to.have.property("cantakeaway")
            chai.expect(res.body).to.have.property("price")
            chai.expect(res.body).to.have.property("allowedChanges")
            
            chai.expect(res.body['name']).to.be.a("string")
            chai.expect(res.body['preparationtime']).to.be.a("number")
            chai.expect(res.body['description']).to.be.a("string")
            chai.expect(res.body['cantakeaway']).to.be.a("boolean")
            chai.expect(res.body['price']).to.be.a("number")
            chai.expect(res.body['allowedChanges']).to.be.an("array")

            if(res.body['allowedChanges'].length>0){
              for(let i = 0; i < res.body['allowedChanges'].length; i++){
                chai.expect(res.body['allowedChanges'][i]).to.be.an("object") 
                
                chai.expect(res.body['allowedChanges'][i]).to.have.property("ingname")
                chai.expect(res.body['allowedChanges'][i]).to.have.property("ingdosage")
                chai.expect(res.body['allowedChanges'][i]).to.have.property("isremoveonly")
                chai.expect(res.body['allowedChanges'][i]).to.have.property("canbeincremented")
                chai.expect(res.body['allowedChanges'][i]).to.have.property("canbedecremented")
                chai.expect(res.body['allowedChanges'][i]).to.have.property("incrementlimit")
                chai.expect(res.body['allowedChanges'][i]).to.have.property("decrementlimit")

                
                chai.expect(res.body['allowedChanges'][i]['ingname']).to.be.a("string")
                chai.expect(res.body['allowedChanges'][i]['ingdosage']).to.be.a("string")
                chai.expect(res.body['allowedChanges'][i]['isremoveonly']).to.be.a("boolean")
                chai.expect(res.body['allowedChanges'][i]['canbeincremented']).to.be.a("boolean")
                chai.expect(res.body['allowedChanges'][i]['canbedecremented']).to.be.a("boolean")
                chai.expect(res.body['allowedChanges'][i]['incrementlimit']).to.be.a("number")
                chai.expect(res.body['allowedChanges'][i]['decrementlimit']).to.be.an("number")
              }    
            }
          })
        })
    })
})