import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { TransformService } from "../services/transform.service";
import { renderPosts } from "../template/post.template";

export class PostsComponent extends Component {
    constructor(id, {loader}) {
        super(id);
        this.loader = loader;
    }

    init() {
        this.$el.addEventListener('click', buttonHandler.bind(this));
    }

    async onShow() {
        this.loader.show();
        const fbData = await apiService.fetchPosts();
        if (fbData) {
            const posts = TransformService.fbObjectToArray(fbData);
            const html = posts.map(post => renderPosts(post, {withButton: true}));
            this.loader.hide();
            this.$el.insertAdjacentHTML('afterbegin', html.join(' '));
        } else {
            this.$el.innerHTML = '<p class="center">Nothing found</p>';
            this.loader.hide();
        }
    }

    onHide() {
        this.$el.innerHTML = '';
    }
}

function buttonHandler(event) {
    const $el = event.target;
    const id = event.target.dataset.id;
    const title = event.target.dataset.title;

    if (id) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const candidate = favorites.find(f => f.id === id);

        if (candidate) {
            // удалить элемент
            favorites = favorites.filter(f => f.id !== id);
            $el.textContent = 'Save';
            $el.classList.remove('button-danger');
            $el.classList.add('button-primary');
        } else {
            // добавить элемент
            favorites.push({id, title});
            $el.textContent = 'Delete';
            $el.classList.add('button-danger');
            $el.classList.remove('button-primary');
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}