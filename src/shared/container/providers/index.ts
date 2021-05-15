import { container } from 'tsyringe';

import { ICartolaProvider } from './CartolaProvider/ICartolaProvider';
import { CartolaProvider } from './CartolaProvider/implementations/CartolaProvider';
import { IDateProvider } from './DateProvider/IDateProvider';
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';

container.registerSingleton<IDateProvider>('DateProvider', DayjsDateProvider);

container.registerSingleton<ICartolaProvider>('CartolaProvider', CartolaProvider);
