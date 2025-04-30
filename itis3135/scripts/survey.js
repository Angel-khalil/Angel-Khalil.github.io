function toElement(tag, options = {}) {
    const el = document.createElement(tag);
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'text') el.textContent = value;
      else if (key === 'html') el.innerHTML = value;
      else if (key.startsWith('on')) el.addEventListener(key.substring(2).toLowerCase(), value);
      else el.setAttribute(key, value);
    });
    return el;
  }
  
  
  let courseCounter = 1;
  const coursesContainer = document.getElementById("coursesContainer");
  const addCourseBtn = document.getElementById("addCourse");
  
  addCourseBtn.addEventListener("click", () => {
    const div = toElement('div', { class: 'course-input' });
    const input = toElement('input', {
      type: 'text',
      name: `course${courseCounter}`,
      placeholder: `Course ${courseCounter}`,
      required: true
    });
    const delBtn = toElement('button', {
      text: 'Delete',
      type: 'button',
      onclick: () => div.remove()
    });
    div.append(input, delBtn);
    coursesContainer.appendChild(div);
    courseCounter++;
  });
  
  
  document.getElementById("image").addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const imgPreview = document.getElementById("imagePreview");
      imgPreview.src = URL.createObjectURL(file);
      imgPreview.style.display = "block";
    }
  });
  
  
  const form = document.getElementById("introForm");
  const resultContainer = document.getElementById("resultContainer");
  const resetResultBtn = document.getElementById("resetResultBtn");
  
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(form);
  
    const imageFile = document.getElementById("image").files[0];
    const imageUrl = URL.createObjectURL(imageFile);
  
    const intro = document.createElement("div");
    intro.innerHTML = `
      <h3>Your Custom Intro Page</h3>
      <p><strong>Name:</strong> ${data.get("name")}</p>
      <p><strong>Mascot:</strong> ${data.get("mascot")}</p>
      <figure>
        <img src="${imageUrl}" alt="User Image" width="200">
        <figcaption>${data.get("caption")}</figcaption>
      </figure>
      <ul>
        <li><strong>Personal Background:</strong> ${data.get("personal")}</li>
        <li><strong>Professional Background:</strong> ${data.get("professional")}</li>
        <li><strong>Academic Background:</strong> ${data.get("academic")}</li>
        <li><strong>Web Dev Background:</strong> ${data.get("webdev")}</li>
        <li><strong>Computer Platform:</strong> ${data.get("platform")}</li>
        <li><strong>Courses:</strong> ${[...coursesContainer.querySelectorAll("input")].map(input => input.value).join(", ")}</li>
        <li><strong>Funny Thing:</strong> ${data.get("funnyThing")}</li>
        <li><strong>Anything Else:</strong> ${data.get("anythingElse")}</li>
      </ul>
    `;
  
    form.style.display = "none";
    resultContainer.innerHTML = "";
    resultContainer.appendChild(intro);
    resetResultBtn.style.display = "block";
  });
  
  
  function resetResult() {
    form.reset();
    coursesContainer.innerHTML = "";
    document.getElementById("imagePreview").style.display = "none";
    resultContainer.innerHTML = "";
    form.style.display = "block";
    resetResultBtn.style.display = "none";
  }
  