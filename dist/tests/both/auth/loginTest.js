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
const email = 'employe@employee.com';
const password = 'Teste_#';
describe("Test login", function () {
    describe('- Wrong Credentials', () => {
        it('Should return invalid credentials', () => {
            return chai_1.default
                .request(server)
                .post(baseUrl + '/login')
                .send({
                email: "testeErrado@teste.com",
                password: "teste"
            })
                .then(res => {
                res.should.have.status(401);
                chai_1.default.expect(res.body).to.have.property("msg");
            });
        });
    });
    describe('- Wrong Credentials', () => {
        it('Should return incomplete body error', () => {
            return chai_1.default
                .request(server)
                .post(baseUrl + '/login')
                .then(res => {
                res.should.have.status(401);
                chai_1.default.expect(res.body).to.have.property("msg");
            });
        });
    });
    describe('- Correct Login', () => {
        it('Should return session token', () => {
            return chai_1.default
                .request(server)
                .post(baseUrl + '/login')
                .send({
                email: email,
                password: password
            })
                .then(res => {
                res.should.have.status(200);
                // verificar se é um object
                chai_1.default.expect(res.body).to.be.an("object");
                chai_1.default.expect(res.body).to.have.property("token");
                chai_1.default.expect(res.body).to.have.property("role");
                chai_1.default.expect(res.body).property("token").to.be.a("string");
                chai_1.default.expect(res.body).property("token").to.be.a("string");
            });
        });
    });
});
//# sourceMappingURL=loginTest.js.map