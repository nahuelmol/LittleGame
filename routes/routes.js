import express from 'express';
import csrf from 'csurf';
import { requireAuth }  from './middlewares.js';

const csrfProtection = csrf({ cookie: true });
const router = express.Router();

router.get('/', async (_req, res) => {
    res.render('main');
});

router.get('/register', csrfProtection, async (req, res) => {
    res.render('register', {
        csrfToken:req.csrfToken()
    });
});

router.get('/projects', async (_req, res) => {
    res.render('projects');
});

router.get('/contact', csrfProtection, async (req, res) => {
    res.render('contact', {
        csrfToken:req.csrfToken()
    });
});

router.get('/login', csrfProtection, async (req, res) => {
    res.render('login', {
        csrfToken:req.csrfToken()
    });
});

router.get("/console", requireAuth, (_req, res) => {
    res.render('console');
});

export default router;

