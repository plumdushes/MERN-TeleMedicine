import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';

import { registerValidation, loginValidation, appealCreateValidation } from './validations.js';
import { UserController, AppealController } from './controllers/index.js';
import { handleValidationErrors, checkAuth } from './utils/index.js';

mongoose
    .connect('mongodb+srv://kittenbite:1234@cluster0.cpdyghc.mongodb.net/merndb?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB err', err));

const app = express();
const PORT = 4444;

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});
app.get('/tags', AppealController.getLastTags);
app.get('/appeals', AppealController.getAll);
app.get('/appeals/:id', AppealController.getOne);
app.get('/appeals/tags', AppealController.getLastTags);
app.post('/appeals', checkAuth, appealCreateValidation, handleValidationErrors, AppealController.create);
app.delete('/appeals/:id', checkAuth, AppealController.remove);
app.patch('/appeals/:id', checkAuth, appealCreateValidation, handleValidationErrors, AppealController.update);

app.listen(PORT, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});