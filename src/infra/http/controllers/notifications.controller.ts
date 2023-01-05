import { Body, Controller, Post } from '@nestjs/common';

import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotification } from '@app/use-cases/send-notification';

@Controller('notifications')
export class NotificationsController {
    constructor(private sendNotification: SendNotification) {}
    @Post()
    async create(@Body() body: CreateNotificationBody) {
        const { recipientId, content, categories } = body;

        const { notification } = await this.sendNotification.execute({
            recipientId,
            content,
            categories,
        });

        return { notification };
    }
}
