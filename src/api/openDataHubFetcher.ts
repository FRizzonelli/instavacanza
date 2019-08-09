import { to } from 'await-to-js';
// import { ApiError } from 'redux-api-middleware';

export async function fetchODHApi<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
    const [error, httpResponse] = await to(fetch(input, init));

    if (!httpResponse) {
        throw error;
    }

    const [parseError, parsedResponse] = await to(httpResponse.json());

    // if (httpResponse.status >= 400 && httpResponse.status < 600) {
    //     throw parsedResponse.error.message;
    // }

    if (!httpResponse) {
        throw parseError;
    }

    return parsedResponse;
}
