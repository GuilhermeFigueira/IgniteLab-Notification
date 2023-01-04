import { Replace } from 'src/helpers/Replace';
import { Content } from './content';
import { randomUUID } from 'crypto';

export interface NotificationProps {
    recipientId: string;
    content: Content;
    categories: string;
    readAt?: Date | null;
    createdAt: Date;
}

export class Notification {
    private _id: string;
    private props: NotificationProps;

    constructor(props: Replace<NotificationProps, { createdAt?: Date }>) {
        this._id = randomUUID();
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date(),
        };
    }

    public get id(): string {
        return this._id;
    }

    public set recipientId(recipientId: string) {
        this.props.recipientId = recipientId;
    }
    public get recipientId(): string {
        return this.props.recipientId;
    }

    public set content(content: Content) {
        this.props.content = content;
    }
    public get content(): Content {
        return this.props.content;
    }

    public set categories(categories: string) {
        this.props.categories = categories;
    }
    public get categories(): string {
        return this.props.categories;
    }

    public set readAt(readAt: Date | null | undefined) {
        this.props.readAt = readAt;
    }
    public get readAt(): Date | null | undefined {
        return this.props.readAt;
    }

    public get createdAt(): Date {
        return this.props.createdAt;
    }
}