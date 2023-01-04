import { Content } from './content';

describe('Notification Content', () => {
    it('should be able to create a notification content', () => {
        const content = new Content('voce recebeu uma soclicatao de amizade');

        expect(content).toBeTruthy();
    });

    it('should not be able to create a notification content whith less than 5 characters', () => {
        expect(() => new Content('aaa')).toThrow();
    });

    it('should not be able to create a notification content whith more than 240 characters', () => {
        expect(() => new Content('a'.repeat(241))).toThrow();
    });
});
