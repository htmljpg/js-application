class ApiService {
    constructor(baseUrl) {
        this.url = baseUrl;
    }

    async createPosts(post) {
        try {
            const request = new Request(this.url + '/posts.json', {
                method: 'post',
                body: JSON.stringify(post),
            });
            return useRequest(request);
        } catch(error) {
            console.log(error);
        }
    }

    async fetchPosts() {
        try {
            const request = new Request(this.url + '/posts.json', {
                method: 'get',
            });
            return useRequest(request);
        } catch(error) {
            console.log(error);
        }
    }

    async fetchPostById(id) {
        try {
            const request = new Request(this.url + `/posts/${id}.json`);
            return useRequest(request);
        } catch(error) {
            console.error(error);
        }
    }
}

async function useRequest(request) {
    const response = await fetch(request);
    return response.json();
}

export const apiService = new ApiService('https://wfmjs-5b2af-default-rtdb.firebaseio.com');