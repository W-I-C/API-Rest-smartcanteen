"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumerRouter = void 0;
const express_1 = __importDefault(require("express"));
const consumerRouter = express_1.default.Router();
exports.consumerRouter = consumerRouter;
const validateToken_1 = require("../middlewares/validateToken");
const validateRefreshToken_1 = require("../middlewares/validateRefreshToken");
const isConsumer_1 = require("../middlewares/isConsumer");
const addFavController_1 = require("../controllers/consumer/favoriteMeal/addFavController");
const addMealCartController_1 = require("../controllers/consumer/cart/addMealCartController");
const seeFavController_1 = require("../controllers/consumer/favoriteMeal/seeFavController");
const seeOneFavController_1 = require("../controllers/consumer/favoriteMeal/seeOneFavController");
const removeFavController_1 = require("../controllers/consumer/favoriteMeal/removeFavController");
const seeMealCartController_1 = require("../controllers/consumer/cart/seeMealCartController");
const removeMealsCartController_1 = require("../controllers/consumer/cart/removeMealsCartController");
const seeTradesHistoryController_1 = require("../controllers/consumer/trades/seeTradesHistoryController");
const removeTicketController_1 = require("../controllers/consumer/ticket/removeTicketController");
const seeTicketsHistoryController_1 = require("../controllers/consumer/ticket/seeTicketsHistoryController");
const acceptTradeController_1 = require("../controllers/consumer/trades/acceptTradeController");
const seeTradesController_1 = require("../controllers/consumer/trades/seeTradesController");
const getNotificationsController_1 = require("../controllers/consumer/notifications/getNotificationsController");
const directTicketTradeController_1 = require("../controllers/consumer/trades/directTicketTradeController");
const generalTicketTradeController_1 = require("../controllers/consumer/trades/generalTicketTradeController");
const cancelTradingController_1 = require("../controllers/consumer/trades/cancelTradingController");
const completeCartController_1 = require("../controllers/consumer/cart/completeCartController");
const seeMyTradesController_1 = require("../controllers/consumer/trades/seeMyTradesController");
const addFavController = new addFavController_1.AddFavController();
const removeFavController = new removeFavController_1.RemoveFavController();
const seeFavController = new seeFavController_1.SeeFavController();
const seeOneFavController = new seeOneFavController_1.SeeOneFavController();
const addMealCartController = new addMealCartController_1.AddMealCartController();
const seeMealsCartController = new seeMealCartController_1.SeeMealsCartController();
const removeMealsCartController = new removeMealsCartController_1.RemoveMealsCartController();
const seeTradesHistoryController = new seeTradesHistoryController_1.SeeTradesHistoryController();
const removeTicketController = new removeTicketController_1.RemoveTicketController();
const seeTicketsHistoryController = new seeTicketsHistoryController_1.SeeTicketsHistoryController();
const acceptTradeController = new acceptTradeController_1.AcceptTradeController();
const seeTradesController = new seeTradesController_1.SeeTradesController();
const getNotificationsController = new getNotificationsController_1.GetNotificationsController();
const directTicketTradeController = new directTicketTradeController_1.DirectTicketTradeController();
const generalTicketTradeController = new generalTicketTradeController_1.GeneralTicketTradeController();
const cancelTradingController = new cancelTradingController_1.CancelTradingController();
const completeCartController = new completeCartController_1.CompleteCartController();
const seeMyTradesController = new seeMyTradesController_1.SeeMyTradesController();
//adicionar aos favoritos refei????o
consumerRouter.post("/favoriteMeals/:mealId", validateToken_1.validateToken, validateRefreshToken_1.validateRefreshToken, isConsumer_1.isConsumer, addFavController.handle);
consumerRouter.delete("/favoriteMeals/:favoriteMealId", validateToken_1.validateToken, validateRefreshToken_1.validateRefreshToken, isConsumer_1.isConsumer, removeFavController.handle);
consumerRouter.get("/favoriteMeals", validateToken_1.validateToken, validateRefreshToken_1.validateRefreshToken, isConsumer_1.isConsumer, seeFavController.handle);
consumerRouter.get("/favoriteMeals/:favoriteMealId", validateToken_1.validateToken, validateRefreshToken_1.validateRefreshToken, isConsumer_1.isConsumer, seeOneFavController.handle);
consumerRouter.post("/cart/:mealId", validateToken_1.validateToken, validateRefreshToken_1.validateRefreshToken, isConsumer_1.isConsumer, addMealCartController.handle);
consumerRouter.get("/cart/meals", validateToken_1.validateToken, validateRefreshToken_1.validateRefreshToken, isConsumer_1.isConsumer, seeMealsCartController.handle);
consumerRouter.delete("/meals/:cartMealId", validateToken_1.validateToken, validateRefreshToken_1.validateRefreshToken, isConsumer_1.isConsumer, removeMealsCartController.handle);
consumerRouter.get("/trades", validateToken_1.validateToken, validateRefreshToken_1.validateRefreshToken, isConsumer_1.isConsumer, seeTradesHistoryController.handle);
consumerRouter.delete("/tickets/:ticketId", validateToken_1.validateToken, validateRefreshToken_1.validateRefreshToken, isConsumer_1.isConsumer, removeTicketController.handle);
consumerRouter.get("/tickets", validateToken_1.validateToken, validateRefreshToken_1.validateRefreshToken, isConsumer_1.isConsumer, seeTicketsHistoryController.handle);
consumerRouter.put("/trades/:ticketId", validateToken_1.validateToken, validateRefreshToken_1.validateRefreshToken, isConsumer_1.isConsumer, acceptTradeController.handle);
consumerRouter.get("/trades/available/:campusid", validateToken_1.validateToken, validateRefreshToken_1.validateRefreshToken, isConsumer_1.isConsumer, seeTradesController.handle);
consumerRouter.get("/notifications", validateToken_1.validateToken, validateRefreshToken_1.validateRefreshToken, isConsumer_1.isConsumer, getNotificationsController.handle);
consumerRouter.put("/trades/:ticketId/direct/:receiverId", validateToken_1.validateToken, validateRefreshToken_1.validateRefreshToken, isConsumer_1.isConsumer, directTicketTradeController.handle);
consumerRouter.put("/trades/:ticketId/general", validateToken_1.validateToken, validateRefreshToken_1.validateRefreshToken, isConsumer_1.isConsumer, generalTicketTradeController.handle);
consumerRouter.delete("/trades/:ticketId/", validateToken_1.validateToken, validateRefreshToken_1.validateRefreshToken, isConsumer_1.isConsumer, cancelTradingController.handle);
consumerRouter.post("/cart/:cartId/complete", validateToken_1.validateToken, validateRefreshToken_1.validateRefreshToken, isConsumer_1.isConsumer, completeCartController.handle);
consumerRouter.get("/mytrades", validateToken_1.validateToken, validateRefreshToken_1.validateRefreshToken, isConsumer_1.isConsumer, seeMyTradesController.handle);
//# sourceMappingURL=consumerRoutes.js.map