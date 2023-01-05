import { Notification } from '@app/entities/notification';

export class NotificationViewModel {
    static toHTTP(notification: Notification) {
        return {
            id: notification.id,
            content: notification.content.value,
            categories: notification.categories,
            recipientId: notification.recipientId,
        };
    }
}
