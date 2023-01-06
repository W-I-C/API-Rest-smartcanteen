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
// this variable will store the token that results from the correct login
let token = '';
describe("Test get all favorite meals of the user", () => {
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
    describe('- Get Favourite Meals Right', () => {
        it('Should return a array with all the favorite meals of the user', () => {
            return chai_1.default
                .request(server)
                .get(baseUrl + '/favoriteMeals')
                .set("Authorization", token)
                .then(res => {
                res.should.have.status(200);
                chai_1.default.expect(res.body).to.be.an("array");
                if (res.body.length > 0) {
                    for (let i = 0; i < res.body.length; i++) {
                        chai_1.default.expect(res.body[i]).to.be.an("object");
                        chai_1.default.expect(res.body[i]).to.have.property("name");
                        chai_1.default.expect(res.body[i]).to.have.property("preparationtime");
                        chai_1.default.expect(res.body[i]).to.have.property("price");
                        chai_1.default.expect(res.body[i]).to.have.property("url");
                        chai_1.default.expect(res.body[i]['name']).to.be.a("string");
                        chai_1.default.expect(res.body[i]['preparationtime']).to.be.a("number");
                        chai_1.default.expect(res.body[i]['price']).to.be.a("number");
                        if (res.body[i]['url'] != null) {
                            chai_1.default.expect(res.body[i]['url']).to.be.a("string");
                        }
                    }
                }
            });
        });
    });
});
//# sourceMappingURL=seeFavTest.js.map