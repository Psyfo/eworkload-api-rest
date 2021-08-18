/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
const router = express.Router();

router.get('/', (req, res, next) => {
	res.status(200).json({
		index: 'Index Working!'
	});
});
router.get('/test', (req, res) => {
	res.status(200).json({
		test: 'Test Working!'
	});
});
router.get('/error', (req, res, next) => {
	try {
		throw new Error('Error test');
	} catch (error) {
		next(error);
	}
});
// router.get('*', function (req, res, next) {
//   res.status(301).redirect('/not-found');
// });

export default router;
