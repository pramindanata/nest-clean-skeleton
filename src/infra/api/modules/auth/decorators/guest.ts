import { UseGuards } from '@nestjs/common';
import { GuestGuard } from '../guards';

export const Guest = () => UseGuards(GuestGuard);
