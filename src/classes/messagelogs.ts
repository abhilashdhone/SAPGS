export class MessageLogs {
    $key?: string;
    action: string;
    fk_lotKey: string;
    fk_lotName: string;
    timeStamp: string;
    info : {
        subject: string;
        message: string;
    };
}