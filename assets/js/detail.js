(() => {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);
  function App() {
    const url = `https://medium21.herokuapp.com/api/posts/`;

    return {
      async get(id) {
        const post = axios(url + id).then((response) => response.data);
        return post;
      },
      render(post) {
        const {
          post_title,
          post_id,
          post_introduce,
          author_id,
          post_content,
          post_date,
        } = post;
        const postEle = $('#post');
        const content = `<div class="post__heading">
        <h1 class="post__heading-title">
          ${post_title}
        </h1>
        <div class="post__heading-about">
          <div class="post__heading-author">
            <a href="#" class="post__heading-author-link">
              <img
                src="https://images.unsplash.com/photo-1628038131286-2fe20fc523a4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                alt="author"
                class="post__heading-author-img"
              />
            </a>
            <a href="#" class="post__heading-author-link">
            Châu Tiến
            </a>
          </div>
          <time class="post__heading-time"
            >${post_date}
            <span class="post__heading-dot"
              ><i class="fas fa-circle"></i
            ></span>
            5 min read</time
          >
          <div class="post__heading-action">
            <a href="#" class="post__heading-action-link">
              <i class="fal fa-share-alt-square"></i>
            </a>
            <a href="#" class="post__heading-action-link">
              <i class="fal fa-bookmark"></i>
            </a>
            <a href="#" class="post__heading-action-link">
              <i class="fal fa-ellipsis-h"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="post__content">
        <p>
          ${post_introduce}
        </p>
        ${post_content}
      </div>
      <div class="post__footer">
        <div class="post__footer-box">
          <div class="post__footer-interactive">
            <span class="post__footer-like">
              <i class="fal fa-thumbs-up"></i>
              <span class="post__footer-like-count">20</span>
            </span>
            <span class="post__footer-comment">
              <i class="fal fa-comment-alt-dots"></i>
              <span class="post__footer-comment-count">30</span>
            </span>
          </div>
          <div class="post__footer-action">
            <a href="#" class="post__footer-action-link">
              <i class="fal fa-share-alt-square"></i>
            </a>
            <a href="#" class="post__footer-action-link">
              <i class="fal fa-bookmark"></i>
            </a>
            <a href="#" class="post__footer-action-link">
              <i class="fal fa-ellipsis-h"></i
            ></a>
          </div>
        </div>
        <ul class="post__footer-tags">
          <li class="post__footer-tags-item">
            <a href="#" class="post__footer-tags-link">React</a>
          </li>
          <li class="post__footer-tags-item">
            <a href="#" class="post__footer-tags-link">Angular</a>
          </li>
          <li class="post__footer-tags-item">
            <a href="#" class="post__footer-tags-link">VueJs</a>
          </li>
        </ul>
      </div>`;
        postEle.innerHTML = content;
        // console.log(contentPostEle, content);
        console.log(post);
      },
      async init() {
        const url_string = window.location.href;
        const url = new URL(url_string);
        const postId = url.searchParams.get('id');
        // this.get(postId);
        const posts = await this.get(postId);
        this.render(posts[0]);
      },
    };
  }

  const app = App();
  app.init();
})();
