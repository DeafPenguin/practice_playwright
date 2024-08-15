import { request, APIResponse } from 'playwright'

export async function getRequest(endpoint: string, payload: any): Promise<APIResponse> {
    const response = await request.newContext().then(async context => {
        return context.get(endpoint, payload)
    });
    return response;
}