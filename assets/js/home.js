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
        console.log(posts);
        const contentPostEle = $('#contentPost');
        const content = posts
          .map((post, index) => {
            const {
              post_title,
              post_id,
              post_introduce,
              author_id,
              post_content,
              post_date,
              thumbnail,
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
                <a href="#" class="post__item-author">${post.author.name}</a>
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
                  >${post.topic.topic_name}</a
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
              src="${thumbnail}"
              alt="post thumbnail image"
              class="post__item-thumbnail-image"
            />
          </a>
        </article>`;
          })
          .join('');
        const loadingEle = $('#loading');
        setTimeout(() => {
          contentPostEle.insertAdjacentHTML('beforebegin', content);
          loadingEle.style.display = 'none';
        }, 0);
      },
      slider(posts) {
        const postList = posts.slice(0, 5);
        const sliderEle = document.querySelector('#slider');
        const content = postList.map((item) => {
          return `<div class="slider-item">
          <div class="slider-item__content">
            <h6 class="slider-item__title">${item.post_title}</h6>
            <p class="slider-item__description">
            ${item.post_introduce}
            </p>
          </div>
          <img
            class="slider-item__image"
            src="${item.thumbnail}"
            alt=""
          />
        </div>`;
        });

        sliderEle.innerHTML = content.join('');
        this.slide();
      },
      slide() {
        const slider = document.querySelector('.slider');
        const sliderItem = document.querySelectorAll('.slider-item');
        const sliderControl = document.querySelector('.slider-control');
        const sliderControlNext = document.querySelector(
          '.slider-control-next'
        );
        const sliderControlPrev = document.querySelector(
          '.slider-control-prev'
        );
        const pagination = document.querySelector('.pagination');

        const sliderWidth = slider.clientWidth;
        sliderControl.style.width = `${sliderWidth - 50}px`;

        let sliderActiveItem = 0;

        const deleteActivationOfSlider = () => {
          const itemArray = Array.from(slider.children);
          itemArray.forEach((element) => {
            element.classList.remove('slider-item-active');
          });
        };

        const setActivationOfSlider = () => {
          sliderItem[sliderActiveItem].classList.add('slider-item-active');
        };

        sliderControlPrev.addEventListener('click', () => {
          deleteActivationOfSlider();
          if (sliderActiveItem > 0) {
            sliderActiveItem--;
          } else {
            sliderActiveItem = sliderItem.length - 1;
          }
          setActivationOfSlider();
          paginationProgress();
        });

        sliderControlNext.addEventListener('click', () => {
          deleteActivationOfSlider();
          if (sliderActiveItem < sliderItem.length - 1) {
            sliderActiveItem++;
          } else {
            sliderActiveItem = 0;
          }
          setActivationOfSlider();
          paginationProgress();
        });
        setInterval(() => {
          deleteActivationOfSlider();
          if (sliderActiveItem < sliderItem.length - 1) {
            sliderActiveItem++;
          } else {
            sliderActiveItem = 0;
          }
          setActivationOfSlider();
          paginationProgress();
        }, 4000);

        const setSliderControlItem = () => {
          const sliderItems = Array.from(sliderControl.children);
          sliderItems.forEach((element) => {
            element.classList.add('slider-control__arrow');
          });
        };

        const progressBar = `<div class="pagination-bar" background="" width=""></div>`;
        pagination.insertAdjacentHTML('beforeend', progressBar);

        const paginationProgress = () => {
          let progressItemPercent = 100 / sliderItem.length;
          const totalProgressPercent =
            progressItemPercent * (sliderActiveItem + 1);

          const getProgressBar = document.querySelector('.pagination-bar');
          getProgressBar.style.width = `${totalProgressPercent}%`;
        };

        setSliderControlItem();
        paginationProgress();
        setActivationOfSlider();
      },
      async init() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('id')) {
          const _id = urlParams.get('id');
          const response = axios(
            'https://medium21.herokuapp.com/api/posts/topic?id=' + _id
          ).then((response) => response.data);
          const post = await response;
          this.render(post);
          const posts = await this.get();
          this.slider(posts);

          return;
        }
        this.get();
        const posts = await this.get();
        this.render(posts);
        this.slider(posts);
      },
    };
  }

  const app = App();
  app.init();
})();
