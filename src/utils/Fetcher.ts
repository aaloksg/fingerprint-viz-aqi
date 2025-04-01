type ResponseType<T> = T | undefined;

type FetcherOptions = {
    useCache?: boolean;
};

class Fetcher<T> {
    private url: string;
    private options: FetcherOptions;
    private responseCache: ResponseType<T>;
    public isLoading = false;

    constructor(url: string, options: FetcherOptions = { useCache: false }) {
        this.url = url;
        this.options = options;
    }

    private promiseStack: ((
        value: ResponseType<T> | PromiseLike<ResponseType<T>>
    ) => void)[] = [];

    private resolveAll = () => {
        this.promiseStack.forEach((p) => p(this.responseCache));
        this.promiseStack.splice(0);
    };

    public execute = async (): Promise<ResponseType<T>> => {
        if (this.options.useCache && this.responseCache)
            return this.responseCache;

        if (this.isLoading) {
            const newPromise = new Promise<ResponseType<T>>((resolve) => {
                this.promiseStack.push(resolve);
            });
            return newPromise;
        }
        this.isLoading = true;
        const response = await fetch(this.url).then((res) => res.json());
        this.isLoading = false;
        if (response.status === 'ok') {
            this.responseCache = response.data;
            this.resolveAll();
            return response.data;
        }
        this.resolveAll();
        return undefined;
    };
}

export default Fetcher;
