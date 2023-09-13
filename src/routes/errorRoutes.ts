import { Request, Response, Router } from 'express';

let lastError: Error | null = null;

const router = Router();

router.get('/last-error', (req: Request, res: Response) => {
    res.json(lastError);
});

export default router;