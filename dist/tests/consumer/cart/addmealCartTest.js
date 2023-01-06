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
const mealId = '987d790b-4050-4026-8c29-b0a3c497ed1a';
// this variable will store the token that results from the correct login
let token = '';
describe("Test add meal to cart", () => {
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
                .post(baseUrl + '/cart/' + mealId)
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
                .post(baseUrl + '/cart/' + mealId)
                .set("Authorization", invalidToken)
                .then(res => {
                res.should.have.status(401);
                chai_1.default.expect(res.body).to.have.property("Error");
            });
        });
    });
    describe('- Add meal to cart correctly', () => {
        it('Should return cart meals', () => {
            return chai_1.default
                .request(server)
                .post(baseUrl + '/cart/' + mealId)
                .set("Authorization", token)
                .send({
                amount: 1
            })
                .then(res => {
                res.should.have.status(200);
                // verificar se é um object
                chai_1.default.expect(res.body).to.be.an("array");
                chai_1.default.expect(res.body[0]).to.be.an("object");
                chai_1.default.expect(res.body[0]).to.have.property("mealid");
                chai_1.default.expect(res.body[0]).to.have.property("amount");
                chai_1.default.expect(res.body[0]).to.have.property("mealprice");
                chai_1.default.expect(res.body[0]['mealid']).to.be.a("string");
                chai_1.default.expect(res.body[0]['amount']).to.be.a("number");
                chai_1.default.expect(res.body[0]['mealprice']).to.be.a("number");
            });
        });
    });
});
//# sourceMappingURL=addmealCartTest.js.map