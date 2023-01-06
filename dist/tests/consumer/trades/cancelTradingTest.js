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
const ticketId = '42977dd1-cfbe-4e0d-a8b0-db1619decb30';
const invalidTicketId = '42977dd1-cfbe-4e0d-a8b0-db1619decb31';
const notMyTicketId = 'f6219d36-b8ef-4338-8d2a-cfcd77433dc2';
const notTradingTicketId = 'f6219d36-b8ef-4338-8d2a-cfcd77433dc2';
let token = '';
describe("Cancel Ticket Trading", () => {
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
                .delete(baseUrl + '/trades/' + ticketId)
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
                .delete(baseUrl + '/trades/' + ticketId)
                .set("Authorization", invalidToken)
                .then(res => {
                res.should.have.status(401);
                chai_1.default.expect(res.body).to.have.property("Error");
            });
        });
    });
    describe('- Cancel trading a ticket that doesnt exist', () => {
        it('Should return ticket error', () => {
            return chai_1.default
                .request(server)
                .delete(baseUrl + '/trades/' + invalidTicketId)
                .set("Authorization", token)
                .then(res => {
                res.should.have.status(500);
            });
        });
    });
    describe('- Cancel trading with a ticket that isnt trading', () => {
        it('Should return role error', () => {
            return chai_1.default
                .request(server)
                .delete(baseUrl + '/trades/' + notTradingTicketId)
                .set("Authorization", token)
                .then(res => {
                res.should.have.status(500);
            });
        });
    });
    describe('- Cancel trading with a ticket that isnt ours', () => {
        it('Should return order error', () => {
            return chai_1.default
                .request(server)
                .delete(baseUrl + '/trades/' + notMyTicketId)
                .set("Authorization", token)
                .then(res => {
                res.should.have.status(500);
            });
        });
    });
    describe('- Cancel trading correctly', () => {
        it('Should return cancel done successfully', () => {
            return chai_1.default
                .request(server)
                .delete(baseUrl + '/trades/' + ticketId)
                .set("Authorization", token)
                .then(res => {
                res.should.have.status(200);
                chai_1.default.expect(res.body).to.be.an("object");
                chai_1.default.expect(res.body).to.have.property("msg");
                chai_1.default.expect(res.body['msg']).to.be.a("string");
            });
        });
    });
});
//# sourceMappingURL=cancelTradingTest.js.map