document.addEventListener("DOMContentLoaded", () => {
  const postBtn = document.querySelector(".post-btn");
  if (postBtn) {
    postBtn.addEventListener("click", createPost);
  }
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

  const commentInput = document.createElement('input');
  commentInput.type = 'text';
  commentInput.className = 'comment-input';
  commentInput.placeholder = 'Write a comment...';
  actions.appendChild(commentInput);

  const buttonWrapper = document.createElement('div');
  buttonWrapper.className = 'action-buttons';

  // Like button
  const likeBtn = document.createElement('button');
  let liked = false;
  const likeCount = document.createElement('span');
  likeBtn.innerHTML = '👍 ';
  likeBtn.appendChild(likeCount);
  likeBtn.addEventListener('click', () => {
    liked = !liked;
    likeCount.textContent = liked ? '1' : '';
  });

  // Dislike button
  const dislikeBtn = document.createElement('button');
  let disliked = false;
  const dislikeCount = document.createElement('span');
  dislikeBtn.innerHTML = '👎 ';
  dislikeBtn.appendChild(dislikeCount);
  dislikeBtn.addEventListener('click', () => {
    disliked = !disliked;
    dislikeCount.textContent = disliked ? '1' : '';
  });

  // Comment button
  const commentBtn = document.createElement('button');
  commentBtn.textContent = 'Comment';
  commentBtn.style.backgroundColor = "white";
  commentBtn.style.color = "black";
  commentBtn.style.border = "1px solid #ccc";

  commentBtn.addEventListener('click', () => {
    const commentText = commentInput.value.trim();
    if (commentText !== '') {
      postCommentToSidebar(commentText);
      commentInput.value = '';
    }
  });

  buttonWrapper.appendChild(likeBtn);
  buttonWrapper.appendChild(dislikeBtn);
  buttonWrapper.appendChild(commentBtn);

  actions.appendChild(buttonWrapper);
  postBox.appendChild(actions);
  feed.prepend(postBox);

  document.getElementById('postText').value = '';
  document.getElementById('postImage').value = '';
}

function postCommentToSidebar(commentText) {
  const sidebar = document.querySelector('.sidebar');

  const commentContainer = document.createElement('div');
  commentContainer.className = 'comment-container';
  commentContainer.style.marginTop = '1rem';
  commentContainer.style.background = '#121d2a';
  commentContainer.style.padding = '1rem';
  commentContainer.style.borderRadius = '8px';

  const commentParagraph = document.createElement('p');
  commentParagraph.textContent = commentText;

  const actions = document.createElement('div');
  actions.className = 'comment-actions'; // New: apply styling via class

  // Like button
  const likeBtn = document.createElement('button');
  let liked = false;
  const likeCount = document.createElement('span');
  likeBtn.innerHTML = '👍 ';
  likeBtn.appendChild(likeCount);
  likeBtn.addEventListener('click', () => {
    liked = !liked;
    likeCount.textContent = liked ? '1' : '';
  });

  // Dislike button
  const dislikeBtn = document.createElement('button');
  let disliked = false;
  const dislikeCount = document.createElement('span');
  dislikeBtn.innerHTML = '👎 ';
  dislikeBtn.appendChild(dislikeCount);
  dislikeBtn.addEventListener('click', () => {
    disliked = !disliked;
    dislikeCount.textContent = disliked ? '1' : '';
  });

  const replyBtn = document.createElement('button');
  replyBtn.textContent = 'Reply';
  replyBtn.style.marginLeft = '0.5rem';
  replyBtn.addEventListener('click', () => showReplyBox(commentContainer));

  actions.appendChild(likeBtn);
  actions.appendChild(dislikeBtn);
  actions.appendChild(replyBtn);

  commentContainer.appendChild(commentParagraph);
  commentContainer.appendChild(actions);

  sidebar.appendChild(commentContainer);
}

function showReplyBox(commentContainer) {
  if (commentContainer.querySelector('.reply-box')) return;

  const replyBox = document.createElement('div');
  replyBox.className = 'reply-box';

  const textarea = document.createElement('textarea');
  textarea.placeholder = 'Write a reply...';

  const sendBtn = document.createElement('button');
  sendBtn.textContent = 'Send';
  sendBtn.addEventListener('click', () => {
    if (textarea.value.trim() !== "") {
      const replyText = document.createElement('p');
      replyText.textContent = textarea.value;
      replyText.style.marginLeft = '1rem';
      replyText.style.marginTop = '0.5rem';
      commentContainer.appendChild(replyText);
      replyBox.remove();
    }
  });

  replyBox.appendChild(textarea);
  replyBox.appendChild(sendBtn);
  commentContainer.appendChild(replyBox);
}
