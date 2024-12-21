import "./Create.css";

export const Create = () => {
  const main = document.querySelector("main");
  main.innerHTML = `
    <section class="create">
      <aside>
        <div class="aside-div">
          <img src="/icons/forward.png" class="aside-btn">
          <img src="/icons/plus.png" class="aside-btn">
        </div>
      </aside>
      <article>
        <h2>Create Pin</h2>
        <form action="#" method="get" id="upload-form">
          <div class="upload-div">
            <input type="file" id="upload" name="file" />
            <label for="upload">
              <img src="/icons/upload.png" alt="upload icon" />
              <span>Upload your picture here</span>
              <span>We recommend using high-quality .jpg files less than 20MB or .mp4 files less than 200MB.</span>
            </label>
          </div>
          <div class="info-div">
            <label for="title">Title</label>
            <input type="text" id="title" name="title" placeholder="Add a title">
            <label for="description">Description</label>
            <textarea id="description" name="description" rows="4" cols="60" placeholder="Add a description"></textarea>
            <label for="link">Link</label>
            <input type="text" id="link" name="link" placeholder="Add a link">
            <label for="board">Board</label>
            <input type="text" id="board" name="board" placeholder="Choose a board">
            <label for="topics">Tagged Topics (0)</label>
            <input type="text" id="topics" name="topics" placeholder="Search for a tag">
            <p>Don't worry, people won't see your tags</p>
            <button type="button" class="btn-more">
              More options ▼
            </button>
            <div class="more-opts">
              <div class="more-options">
                <input type="checkbox" class="checkbox" id="checkbox">
                <label class="switch" for="checkbox">
                  <span class="slider"></span>
                </label>
                <p>Allow people to comment</p>
              </div>
              <div class="more-options">
                <input type="checkbox" class="checkbox" id="checkboxB">
                <label class="switch" for="checkboxB">
                  <span class="slider"></span>
                </label>
                <p>Show similar products</p>
              </div>
             <p class="warning">People can shop for products similar to what's shown in this Pin using visual search
             Shopping recommendations aren't available for Idea ads and Pins with tagged products or paid partnership labels</p>
            </div>
            <input type="submit" id="send" value="Publish!">
        </form>
      </article>
    </section>`;

  const moreOptions = document.querySelector(".btn-more");

  moreOptions.addEventListener("click", () => {
    const moreOptsDiv = document.querySelector(".more-opts");
    moreOptsDiv.classList.toggle("drop-options");
  });
};
