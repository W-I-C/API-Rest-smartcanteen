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
const cartId = '997bce85-d3fb-49c8-bbb3-9c6c1776b973';
const invalidCartId = '997bce85-d3fb-49c8-bbb3-9c6c1776b974';
// this variable will store the token that results from the correct login
let token = '';
describe("Test complete cart", () => {
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
                .post(baseUrl + '/cart/' + cartId + '/complete')
                .send({
                "paymentmethodid": "57f7066e-e2a8-45bd-bad3-7f6773b2e26b",
                "barid": "0d9c0499-f2f8-44d5-9b49-a0529266433a",
                "ticketAmount": 1,
                "pickuptime": "2022-10-06 13:20:00",
                "istakingaway": true
            })
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
                .post(baseUrl + '/cart/' + cartId + '/complete')
                .set("Authorization", invalidToken)
                .send({
                "paymentmethodid": "57f7066e-e2a8-45bd-bad3-7f6773b2e26b",
                "barid": "0d9c0499-f2f8-44d5-9b49-a0529266433a",
                "ticketAmount": 1,
                "pickuptime": "2022-10-06 13:20:00",
                "istakingaway": true
            })
                .then(res => {
                res.should.have.status(401);
                chai_1.default.expect(res.body).to.have.property("Error");
            });
        });
    });
    describe('- Complete cart without body', () => {
        it('Should return cart completed successfully', () => {
            return chai_1.default
                .request(server)
                .post(baseUrl + '/cart/' + cartId + '/complete')
                .set("Authorization", token)
                .then(res => {
                res.should.have.status(500);
                chai_1.default.expect(res.body).to.be.a("string");
            });
        });
    });
    describe('- Complete cart correctly', () => {
        it('Should return cart completed successfully', () => {
            return chai_1.default
                .request(server)
                .post(baseUrl + '/cart/' + invalidCartId + '/complete')
                .set("Authorization", token)
                .send({
                "paymentmethodid": "57f7066e-e2a8-45bd-bad3-7f6773b2e26b",
                "barid": "0d9c0499-f2f8-44d5-9b49-a0529266433a",
                "ticketAmount": 1,
                "pickuptime": "2022-10-06 13:20:00",
                "istakingaway": true
            })
                .then(res => {
                res.should.have.status(500);
                chai_1.default.expect(res.body).to.be.a("string");
            });
        });
    });
    describe('- Complete cart correctly', () => {
        it('Should return cart completed successfully', () => {
            return chai_1.default
                .request(server)
                .post(baseUrl + '/cart/' + cartId + '/complete')
                .set("Authorization", token)
                .send({
                "paymentmethodid": "57f7066e-e2a8-45bd-bad3-7f6773b2e26b",
                "barid": "0d9c0499-f2f8-44d5-9b49-a0529266433a",
                "ticketAmount": 1,
                "pickuptime": "2022-10-06 13:20:00",
                "istakingaway": true
            })
                .then(res => {
                res.should.have.status(200);
                // verificar se é um object
                chai_1.default.expect(res.body).to.be.an("object");
                chai_1.default.expect(res.body).to.have.property("msg");
                chai_1.default.expect(res.body['msg']).to.be.a("string");
            });
        });
    });
});
//# sourceMappingURL=completeCartTest.js.map