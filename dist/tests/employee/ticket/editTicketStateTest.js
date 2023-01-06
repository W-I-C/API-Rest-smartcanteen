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
const ticketId = '534cf037-6a41-475b-81d8-c90af631084f';
// this variable will store the token that results from the correct login
let token = '';
describe("Test edit ticket state", () => {
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
                .put(baseUrl + '/tickets/' + ticketId)
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
                .put(baseUrl + '/tickets/' + ticketId)
                .set("Authorization", invalidToken)
                .then(res => {
                res.should.have.status(401);
                chai_1.default.expect(res.body).to.have.property("Error");
            });
        });
    });
    describe('- Edit ticket state without body', () => {
        it('Should return incomplete body error', () => {
            return chai_1.default
                .request(server)
                .put(baseUrl + '/tickets/' + ticketId)
                .set("Authorization", token)
                .then(res => {
                res.should.have.status(500);
            });
        });
    });
    describe('- Edit a ticket that doesnt exist', () => {
        it('Should return ticket error', () => {
            return chai_1.default
                .request(server)
                .put(baseUrl + '/tickets/534cf037-6a41-475b-81d8-c90af631084c')
                .set("Authorization", token)
                .send({
                stateName: "Entregue"
            })
                .then(res => {
                res.should.have.status(500);
            });
        });
    });
    describe('- Edit a ticket with a state that doesnt exist', () => {
        it('Should return state error', () => {
            return chai_1.default
                .request(server)
                .put(baseUrl + '/tickets/' + ticketId)
                .set("Authorization", token)
                .send({
                stateName: "Para entregar"
            })
                .then(res => {
                res.should.have.status(500);
            });
        });
    });
    describe('- Edit a ticket that is associated with a different bar than the employee', () => {
        it('Should return bar error', () => {
            return chai_1.default
                .request(server)
                .put(baseUrl + '/meal/f6219d36-b8ef-4338-8d2a-cfcd77433dc2')
                .set("Authorization", token)
                .send({
                stateName: "Entregue",
            })
                .then(res => {
                res.should.have.status(500);
            });
        });
    });
    describe('- Edit a ticket that is already delivered', () => {
        it('Should return bar error', () => {
            return chai_1.default
                .request(server)
                .put(baseUrl + '/meal/534cf037-6a41-475b-81d8-c90af631084f')
                .set("Authorization", token)
                .send({
                stateName: "Entregue",
            })
                .then(res => {
                res.should.have.status(500);
            });
        });
    });
    describe('- Edit Ticket State correctly', () => {
        it('Should return the ticket edited', () => {
            return chai_1.default
                .request(server)
                .put(baseUrl + '/tickets/' + ticketId)
                .set("Authorization", token)
                .send({
                stateName: "Entregue"
            })
                .then(res => {
                res.should.have.status(200);
                chai_1.default.expect(res.body).to.be.an("object");
                chai_1.default.expect(res.body).to.have.property("ticketid");
                chai_1.default.expect(res.body).to.have.property("stateid");
                chai_1.default.expect(res.body['ticketid']).to.be.a("string");
                chai_1.default.expect(res.body['stateid']).to.be.a("string");
            });
        });
    });
});
//# sourceMappingURL=editTicketStateTest.js.map