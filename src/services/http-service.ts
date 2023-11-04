import apiClient, { CanceledError } from "./api-client";

export { CanceledError };

interface BaseEntity {
    _id: string;
}

class HttpService<T extends BaseEntity> {
    endpoint: string;
    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll() {
        const controller = new AbortController();
        const request = apiClient.get<T[]>(this.endpoint, { signal: controller.signal })
        return { request, cancel: () => controller.abort() };
    }
    add(student: T) {
        const controller = new AbortController();
        const request = apiClient.post(this.endpoint, student, { signal: controller.signal })
        return { request, cancel: () => controller.abort() };
    }
    update(student: T) {
        const controller = new AbortController();
        const request = apiClient.put(this.endpoint + "/" + student._id, student,
            { signal: controller.signal })
        return { request, cancel: () => controller.abort() };
    }
    delete(id: string) {
        const controller = new AbortController();
        const request = apiClient.delete(this.endpoint + "/" + id, { signal: controller.signal })
        return { request, cancel: () => controller.abort() };
    }
}

const createHttpService = <T extends BaseEntity>(endpoint: string) => new HttpService<T>(endpoint);

export default createHttpService


