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
const baseUrl = "/api/v1/consumer";
const server = "localhost:3000";
const invalidToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk';
const cartmealId = '16364373-df41-4634-b956-910b92e47ed8';
// this variable will store the token that results from the correct login
let token = '';
describe("Test remove meal from car", () => {
    // before testing the route we need to login to get the token
    beforeEach((done) => {
        chai_1.default
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
            return chai_1.default
                .request(server)
                .delete(baseUrl + '/meals/' + cartmealId)
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
                .delete(baseUrl + '/meals/' + cartmealId)
                .set("Authorization", invalidToken)
                .then(res => {
                res.should.have.status(401);
                chai_1.default.expect(res.body).to.have.property("Error");
            });
        });
    });
    describe('- remove meals from a cart', () => {
        it('Should return meals from cart', () => {
            return chai_1.default
                .request(server)
                .delete(baseUrl + '/meals/' + cartmealId)
                .set("Authorization", token)
                .then(res => {
                res.should.have.status(200);
                // verificar se é um object
                chai_1.default.expect(res.body).to.be.an("array");
                chai_1.default.expect(res.body[0]).to.be.an("object");
                chai_1.default.expect(res.body[0]).to.have.property("cartid");
                chai_1.default.expect(res.body[0]).to.have.property("uid");
                chai_1.default.expect(res.body[0]).to.have.property("date");
                chai_1.default.expect(res.body[0]).to.have.property("iscompleted");
                chai_1.default.expect(res.body[0]['cartid']).to.be.a("string");
                chai_1.default.expect(res.body[0]['uid']).to.be.a("string");
                chai_1.default.expect(res.body[0]['date']).to.be.a("string");
                chai_1.default.expect(res.body[0]['iscompleted']).to.be.a("boolean");
            });
        });
    });
});
//# sourceMappingURL=removeMealCartTest.js.map