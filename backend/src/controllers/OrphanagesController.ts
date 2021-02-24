import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanages_view';
import * as Yup from 'yup';

export default {

    async create(req: Request, res: Response) {
        
        console.log(req.body)

        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = req.body;

        const orphanagesRepository = getRepository(Orphanage);

        const requestImages = req.files as Express.Multer.File[]; //forçando formato
        const images = requestImages.map(image => {
            return {
                path: image.filename
            }
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true' ,
            images,
        }

        const schema = Yup.object().shape({
            name: Yup.string().required('Obrigatory'),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        });

        await schema.validate(data, {
            abortEarly: false, //retorna todos os erros
        })

        const orphanage = orphanagesRepository.create(data);

        await orphanagesRepository.save(orphanage);


        return res.status(201).json(orphanage)
    },

    async index(req: Request, res: Response) {

        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });
        
        return res.status(200).json(orphanageView.renderMany(orphanages))
    },

    async show(req: Request, res: Response) {

        const { id } = req.params;

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });
        
        return res.status(200).json(orphanageView.render(orphanage));
    },

}