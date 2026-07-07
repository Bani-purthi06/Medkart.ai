import { Router } from 'express';

import { compareMedicineController } from '../controllers/compare.controller';

export const compareRoutes = Router();

compareRoutes.get('/compare/:medicineName', compareMedicineController);
