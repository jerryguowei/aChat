
export interface PrivateMessage {
    messageId : number,
    type:string,
    message: string
    fromUsername: string,
    toUsername: string
    time: string
    viewed: number
}