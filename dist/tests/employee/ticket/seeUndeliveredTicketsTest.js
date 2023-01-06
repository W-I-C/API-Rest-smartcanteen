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
// this variable will store the token that results from the correct login
let token = '';
describe("Test get undelivered orders of the bar that the employee works", () => {
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
                .get(baseUrl + '/tickets')
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
                .get(baseUrl + '/tickets')
                .set("Authorization", invalidToken)
                .then(res => {
                res.should.have.status(401);
                chai_1.default.expect(res.body).to.have.property("Error");
            });
        });
    });
    describe('- Get Undelivered Tickets Right', () => {
        it('Should return a array with all the undelivered tickets of the bar of the employee', () => {
            return chai_1.default
                .request(server)
                .get(baseUrl + '/tickets')
                .set("Authorization", token)
                .then(res => {
                res.should.have.status(200);
                chai_1.default.expect(res.body).to.be.an("array");
                if (res.body.length > 0) {
                    for (let i = 0; i < res.body.length; i++) {
                        chai_1.default.expect(res.body[i]).to.be.an("object");
                        chai_1.default.expect(res.body[i]).to.have.property("ticketid");
                        chai_1.default.expect(res.body[i]).to.have.property("nencomenda");
                        chai_1.default.expect(res.body[i]).to.have.property("name");
                        chai_1.default.expect(res.body[i]).to.have.property("statename");
                        chai_1.default.expect(res.body[i]['ticketid']).to.be.a("string");
                        chai_1.default.expect(res.body[i]['nencomenda']).to.be.a("number");
                        chai_1.default.expect(res.body[i]['name']).to.be.a("string");
                        chai_1.default.expect(res.body[i]['statename']).to.be.a("string");
                    }
                }
            });
        });
    });
});
//# sourceMappingURL=seeUndeliveredTicketsTest.js.map