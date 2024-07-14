export function convertDataResponse(status: number, success: boolean, message: string, data: any) {
    return new Response(JSON.stringify({
        success,
        message,
        data
    }), { status })
}