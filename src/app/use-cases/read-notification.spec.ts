import { ReadNotification } from './read-notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found.error';
import { makeNotification } from '@test/factories/notification-factory';

describe('Read notification', () => {
    it('should send be able to read a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const readNotification = new ReadNotification(notificationsRepository);

        const notification = makeNotification();

        await notificationsRepository.create(notification);

        await readNotification.execute({
            notificationId: notification.id,
        });

        expect(notificationsRepository.notifications[0].readAt).toEqual(
            expect.any(Date),
        );
    });

    it('should not send be able to read a non existing notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const readNotification = new ReadNotification(notificationsRepository);

        await expect(() => {
            return readNotification.execute({
                notificationId: 'bomba!!!',
            });
        }).rejects.toThrow(NotificationNotFound);
    });
});
