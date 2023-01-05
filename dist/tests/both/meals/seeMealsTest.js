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
const baseUrl = "/api/v1";
const server = "localhost:3000";
const invalidToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk';
const barId = 'a91aa933-440b-4c80-beef-f4cadd1aefff';
// this variable will store the token that results from the correct login
let token = '';
describe("Test see meals", () => {
    // before testing the route we need to login to get the token
    beforeEach((done) => {
        chai_1.default
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
            return chai_1.default
                .request(server)
                .get(baseUrl + '/meals/' + barId)
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
                .get(baseUrl + '/meals/' + barId)
                .set("Authorization", invalidToken)
                .then(res => {
                res.should.have.status(401);
                chai_1.default.expect(res.body).to.have.property("Error");
            });
        });
    });
    describe('- see meals from a bar', () => {
        it('Should return meals from bar', () => {
            return chai_1.default
                .request(server)
                .get(baseUrl + '/meals/' + barId)
                .set("Authorization", token)
                .then(res => {
                res.should.have.status(200);
                // verificar se é um object
                chai_1.default.expect(res.body).to.be.an("array");
                chai_1.default.expect(res.body[0]).to.be.an("object");
                chai_1.default.expect(res.body[0]).to.have.property("mealid");
                chai_1.default.expect(res.body[0]).to.have.property("barid");
                chai_1.default.expect(res.body[0]).to.have.property("name");
                chai_1.default.expect(res.body[0]).to.have.property("preparationtime");
                chai_1.default.expect(res.body[0]).to.have.property("description");
                chai_1.default.expect(res.body[0]).to.have.property("cantakeaway");
                chai_1.default.expect(res.body[0]).to.have.property("price");
                chai_1.default.expect(res.body[0]['mealid']).to.be.a("string");
                chai_1.default.expect(res.body[0]['barid']).to.be.a("string");
                chai_1.default.expect(res.body[0]['name']).to.be.a("string");
                chai_1.default.expect(res.body[0]['preparationtime']).to.be.a("number");
                chai_1.default.expect(res.body[0]['description']).to.be.a("string");
                chai_1.default.expect(res.body[0]['cantakeaway']).to.be.a("boolean");
                chai_1.default.expect(res.body[0]['price']).to.be.a("number");
            });
        });
    });
});
//# sourceMappingURL=seeMealsTest.js.map