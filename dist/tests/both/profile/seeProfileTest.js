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
// this variable will store the token that results from the correct login
let token = '';
describe("Test get logged in user profile", () => {
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
                .get(baseUrl + '/profile')
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
                .get(baseUrl + '/profile')
                .set("Authorization", invalidToken)
                .then(res => {
                res.should.have.status(401);
                chai_1.default.expect(res.body).to.have.property("Error");
            });
        });
    });
    describe('- Get Profile Right', () => {
        it('Should return a profile', () => {
            return chai_1.default
                .request(server)
                .get(baseUrl + '/profile')
                .set("Authorization", token)
                .then(res => {
                res.should.have.status(200);
                // verificar se ?? um object
                chai_1.default.expect(res.body).to.be.an("object");
                chai_1.default.expect(res.body).to.have.property("name");
                chai_1.default.expect(res.body).to.have.property("campusname");
                chai_1.default.expect(res.body).to.have.property("barname");
                chai_1.default.expect(res.body).to.have.property("imgurl");
                chai_1.default.expect(res.body['name']).to.be.a("string");
                chai_1.default.expect(res.body['campusname']).to.be.a("string");
                chai_1.default.expect(res.body['barname']).to.be.a("string");
                if (res.body['imgurl'] != null) {
                    chai_1.default.expect(res.body['imgurl']).to.be.a("string");
                }
            });
        });
    });
});
//# sourceMappingURL=seeProfileTest.js.map