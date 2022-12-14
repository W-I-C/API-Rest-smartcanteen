"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
require("mocha");
chai_1.default.use(chai_http_1.default);
const expect = chai_1.default.expect;
const should = chai_1.default.should();
const baseUrl = "/api/v1/employee";
const server = "localhost:3000";
const invalidToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk';
const barId = '0d9c0499-f2f8-44d5-9b49-a0529266433a';
// this variable will store the token that results from the correct login
let token = '';
describe("Test create one Meal", () => {
    // before testing the route we need to login to get the token
    beforeEach((done) => {
        chai_1.default
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
            return chai_1.default
                .request(server)
                .post(baseUrl + '/meal/' + barId)
                .then(res => {
                res.should.have.status(401);
                chai_1.default.expect(res.body).to.have.property("Error");
            });
        });
    });
    describe('- Invalid token', () => {
        it('Should return invalid token error', () => {
            return chai_1.default
                .request(server)
                .post(baseUrl + '/meal/' + barId)
                .set("Authorization", invalidToken)
                .then(res => {
                res.should.have.status(401);
                chai_1.default.expect(res.body).to.have.property("Error");
            });
        });
    });
    describe('- Create meal without body', () => {
        it('Should return incomplete body error', () => {
            return chai_1.default
                .request(server)
                .post(baseUrl + '/meal/' + barId)
                .set("Authorization", token)
                .then(res => {
                res.should.have.status(500);
            });
        });
    });
    describe('- Create a meal that already exist', () => {
        it('Should return campus error', () => {
            return chai_1.default
                .request(server)
                .post(baseUrl + '/meal/' + barId)
                .set("Authorization", token)
                .send({
                name: "bife com batata",
                preparationTime: 30,
                description: "bacalhau com batata palha",
                canTakeaway: true,
                price: 10,
                allowedChanges: [{
                        ingname: "maionese",
                        ingdosage: "por????o",
                        isremoveonly: true,
                        canbeincremented: true,
                        canbedecremented: true,
                        incrementedlimit: 2,
                        decrementedlimit: 1
                    },
                    {
                        ingname: "ovo",
                        ingdosage: "por????o",
                        isremoveonly: true,
                        canbeincremented: true,
                        canbedecremented: true,
                        incrementedlimit: 2,
                        decrementedlimit: 1
                    }]
            })
                .then(res => {
                res.should.have.status(500);
            });
        });
    });
    describe('- Create a meal to a bar that doesnt exist', () => {
        it('Should return bar error', () => {
            return chai_1.default
                .request(server)
                .post(baseUrl + '/meal/ec3b5a78-16c4-4cfc-b7b5-efc64ddc0c71')
                .set("Authorization", token)
                .send({
                name: "bacalhau ?? br??s",
                preparationTime: 30,
                description: "bacalhau com batata palha",
                canTakeaway: true,
                price: 10,
                allowedChanges: [{
                        ingname: "maionese",
                        ingdosage: "por????o",
                        isremoveonly: true,
                        canbeincremented: true,
                        canbedecremented: true,
                        incrementedlimit: 2,
                        decrementedlimit: 1
                    },
                    {
                        ingname: "ovo",
                        ingdosage: "por????o",
                        isremoveonly: true,
                        canbeincremented: true,
                        canbedecremented: true,
                        incrementedlimit: 2,
                        decrementedlimit: 1
                    }]
            })
                .then(res => {
                res.should.have.status(500);
            });
        });
    });
    describe('- Create a meal to a bar that is not the same as the user preferred bar', () => {
        it('Should return bar error', () => {
            return chai_1.default
                .request(server)
                .post(baseUrl + '/meal/ec3b5a78-16c4-4cfc-b7b5-efc64ddc0c70')
                .set("Authorization", token)
                .send({
                name: "bacalhau ?? br??s",
                preparationTime: 30,
                description: "bacalhau com batata palha",
                canTakeaway: true,
                price: 10,
                allowedChanges: [{
                        ingname: "maionese",
                        ingdosage: "por????o",
                        isremoveonly: true,
                        canbeincremented: true,
                        canbedecremented: true,
                        incrementedlimit: 2,
                        decrementedlimit: 1
                    },
                    {
                        ingname: "ovo",
                        ingdosage: "por????o",
                        isremoveonly: true,
                        canbeincremented: true,
                        canbedecremented: true,
                        incrementedlimit: 2,
                        decrementedlimit: 1
                    }]
            })
                .then(res => {
                res.should.have.status(500);
            });
        });
    });
    describe('- Create a meal with a name that already exists in the bar', () => {
        it('Should return name error', () => {
            return chai_1.default
                .request(server)
                .post(baseUrl + '/meal/' + barId)
                .set("Authorization", token)
                .send({
                name: "bife com batata",
                preparationTime: 30,
                description: "prego",
                canTakeaway: true,
                price: 0.02,
                allowedChanges: [{
                        ingname: "atum",
                        ingdosage: "por????o",
                        isremoveonly: true,
                        canbeincremented: true,
                        canbedecremented: true,
                        incrementedlimit: 2,
                        decrementedlimit: 1
                    }]
            })
                .then(res => {
                res.should.have.status(500);
            });
        });
    });
    describe('- Create Meal correctly', () => {
        it('Should return the meal created', () => {
            return chai_1.default
                .request(server)
                .post(baseUrl + '/meal/' + barId)
                .set("Authorization", token)
                .send({
                name: "douradinhos",
                preparationTime: 30,
                description: "bacalhau",
                canTakeaway: true,
                price: 10,
                allowedChanges: [{
                        ingname: "maionese",
                        ingdosage: "por????o",
                        isremoveonly: true,
                        canbeincremented: true,
                        canbedecremented: true,
                        incrementedlimit: 2,
                        decrementedlimit: 1
                    },
                    {
                        ingname: "ovo",
                        ingdosage: "por????o",
                        isremoveonly: true,
                        canbeincremented: true,
                        canbedecremented: true,
                        incrementedlimit: 2,
                        decrementedlimit: 1
                    }]
            })
                .then(res => {
                res.should.have.status(200);
                chai_1.default.expect(res.body).to.be.an("object");
                chai_1.default.expect(res.body).to.have.property("name");
                chai_1.default.expect(res.body).to.have.property("preparationtime");
                chai_1.default.expect(res.body).to.have.property("description");
                chai_1.default.expect(res.body).to.have.property("cantakeaway");
                chai_1.default.expect(res.body).to.have.property("price");
                chai_1.default.expect(res.body).to.have.property("allowedChanges");
                chai_1.default.expect(res.body['name']).to.be.a("string");
                chai_1.default.expect(res.body['preparationtime']).to.be.a("number");
                chai_1.default.expect(res.body['description']).to.be.a("string");
                chai_1.default.expect(res.body['cantakeaway']).to.be.a("boolean");
                chai_1.default.expect(res.body['price']).to.be.a("number");
                chai_1.default.expect(res.body['allowedChanges']).to.be.an("array");
                if (res.body['allowedChanges'].length > 0) {
                    for (let i = 0; i < res.body['allowedChanges'].length; i++) {
                        chai_1.default.expect(res.body['allowedChanges'][i]).to.be.an("object");
                        chai_1.default.expect(res.body['allowedChanges'][i]).to.have.property("ingname");
                        chai_1.default.expect(res.body['allowedChanges'][i]).to.have.property("ingdosage");
                        chai_1.default.expect(res.body['allowedchanges'][i]).to.have.property("isremoveonly");
                        chai_1.default.expect(res.body['allowedChanges'][i]).to.have.property("canbeincremented");
                        chai_1.default.expect(res.body['allowedChanges'][i]).to.have.property("canbedecremented");
                        chai_1.default.expect(res.body['allowedChanges'][i]).to.have.property("incrementlimit");
                        chai_1.default.expect(res.body['allowedChanges'][i]).to.have.property("decrementlimit");
                        chai_1.default.expect(res.body['allowedChanges'][i]['ingname']).to.be.a("string");
                        chai_1.default.expect(res.body['allowedChanges'][i]['ingdosage']).to.be.a("string");
                        chai_1.default.expect(res.body['allowedChanges'][i]['isremoveonly']).to.be.a("boolean");
                        chai_1.default.expect(res.body['allowedChanges'][i]['canbeincremented']).to.be.a("boolean");
                        chai_1.default.expect(res.body['allowedChanges'][i]['canbedecremented']).to.be.a("boolean");
                        chai_1.default.expect(res.body['allowedChanges'][i]['incrementlimit']).to.be.a("number");
                        chai_1.default.expect(res.body['allowedChanges'][i]['decrementlimit']).to.be.an("number");
                    }
                }
            });
        });
    });
});
//# sourceMappingURL=createMealTest.js.map