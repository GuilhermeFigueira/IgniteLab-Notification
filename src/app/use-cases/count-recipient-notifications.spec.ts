import { Content } from '@app/entities/content';
import { CancelNotification } from './cancel-notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { Notification } from '@app/entities/notification';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipient notifications', () => {
    it('should send be able to cancel a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const countRecipientNotifications = new CountRecipientNotifications(
            notificationsRepository,
        );

        const notification = new Notification({
            categories: 'social',
            content: new Content('peniaaaaaas'),
            recipientId: 'penis',
        });

        await notificationsRepository.create(notification);

        await countRecipientNotifications.execute({
            notificationId: notification.id,
        });

        expect(notificationsRepository.notifications[0].canceledAt).toEqual(
            expect.any(Date),
        );
    });
});
