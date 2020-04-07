// Lib.
import { ERequestMethod } from "@Lib/api/types";

// Api.
import { coreApiConfig } from "@Api/destination/core/coreApiConfig";

/**
 * Generic request method with project scoped transformations.
 */
const doRequest = async (method: ERequestMethod, mapping: string, request?: object | URLSearchParams, headers?: Headers): Promise<object> => {

  const requestBody: string | undefined | URLSearchParams = request instanceof URLSearchParams ? request : request && JSON.stringify(request);

  const rawRequest: RequestInit = {
    body: requestBody,
    headers: headers || coreApiConfig.DEFAULT_HEADERS,
    method
  };

  let rawResponse: Response | null = null;

  try {
    rawResponse = await fetch(mapping, rawRequest);

    if (rawResponse.status >= 500) {
      throw new Error("Could not reach server.");
    }

    return await rawResponse.json();
  } catch (error) {
    return {
      error: error.message,
      status: (!!rawResponse && (rawResponse as Response).status) || 400,
      success: false
    };
  }
};

export const getRequest = async (mapping: string, urlParams?: {}, headers?: Headers): Promise<object> => await doRequest(ERequestMethod.GET, mapping, urlParams, headers);

export const postRequest = async (mapping: string, request: object | URLSearchParams, headers?: Headers): Promise<object> => await doRequest(ERequestMethod.POST, mapping, request, headers);

export const deleteRequest = async (mapping: string, request: object | URLSearchParams, headers?: Headers): Promise<object> => await doRequest(ERequestMethod.DELETE, mapping, request, headers);

export const putRequest = async (mapping: string, request: object | URLSearchParams, headers?: Headers): Promise<object> => await doRequest(ERequestMethod.PUT, mapping, request, headers);
