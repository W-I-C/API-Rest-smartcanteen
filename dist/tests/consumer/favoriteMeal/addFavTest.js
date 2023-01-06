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
const mealId = '057b8e77-0b3b-487c-a8f8-d979a1338c7a';
// this variable will store the token that results from the correct login
let token = '';
describe("Test add favorite meal", () => {
    // before testing the route we need to login to get the token
    beforeEach((done) => {
        chai_1.default
            .request(server)
            .post("/api/v1/login")
            .send({
            email: "consumer2@consumer.com",
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
                .post(baseUrl + '/favoriteMeals/' + mealId)
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
                .post(baseUrl + '/favoriteMeals/' + mealId)
                .set("Authorization", invalidToken)
                .then(res => {
                res.should.have.status(401);
                chai_1.default.expect(res.body).to.have.property("Error");
            });
        });
    });
    describe('- Add a meal to the favorites that doesnt belongs to the same bar of the user', () => {
        it('Should return bar error', () => {
            return chai_1.default
                .request(server)
                .post(baseUrl + '/favoriteMeals/1f19215b-720b-4764-9528-86dd6bf0e795')
                .set("Authorization", invalidToken)
                .then(res => {
                res.should.have.status(401);
                chai_1.default.expect(res.body).to.have.property("Error");
            });
        });
    });
    describe('- Add favorite meal correctly', () => {
        it('Should return favorite meals', () => {
            return chai_1.default
                .request(server)
                .post(baseUrl + '/favoriteMeals/' + mealId)
                .set("Authorization", token)
                .then(res => {
                res.should.have.status(200);
                // verificar se é um object
                chai_1.default.expect(res.body).to.be.an("array");
                if (res.body.length > 0) {
                    for (let i = 0; i < res.body.length; i++) {
                        chai_1.default.expect(res.body[i]).to.be.an("object");
                        chai_1.default.expect(res.body[i]).to.have.property("favoritemealid");
                        chai_1.default.expect(res.body[i]).to.have.property("uid");
                        chai_1.default.expect(res.body[i]).to.have.property("mealid");
                        chai_1.default.expect(res.body[i]['favoritemealid']).to.be.a("string");
                        chai_1.default.expect(res.body[i]['uid']).to.be.a("string");
                        chai_1.default.expect(res.body[i]['mealid']).to.be.a("string");
                    }
                }
            });
        });
    });
});
//# sourceMappingURL=addFavTest.js.map