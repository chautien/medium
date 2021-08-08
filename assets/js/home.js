(() => {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);
  function App() {
    const url = `https://medium21.herokuapp.com/api/posts/`;

    return {
      async get() {
        const post = axios('https://medium21.herokuapp.com/api/posts/').then(
          (response) => response.data
        );
        return post;
      },
      render(posts) {
        const contentPostEle = $('#contentPost');
        const content = posts.map((post, index) => {
          const {
            post_title,
            post_id,
            post_introduce,
            author_id,
            post_content,
            post_date,
          } = post;
          return `<article class="content__post-item">
          <section class="post__item-box">
            <div class="post__item-about">
              <div class="post__item-info">
                <a href="#" class="post__item-media">
                  <img
                    src="https://miro.medium.com/fit/c/40/40/0*1Fhb2XEawFhFVFK9"
                    alt="author image"
                    class="post__item-avatar"
                  />
                </a>
                <a href="#" class="post__item-author">Chau Tien</a>
              </div>
              <span class="post__item-dot">
                <i class="fas fa-circle"></i>
              </span>
              <time class="post__item-time"> ${post_date} </time>
            </div>
            <div class="post__item-content">
              <h2 class="post__item-title">
                <a href="./detail.html?id=${post_id}" class="post__item-text">
                  ${post_title}
                </a>
              </h2>
              <p class="post__item-desc">
                ${post_introduce}
              </p>
            </div>
            <div class="post__item-footer">
              <div class="post__item-useful">
                <small class="post__item-readtime">10 min read</small>
                <span class="post__item-dot">
                  <i class="fas fa-circle"></i>
                </span>
                <a
                  href="#"
                  class="btn-flex btn-rounded-5 post__item-category"
                  >Productivity</a
                >
                <span class="post__item-dot">
                  <i class="fas fa-circle"></i>
                </span>
                <span class="post__item-popular">
                  Popular on medium <i class="fas fa-star"></i>
                </span>
              </div>
              <div class="post__item-access">
                <a class="post__item-bookmark">
                  <i class="fal fa-bookmark"></i>
                </a>
                <a class="post__item-action">
                  <i class="far fa-ellipsis-h post__item-action-icon"></i>
                </a>
              </div>
            </div>
          </section>
          <a href="./detail.html?id=${post_id}" class="post__item-thumbnail">
            <img
              src="https://www.coe.int/documents/10463064/14588328/COVID-19_870-489.jpg/d09442d8-686a-b7e7-8583-251118360308"
              alt="post thumbnail image"
              class="post__item-thumbnail-image"
            />
          </a>
        </article>`;
        });
        const loadingEle = $('#loading');
        setTimeout(() => {
          contentPostEle.insertAdjacentHTML('beforebegin', content);
          loadingEle.style.display = 'none';
        }, 0);
        console.log(contentPostEle, content);
      },
      async init() {
        this.get();
        const posts = await this.get();
        this.render(posts);
      },
    };
  }

  const app = App();
  app.init();
})();
