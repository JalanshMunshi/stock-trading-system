const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/transactions', require('./transactions'));
router.use('/stocks', require('./stocks'));
router.use('/portfolios', require('./portfolios'));
router.use('/markets', require('./markets'));

router.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
