import express, { NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { validatePerson } from './middlewares/validatePerson';
import { badRequestHandler } from './middlewares/badRequestHandler';
import { errorHandler } from './middlewares/errorHandler';
import { validateId } from './middlewares/validateId';

dotenv.config();
const app = express();
const prisma = new PrismaClient();
app.use(cors({
    origin: 'http://localhost:4200', // Permite solo este origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permite estos métodos
}));
app.use(express.json());

app.get('/people', async (req, res, next) => {
    try {
        const people = await prisma.person.findMany();
        if (!people) return res.status(404).json({ message: 'No hay Personas regustradas' });
        res.json(people);
      } catch (err) {
        next(err);
      }
});

app.get('/people/search', async (req, res, next) => {
    try { 
        const { search } = req.query;

        if (!search || typeof search !== 'string') return res.status(400).json({ message: 'Por favor, proporciona una cadena de búsqueda válida.' });

        const people = await prisma.person.findMany({
            where: {
                OR: [
                    { firstName: { contains: search.toLocaleLowerCase() } }, 
                    { lastNameP: { contains: search.toLocaleLowerCase() } },
                    { lastNameM: { contains: search.toLocaleLowerCase() } },
                ]
            }
        });
        if (!people.length) return res.status(404).json({ message: 'No se encontraron personas que coincidan con la búsqueda.' });

        res.json(people);
      } catch (err) {
        next(err);
      }
});

app.post('/people', validatePerson, async (req:any, res:any, next:NextFunction) => {
    try {
      let { firstName, lastNameP, lastNameM, address, phone } = req.body;
      if (typeof phone === 'number') phone = String(phone);
      const person = await prisma.person.create({
        data: { firstName, lastNameP, lastNameM, address, phone }
      });
      res.status(201).json(person);
    } catch (err) {
      next(err);
    }
});

app.put('/people/:id', validatePerson, async (req:any, res:any, next:NextFunction) => {
    try {
      const { id } = req.params;
      let { firstName, lastNameP, lastNameM, address, phone } = req.body;
      if (typeof phone === 'number') phone = String(phone);
      const updatedPerson = await prisma.person.update({
        where: { id: Number(id) },
        data: { firstName, lastNameP, lastNameM, address, phone }
      });
      res.json(updatedPerson);
    } catch (err) {
      next(err);
    }
});

app.delete('/people/:id', validateId, async (req, res, next) => {
    try {
        const { id } = req.params; 
        const deletedPerson = await prisma.person.delete({
            where: { id: Number(id) }
        });
        res.json({ message: 'Persona eliminada exitosamente', deletedPerson });
      } catch (err:any) {
        if (err.code === 'P2025') return res.status(404).json({ message: 'Persona no encontrada' });
        next(err);
      }
});


app.use(badRequestHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
