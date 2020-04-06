import Router from 'express-promise-router';
import { helloWorld } from './hello-world-controller';

const router = Router();

router.post('/', helloWorld);

export default router;
