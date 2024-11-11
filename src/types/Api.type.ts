export type CreateAccountResponse = {
    token: string
}
export type LoginResponse = {
    token: string
}
export type ApiResponse = {
    status: number,
    message?: string,
    data: string
}