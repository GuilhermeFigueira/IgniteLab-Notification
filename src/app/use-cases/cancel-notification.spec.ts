import { Content } from '@app/entities/content';
import { CancelNotification } from './cancel-notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { Notification } from '@app/entities/notification';
import { NotificationNotFound } from './errors/notification-not-found.error';

describe('Cancel notification', () => {
    it('should send be able to cancel a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const cancelNotification = new CancelNotification(
            notificationsRepository,
        );

        const notification = new Notification({
            categories: 'social',
            content: new Content('peniaaaaaas'),
            recipientId: 'penis',
        });

        await notificationsRepository.create(notification);

        await cancelNotification.execute({
            notificationId: notification.id,
        });

        expect(notificationsRepository.notifications[0].canceledAt).toEqual(
            expect.any(Date),
        );
    });

    it('should not send be able to cancel a non existing notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const cancelNotification = new CancelNotification(
            notificationsRepository,
        );

        await expect(() => {
            return cancelNotification.execute({
                notificationId: 'bomba!!!',
            });
        }).rejects.toThrow(NotificationNotFound);
    });
});
