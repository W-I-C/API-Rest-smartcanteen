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
const campusid = '13be23c1-2e9b-43fc-acaa-839c6b3573bc';
// this variable will store the token that results from the correct login
let token = '';
describe("Test see trades available", () => {
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
                .get(baseUrl + '/trades/available/' + campusid)
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
                .get(baseUrl + '/trades/available/' + campusid)
                .set("Authorization", invalidToken)
                .then(res => {
                res.should.have.status(401);
                chai_1.default.expect(res.body).to.have.property("Error");
            });
        });
    });
    describe('- see trades available', () => {
        it('Should return available trades', () => {
            return chai_1.default
                .request(server)
                .get(baseUrl + '/trades/available/' + campusid)
                .set("Authorization", token)
                .then(res => {
                res.should.have.status(200);
                // verificar se é um object
                chai_1.default.expect(res.body).to.be.an("array");
                if (res.body.length > 0) {
                    for (let i = 0; i < res.body.length; i++) {
                        chai_1.default.expect(res.body[i]).to.be.an("object");
                        chai_1.default.expect(res.body[i]).to.have.property("campusid");
                        chai_1.default.expect(res.body[i]).to.have.property("name");
                        chai_1.default.expect(res.body[i]).to.have.property("barid");
                        chai_1.default.expect(res.body[i]).to.have.property("ticketid");
                        chai_1.default.expect(res.body[i]).to.have.property("uid");
                        chai_1.default.expect(res.body[i]).to.have.property("stateid");
                        chai_1.default.expect(res.body[i]).to.have.property("paymentmethodid");
                        chai_1.default.expect(res.body[i]).to.have.property("cartid");
                        chai_1.default.expect(res.body[i]).to.have.property("emissiondate");
                        chai_1.default.expect(res.body[i]).to.have.property("pickuptime");
                        chai_1.default.expect(res.body[i]).to.have.property("istakingaway");
                        chai_1.default.expect(res.body[i]).to.have.property("ispickedup");
                        chai_1.default.expect(res.body[i]).to.have.property("istrading");
                        chai_1.default.expect(res.body[i]).to.have.property("ticketamount");
                        chai_1.default.expect(res.body[i]).to.have.property("total");
                        chai_1.default.expect(res.body[i]).to.have.property("nencomenda");
                        chai_1.default.expect(res.body[i]).to.have.property("isdeleted");
                        chai_1.default.expect(res.body[i]).to.have.property("isdirecttrade");
                        chai_1.default.expect(res.body[i]).to.have.property("isconfirmed");
                        chai_1.default.expect(res.body[i]).to.have.property("proposaldate");
                        chai_1.default.expect(res.body[i]).to.have.property("confirmationdate");
                        chai_1.default.expect(res.body[i]).to.have.property("receptordecision");
                        chai_1.default.expect(res.body[i]).to.have.property("tradeId");
                        chai_1.default.expect(res.body[i]['campusid']).to.be.a("string");
                        chai_1.default.expect(res.body[i]['name']).to.be.a("string");
                        chai_1.default.expect(res.body[i]['barid']).to.be.a("string");
                        chai_1.default.expect(res.body[i]['ticketid']).to.be.a("string");
                        chai_1.default.expect(res.body[i]['uid']).to.be.a("string");
                        chai_1.default.expect(res.body[i]['stateid']).to.be.a("string");
                        chai_1.default.expect(res.body[i]['paymentmethodid']).to.be.a("string");
                        chai_1.default.expect(res.body[i]['cartid']).to.be.a("string");
                        chai_1.default.expect(res.body[i]['emissiondate']).to.be.a("string");
                        chai_1.default.expect(res.body[i]['pickuptime']).to.be.a("string");
                        chai_1.default.expect(res.body[i]['istakingaway']).to.be.a("boolean");
                        chai_1.default.expect(res.body[i]['ispickedup']).to.be.a("boolean");
                        chai_1.default.expect(res.body[i]['istrading']).to.be.a("boolean");
                        chai_1.default.expect(res.body[i]['ticketamount']).to.be.a("number");
                        chai_1.default.expect(res.body[i]['total']).to.be.a("number");
                        chai_1.default.expect(res.body[i]['nencomenda']).to.be.a("number");
                        chai_1.default.expect(res.body[i]['isdeleted']).to.be.a("boolean");
                        chai_1.default.expect(res.body[i]['isdirecttrade']).to.be.a("boolean");
                        chai_1.default.expect(res.body[i]['isconfirmed']).to.be.a("boolean");
                        chai_1.default.expect(res.body[i]['proposaldate']).to.be.a("string");
                        chai_1.default.expect(res.body[i]['confirmationdate']).to.be.a("string");
                        chai_1.default.expect(res.body[i]['receptordecision']).to.be.a("boolean");
                        chai_1.default.expect(res.body[i]['tradeId']).to.be.a("string");
                    }
                }
            });
        });
    });
});
//# sourceMappingURL=seeTradesTest.js.map