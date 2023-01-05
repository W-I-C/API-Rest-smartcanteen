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
const mealId = '1f19215b-720b-4764-9528-86dd6bf0e795';
// this variable will store the token that results from the correct login
let token = '';
// TODO: fazer esta rota
describe("Test remove one meal of the bar that employee works", () => {
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
                .delete(baseUrl + '/meal/' + mealId)
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
                .delete(baseUrl + '/meal/' + mealId)
                .set("Authorization", invalidToken)
                .then(res => {
                res.should.have.status(401);
                chai_1.default.expect(res.body).to.have.property("Error");
            });
        });
    });
    describe('- Meal that dont exist or was removed', () => {
        it('Should return invalid meal error', () => {
            return chai_1.default
                .request(server)
                .delete(baseUrl + '/meal/057b8e77-0b3b-487c-a8f8-d979a1338c7a')
                .set("Authorization", token)
                .then(res => {
                res.should.have.status(500);
            });
        });
    });
    describe('- User try to remove a meal that dont belongs to the same bar', () => {
        it('Should return invalid bar error', () => {
            return chai_1.default
                .request(server)
                .delete(baseUrl + '/meal/04720b43-2c3b-4c78-baef-fcada0a40baa')
                .set("Authorization", token)
                .then(res => {
                res.should.have.status(500);
            });
        });
    });
    describe('- Remove One Meal Right', () => {
        it('Should remove a meal of the bar that employee works', () => {
            return chai_1.default
                .request(server)
                .delete(baseUrl + '/meal/' + mealId)
                .set("Authorization", token)
                .then(res => {
                res.should.have.status(200);
            });
        });
    });
});
//# sourceMappingURL=removeMealTest.js.map