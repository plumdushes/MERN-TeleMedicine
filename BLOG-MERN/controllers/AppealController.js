import AppealModel from '../models/Appeal.js';

export const getAll = async (req, res) => {
    try {
        const appeals = await AppealModel.find().populate('user').exec(); //добавляем связь с юзером
        res.json(appeals);

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: 'Не удалось получить обращения',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const appealId = req.params.id;

        const updatedAppeal = await AppealModel.findOneAndUpdate(
            {
                _id: appealId,
            },
            {
                $inc: { viewsCount: 1 },
            },
            {
                returnDocument: 'after',
            }
        ).populate('user');

        if (!updatedAppeal) {
            return res.status(404).json({
                message: 'Обращение не найдено',
            });
        }

        res.json(updatedAppeal);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить обращение',
        });
    }
};

export const getLastTags = async (req, res) => {
    try {
        const appeals = await AppealModel.find().limit(5).exec(); //добавляем связь с юзером

        const tags = appeals
            .map((obj) => obj.tags)
            .flat()
            .slice(0, 5);

        res.json(tags);

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: 'Не удалось получить обращения',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const appealId = req.params.id;

        AppealModel
            .findOneAndDelete(
                {
                    _id: appealId
                },
            )
            .then((doc) => {

                if (!doc) {
                    return res.status(404).json({
                        message: 'Обращение не найдено',
                    });
                }

                res.json(doc);
            })
            .catch((err) => {
                console.log(err);

                return res.status(500).json({
                    message: 'Не удалось получить обращение',
                });
            });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: 'Не удалось получить обращение',
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new AppealModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(','),
            user: req.userId,
        });

        const appeal = await doc.save();

        res.json(appeal);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: 'Не удалось создать обращение',
        });
    }
};

export const update = async (req, res) => {
    try {
        const appealId = req.params.id;

        await AppealModel.updateOne(
            {
                _id: appealId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags.split(','),
                user: req.userId,
            },
        );

        res.json({
            success: true,
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: 'Не удалось обновить обращение',
        });
    }
};
