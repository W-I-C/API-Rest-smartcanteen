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
const email = 'consumer3@consumer.com';
const invalidEmail = 'consumer@consumer.com';
const invalidSchoolno = 1222;
const password = 'Teste_#';
describe("Test register", function () {
    describe('- Email exists Credentials', () => {
        it('Should return email already registered', () => {
            return chai_1.default
                .request(server)
                .post(baseUrl + '/register')
                .send({
                roleid: "68271d1d-a6ab-46a3-a498-e2dda2850083",
                preferredcampus: "3b30ea61-1565-4fdc-8329-24b70511452b",
                preferredbar: "ec3b5a78-16c4-4cfc-b7b5-efc64ddc0c70",
                email: invalidEmail,
                name: "consumer",
                password: password,
                schoolno: 1222,
                birthdate: "1999-10-10",
                imgurl: null
            })
                .then(res => {
                res.should.have.status(500);
                chai_1.default.expect(res.body).to.be.a("string");
            });
        });
    });
    it('Should return schoolno already registered', () => {
        return chai_1.default
            .request(server)
            .post(baseUrl + '/register')
            .send({
            roleid: "68271d1d-a6ab-46a3-a498-e2dda2850083",
            preferredcampus: "3b30ea61-1565-4fdc-8329-24b70511452b",
            preferredbar: "ec3b5a78-16c4-4cfc-b7b5-efc64ddc0c70",
            email: email,
            name: "consumer",
            password: password,
            schoolno: invalidSchoolno,
            birthdate: "1999-10-10",
            imgurl: null
        })
            .then(res => {
            res.should.have.status(500);
            chai_1.default.expect(res.body).to.be.a("string");
        });
    });
});
describe('- No body test', () => {
    it('Should return incomplete body error', () => {
        return chai_1.default
            .request(server)
            .post(baseUrl + '/register')
            .then(res => {
            res.should.have.status(500);
            chai_1.default.expect(res.body).to.be.a("string");
        });
    });
});
describe('- Correct Register', () => {
    it('Should return session token', () => {
        return chai_1.default
            .request(server)
            .post(baseUrl + '/register')
            .send({
            roleid: "68271d1d-a6ab-46a3-a498-e2dda2850083",
            preferredcampus: "3b30ea61-1565-4fdc-8329-24b70511452b",
            preferredbar: "ec3b5a78-16c4-4cfc-b7b5-efc64ddc0c70",
            email: email,
            name: "consumer",
            password: password,
            schoolno: 123124,
            birthdate: "1999-10-10",
            imgurl: null
        })
            .then(res => {
            res.should.have.status(200);
            // verificar se é um object
            chai_1.default.expect(res.body).to.be.an("object");
            chai_1.default.expect(res.body).to.have.property("msg");
            chai_1.default.expect(res.body).property("msg").to.be.a("string");
        });
    });
});
//# sourceMappingURL=registerTest.js.map