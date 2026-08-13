/**
 * Base API service for making HTTP requests.
 * Replace BASE_URL with your actual API endpoint.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: ApiError;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    hasMore?: boolean;
  };
}

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

class ApiService {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string = BASE_URL) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json'
    };
  }

  /**
   * Set authorization token
   */
  setAuthToken(token: string | null) {
    if (token) {
      this.defaultHeaders['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.defaultHeaders['Authorization'];
    }
  }

  /**
   * Build URL with query parameters
   */
  private buildUrl(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined>
  ): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }

  /**
   * Handle API response
   */
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      const error: ApiError = {
        message: response.statusText || 'Request failed',
        status: response.status
      };

      try {
        const errorBody = await response.json();
        error.message = errorBody.message || error.message;
        error.code = errorBody.code;
      } catch {
        // Response body is not JSON
      }

      throw error;
    }

    try {
      const data = await response.json();
      return { data };
    } catch {
      // Response has no body
      return { data: null as T };
    }
  }

  /**
   * GET request
   */
  async get<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { params, ...fetchOptions } = options;
    const url = this.buildUrl(endpoint, params);

    const response = await fetch(url, {
      method: 'GET',
      headers: { ...this.defaultHeaders, ...fetchOptions.headers },
      ...fetchOptions
    });

    return this.handleResponse<T>(response);
  }

  /**
   * POST request
   */
  async post<T>(
    endpoint: string,
    body?: unknown,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { params, ...fetchOptions } = options;
    const url = this.buildUrl(endpoint, params);

    const response = await fetch(url, {
      method: 'POST',
      headers: { ...this.defaultHeaders, ...fetchOptions.headers },
      body: body ? JSON.stringify(body) : undefined,
      ...fetchOptions
    });

    return this.handleResponse<T>(response);
  }

  /**
   * PUT request
   */
  async put<T>(
    endpoint: string,
    body?: unknown,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { params, ...fetchOptions } = options;
    const url = this.buildUrl(endpoint, params);

    const response = await fetch(url, {
      method: 'PUT',
      headers: { ...this.defaultHeaders, ...fetchOptions.headers },
      body: body ? JSON.stringify(body) : undefined,
      ...fetchOptions
    });

    return this.handleResponse<T>(response);
  }

  /**
   * PATCH request
   */
  async patch<T>(
    endpoint: string,
    body?: unknown,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { params, ...fetchOptions } = options;
    const url = this.buildUrl(endpoint, params);

    const response = await fetch(url, {
      method: 'PATCH',
      headers: { ...this.defaultHeaders, ...fetchOptions.headers },
      body: body ? JSON.stringify(body) : undefined,
      ...fetchOptions
    });

    return this.handleResponse<T>(response);
  }

  /**
   * DELETE request
   */
  async delete<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { params, ...fetchOptions } = options;
    const url = this.buildUrl(endpoint, params);

    const response = await fetch(url, {
      method: 'DELETE',
      headers: { ...this.defaultHeaders, ...fetchOptions.headers },
      ...fetchOptions
    });

    return this.handleResponse<T>(response);
  }

  /**
   * Upload file(s)
   */
  async upload<T>(
    endpoint: string,
    files: File | File[],
    additionalData?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();

    if (Array.isArray(files)) {
      files.forEach((file, index) => {
        formData.append(`file${index}`, file);
      });
    } else {
      formData.append('file', files);
    }

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    const headers = { ...this.defaultHeaders };
    delete headers['Content-Type']; // Let browser set content-type for FormData

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData
    });

    return this.handleResponse<T>(response);
  }
}

// Singleton instance
export const api = new ApiService();

// Export class for custom instances
export { ApiService };
