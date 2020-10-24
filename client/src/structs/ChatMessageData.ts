export interface ChatMessageData {
    senderID: string
    senderName: string
    nameNum: string
    lines: ChatMessageLine[]
}

export interface ChatMessageLine {
    line: string
    time: number
}