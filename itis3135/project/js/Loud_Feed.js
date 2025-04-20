document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".post-btn").addEventListener("click", createPost);
  
    document.querySelectorAll(".signin, .login, .popup-btn.secondary").forEach(button => {
      button.addEventListener("click", (e) => {
        const target = e.target.getAttribute("onclick");
        if (target) togglePopup(target.replace(/togglePopup\\('|'\\)/g, ''));
      });
    });
  });
  
  function createPost() {
    const feed = document.getElementById('feed');
    const text = document.getElementById('postText').value;
    const imageInput = document.getElementById('postImage');
  
    const postBox = document.createElement('div');
    postBox.className = 'post';
  
    const caption = document.createElement('p');
    caption.className = 'caption';
    caption.textContent = text;
    postBox.appendChild(caption);
  
    if (imageInput.files.length > 0) {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(imageInput.files[0]);
      img.alt = 'User post image';
      postBox.appendChild(img);
    }
  
    const actions = document.createElement('div');
    actions.className = 'post-actions';
    actions.innerHTML = `
      <button>Like</button>
      <button>Dislike</button>
      <button>Comment</button>
    `;
    postBox.appendChild(actions);
  
    feed.prepend(postBox);
  
    document.getElementById('postText').value = '';
    document.getElementById('postImage').value = '';
  }
  
  function togglePopup(id) {
    const popup = document.getElementById(id);
    popup.classList.toggle('active');
  }
  