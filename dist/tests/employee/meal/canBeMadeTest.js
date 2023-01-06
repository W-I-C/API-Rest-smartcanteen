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
const invalidMealId = '057b8e77-0b3b-487c-a8f8-d979a1338c7e';
const mealId = '057b8e77-0b3b-487c-a8f8-d979a1338c7a';
const mealIdAnotherBar = '04720b43-2c3b-4c78-baef-fcada0a40baa';
// this variable will store the token that results from the correct login
let token = '';
describe("Test can be made", () => {
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
                .put(baseUrl + '/meal/' + mealId + '/canBeMade')
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
                .put(baseUrl + '/meal/' + mealId + '/canBeMade')
                .set("Authorization", invalidToken)
                .then(res => {
                res.should.have.status(401);
                chai_1.default.expect(res.body).to.have.property("Error");
            });
        });
    });
    describe('- Set can be made without body', () => {
        it('Should return incomplete body error', () => {
            return chai_1.default
                .request(server)
                .put(baseUrl + '/meal/' + mealId + '/canBeMade')
                .set("Authorization", token)
                .then(res => {
                res.should.have.status(500);
            });
        });
    });
    describe('- Set can be made meal that doesnt exist', () => {
        it('Should return meal error', () => {
            return chai_1.default
                .request(server)
                .put(baseUrl + '/meal/' + invalidMealId + '/canBeMade')
                .set("Authorization", token)
                .send({
                status: false
            })
                .then(res => {
                res.should.have.status(500);
            });
        });
    });
    describe('- Set can be made meal that is from another bar', () => {
        it('Should return meal error', () => {
            return chai_1.default
                .request(server)
                .put(baseUrl + '/meal/' + mealIdAnotherBar + '/canBeMade')
                .set("Authorization", token)
                .send({
                status: false
            })
                .then(res => {
                res.should.have.status(500);
            });
        });
    });
    describe('- Set an be made successfully', () => {
        it('Should return the can be made success', () => {
            return chai_1.default
                .request(server)
                .put(baseUrl + '/meal/' + mealId + '/canBeMade')
                .set("Authorization", token)
                .send({
                status: false
            })
                .then(res => {
                res.should.have.status(200);
                chai_1.default.expect(res.body).to.be.an("object");
                chai_1.default.expect(res.body).to.have.property("msg");
                chai_1.default.expect(res.body['msg']).to.be.a("string");
            });
        });
    });
});
//# sourceMappingURL=canBeMadeTest.js.map