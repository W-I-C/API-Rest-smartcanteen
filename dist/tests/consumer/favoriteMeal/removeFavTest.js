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
const favMealId = '3aa4e90e-2b7a-464d-b231-c2e7f9aed79e';
// this variable will store the token that results from the correct login
let token = '';
describe("Test remove one favorite meal of the user", () => {
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
                .delete(baseUrl + '/favoriteMeals/' + favMealId)
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
                .delete(baseUrl + '/favoriteMeals/' + favMealId)
                .set("Authorization", invalidToken)
                .then(res => {
                res.should.have.status(401);
                chai_1.default.expect(res.body).to.have.property("Error");
            });
        });
    });
    describe('- Favorite Meal that dont exist', () => {
        it('Should return invalid meal error', () => {
            return chai_1.default
                .request(server)
                .delete(baseUrl + '/favoriteMeals/27f4b889-8ed9-4bfa-95b1-bd16cfa25f4c')
                .set("Authorization", token)
                .then(res => {
                res.should.have.status(500);
            });
        });
    });
    describe('- Remove One Favorite Meal That Does Not Belong To The Person', () => {
        it('Should return user error', () => {
            return chai_1.default
                .request(server)
                .get(baseUrl + '/favoriteMeals/27f4b889-8ed9-4bfa-95b1-bd16cfa25f4b')
                .set("Authorization", token)
                .then(res => {
                res.should.have.status(500);
            });
        });
    });
    describe('- Remove One Fav Meal Right', () => {
        it('Should remove a favorite meal of the user', () => {
            return chai_1.default
                .request(server)
                .delete(baseUrl + '/favoriteMeals/' + favMealId)
                .set("Authorization", token)
                .then(res => {
                res.should.have.status(200);
            });
        });
    });
});
//# sourceMappingURL=removeFavTest.js.map