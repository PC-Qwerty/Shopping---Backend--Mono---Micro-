const ShoppingService = require("../services/shopping-service");
const { SubscribeMessage } = require("../utils");
const  UserAuth = require('./middlewares/auth');
const { CUSTOMER_BINDING_KEY } = require('../config');
const { PublishMessage } = require('../utils')

module.exports = (app,channel) => {
    
    const service = new ShoppingService();
(channel, service);

    app.post('/order',UserAuth, async (req,res,next) => {

        const { _id } = req.user;
        const { txnNumber } = req.body;

        const { data } = await service.PlaceOrder({_id, txnNumber});
        
        const payload = await service.GetOrderPayload(_id, data, 'CREATE_ORDER')

        // PublishCustomerEvent(payload)

        // PublishMessage(channel, CUSTOMER_BINDING_KEY, JSON.stringify(payload))

        res.status(200).json(data);

    });

    app.get('/orders',UserAuth, async (req,res,next) => {

        const { _id } = req.user;

        const { data } = await service.GetOrderDetails({_id});

        res.status(200).json(data);

    });

    app.put('/cart',UserAuth, async (req,res,next) => {

        const { _id } = req.user;

        const { data } = await service.SubscribeEvents({event : 'ADD_TO_CART' , data : {userId :_id, product : req.body._id , qty : re.body.qty}})
        
        res.status(200).json(data);

    });

    app.delete('/cart/:id',UserAuth, async (req,res,next) => {

        const { _id } = req.user;


        const { data } = await service.SubscribeEvents({event : 'REMOVE_FROM_CART' , data : {userId :_id, product : req.body._id }})
        
        res.status(200).json(data);

    });
    
    app.get('/cart', UserAuth, async (req,res,next) => {

        const { _id } = req.user;
         
        const { data } = await service.GetCart({ _id });

        return res.status(200).json(data);
    });

    app.get('/whoami', (req,res,next) => {
        return res.status(200).json({msg: '/shoping : I am Shopping Service'})
    })
 
}