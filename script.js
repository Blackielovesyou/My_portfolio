/* SCROLL & CARD ANIMATION    */
const links = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((sec) => {
    if (scrollY >= sec.offsetTop - 150) current = sec.id;
  });
  links.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href") === "#" + current) a.classList.add("active");
  });
  document.querySelectorAll(".card").forEach((card) => {
    const cardTop = card.getBoundingClientRect().top;
    const trigger = window.innerHeight * 0.85;
    if (cardTop < trigger) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
  const hero = document.querySelector(".hero-wrapper");
  if (hero.getBoundingClientRect().top < window.innerHeight * 0.85) {
    hero.style.opacity = "1";
    hero.style.transform = "translateY(0)";
  }
});

/* DARK MODE TOGGLE           */
const toggle = document.getElementById("toggleDark");
const body = document.body;
if (localStorage.getItem("dark") === "true") {
  body.classList.add("dark");
  toggle.textContent = "Light";
}
toggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  localStorage.setItem("dark", isDark);
  toggle.textContent = isDark ? "Light" : "Dark";
});

/* PROJECT MODAL MULTI-PAGE  */
const projects = {
  "Car Game": {
    video: "video/car.mp4",
    desc: "A fun car racing game built in Python using Pygame, developed in PyCharm.",
  },
  "Calebs Project": {
    images: [
      "images/calebs_main.png",
      "images/calebs_menu.png",
      "images/calebs_cart.png",
    ],
    desc: "Calebs is a mobile application built in Android Studio using Java. It allows users to browse and order food efficiently, providing a seamless and user-friendly experience. This was my final project in third year.",
  },

  Sprinkl: {
    images: ["images/sprinkl_chat1.png", "images/sprinkl_chat2.png"],
    desc: "Sprinkl is a web application built in HTML, CSS, JavaScript, and Flask using VSCode. It features real-time chat functionality similar to Facebook Messenger, allowing users to send and receive messages seamlessly while exploring interactive UI components.",
  },

  "IPAMS System": {
    images: ["images/ipams.png"],
    desc: "A digital platform to manage permit requests and approvals.",
  },

  "My Buddy Assistant": {
    images: [
      "images/assistantQA.png",
      "images/assistantPts.png",
      "images/assistantTips.png",
    ], // replace with your actual image paths
    desc: "It is a mobile app chatbot that lets the bot ask you about your emotions. After answering all the questions, it calculates a score based on your responses and, based on your score, provides personalized tips about your mental health condition and guidance on what you can do to improve your mental well-being.",
  },

  "LSPU-EVENTSYNC": {
    images: ["images/eventsync_admin.png", "images/eventsync_dean.png"],
    desc: "A collaborative project created for LSPU Laguna–Siniloan Campus. It is a multi-account event management system built using HTML, CSS, JavaScript, AJAX, and Laravel. The platform supports multiple user roles including dean, faculty adviser, and SBO members. It allows scheduling of events, finding available venues, managing the expenses of each event, and handling multiple layers of approval across different accounts.",
  },
};

const certificates = {
  "Android Study Jam": {
    image: "images/android.jpg",
    desc: `Awarded to Me for participating in the sixteen (16) hours training sessions entitled "Android Study Jam – Android Programming using Android Studio" conducted by the Department of Information and Communications Technology Region IV-A Laguna on March 17–18, 2023 at Laguna State Polytechnic University, Siniloan Campus.`,
  },

  "Fundamentals of Pitching and Startup Projects": {
    image: "images/pitching.png",
    desc: `Attended the “Fundamentals of Pitching and Startup Projects” organized by the Department of Information and Communications Technology (DICT) through the ICT Industry Development Bureau (IIDB), held on March 3–4, 2025 at Laguna State Polytechnic University – Siniloan Campus Function Hall.`,
  },

  "TVET Competency Certification": {
    image: "images/g12.jpg", // replace with actual image file
    desc: `
<p>Awarded to <strong>Me</strong> for completing the competency requirements under the Philippine TVET Competency Assessment and Certification System.</p>

<h4>Units of Competency Completed:</h4>

<div class="competency-columns">
  <div class="left-col">
    <h5>Basic Competencies</h5>
    <ul>
      <li>500311105: Participate in workplace communication</li>
      <li>500311106: Work in a team environment</li>
      <li>500311107: Practice career professionalism</li>
      <li>500311108: Practice occupational health and safety procedures</li>
    </ul>
  </div>

  <div class="right-col">
    <h5>Core Competencies</h5>
    <ul>
      <li>ELC/14331: Install and Configure Computer Systems</li>
      <li>ELC724132: Set up Computer Networks</li>
      <li>ELC724333: Set up Computer Servers</li>
      <li>ELC724334: Maintain and Repair Computer Systems</li>
    </ul>

    <h5>Common Competencies</h5>
    <ul>
      <li>ELC315202: Apply Quality Standards</li>
      <li>ELC311203: Perform Computer Operations</li>
      <li>ELC311201: Perform Mensuration and Calculation</li>
      <li>ELC311202: Prepare and interpret Technical Drawing</li>
      <li>ELC724201: Use Hand Tools</li>
      <li>ELC724202: Terminate and connect Electrical Wiring and Electronic Circuits</li>
      <li>ELC724205: Test Electronic Components</li>
    </ul>
  </div>
</div>
  `,
  },

  "Digital Safety and Security Awareness": {
    image: "images/cisco.png", // replace with your actual image
    desc: `
    <p>This certificate is awarded to <strong>Me</strong> for successfully completing the <strong>Digital Safety and Security Awareness</strong> course offered by Networking Academy through the Cisco Networking Academy program.</p>
    <ul>
      <li>Learned core principles of online safety</li>
      <li>Gained knowledge on protecting personal data</li>
      <li>Understood cybersecurity best practices</li>
      <li>Developed awareness of digital threats and prevention</li>
    </ul>
  `,
  },
};

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalMedia = document.getElementById("modalMedia");
const closeBtn = document.querySelector(".modal .close");

document.querySelectorAll("#projects .card").forEach((card) => {
  card.addEventListener("click", () => {
    const projectName = card.dataset.project;
    const data = projects[projectName];
    if (!data) return;

    modalTitle.textContent = projectName;
    modalDesc.textContent = data.desc;

    // Remove old media
    modalMedia.querySelectorAll("video, img").forEach((el) => el.remove());

    if (data.video) {
      const videoEl = document.createElement("video");
      videoEl.src = data.video;
      videoEl.controls = true;
      videoEl.autoplay = true;
      videoEl.style.width = "100%";
      videoEl.style.marginBottom = "12px";
      modalMedia.appendChild(videoEl);
    }

    if (data.images) {
      if (projectName.toLowerCase().includes("caleb")) {
        // Calebs images remain small
        const flexDiv = document.createElement("div");
        flexDiv.style.display = "flex";
        flexDiv.style.gap = "12px";
        flexDiv.style.justifyContent = "center";
        flexDiv.style.flexWrap = "wrap";

        data.images.forEach((src) => {
          const imgEl = document.createElement("img");
          imgEl.src = src;
          imgEl.style.width = "30%"; // keep Calebs small
          imgEl.style.maxWidth = "250px";
          imgEl.style.marginBottom = "0";
          flexDiv.appendChild(imgEl);
        });

        modalMedia.appendChild(flexDiv);
      } else if (projectName.toLowerCase().includes("sprinkl")) {
        // Sprinkl images much bigger, side by side
        const flexDiv = document.createElement("div");
        flexDiv.style.display = "flex";
        flexDiv.style.gap = "12px";
        flexDiv.style.justifyContent = "center";
        flexDiv.style.flexWrap = "wrap"; // allow wrap on smaller screens

        data.images.forEach((src) => {
          const imgEl = document.createElement("img");
          imgEl.src = src;
          imgEl.style.width = "calc(50% - 6px)"; // two images side by side
          imgEl.style.maxWidth = "900px"; // bigger images
          imgEl.style.height = "auto";
          imgEl.style.marginBottom = "12px";
          imgEl.style.borderRadius = "12px";
          flexDiv.appendChild(imgEl);
        });

        modalMedia.appendChild(flexDiv);

        // Adjust only Sprinkl modal size
        const modalContent = modal.querySelector(".modal-content");
        modalContent.style.maxWidth = "95%"; // expand for Sprinkl
        modalContent.style.width = "95%";
      } else if (projectName.toLowerCase().includes("buddy")) {
        const flexDiv = document.createElement("div");
        flexDiv.style.display = "flex";
        flexDiv.style.justifyContent = "center"; // center the row
        flexDiv.style.flexWrap = "nowrap"; // prevent wrapping
        flexDiv.style.gap = "15px"; // spacing between images
        flexDiv.style.marginBottom = "12px";

        data.images.forEach((src) => {
          const imgEl = document.createElement("img");
          imgEl.src = src;
          imgEl.style.width = "30%"; // three images in a row
          imgEl.style.maxWidth = "300px"; // cap the size
          imgEl.style.height = "auto";
          imgEl.style.borderRadius = "12px";
          flexDiv.appendChild(imgEl);
        });

        modalMedia.appendChild(flexDiv);
      } else if (projectName.toLowerCase().includes("eventsync")) {
        const modalContent = modal.querySelector(".modal-content");

        // Expand modal size ONLY for EventSync
        modalContent.style.maxWidth = "1200px";
        modalContent.style.width = "95%";

        const flexDiv = document.createElement("div");
        flexDiv.style.display = "flex";
        flexDiv.style.justifyContent = "center";
        flexDiv.style.alignItems = "center";
        flexDiv.style.flexWrap = "nowrap";
        flexDiv.style.gap = "20px";
        flexDiv.style.marginBottom = "12px";

        data.images.forEach((src) => {
          const imgEl = document.createElement("img");
          imgEl.src = src;

          imgEl.style.width = "50%"; // big but stays inside modal
          imgEl.style.maxWidth = "600px"; // prevents overflowing
          imgEl.style.height = "auto"; // keeps full image visible
          imgEl.style.objectFit = "contain"; // SHOW FULL IMAGE (fixes cutting)
          imgEl.style.borderRadius = "12px";

          flexDiv.appendChild(imgEl);
        });

        modalMedia.appendChild(flexDiv);
      } else if (projectName.toLowerCase().includes("ipams")) {
        const modalContent = modal.querySelector(".modal-content");

        // Use normal modal size (same as Car Game)
        modalContent.style.maxWidth = "800px";
        modalContent.style.width = "90%";

        const flexDiv = document.createElement("div");
        flexDiv.style.display = "flex";
        flexDiv.style.flexDirection = "column";
        flexDiv.style.justifyContent = "center";
        flexDiv.style.alignItems = "center";
        flexDiv.style.gap = "12px";

        data.images.forEach((src) => {
          const imgEl = document.createElement("img");
          imgEl.src = src;

          imgEl.style.width = "100%"; // same behavior as Car Game video
          imgEl.style.maxWidth = "700px"; // perfect size (same as Car Game)
          imgEl.style.height = "auto";
          imgEl.style.borderRadius = "12px";
          imgEl.style.objectFit = "contain";

          flexDiv.appendChild(imgEl);
        });

        modalMedia.appendChild(flexDiv);
      }
    }

    modal.style.display = "flex";
  });
});

/* CERTIFICATE MODAL */
document.querySelectorAll("#certificates .card").forEach((card) => {
  card.addEventListener("click", () => {
    const certName = card.dataset.cert;
    const data = certificates[certName];
    if (!data) return;

    modalTitle.textContent = certName;

    modalMedia.innerHTML = ""; // clear previous media
    modalDesc.innerHTML = ""; // we will insert new layout

    /* ⭐ SPECIAL TVET LAYOUT ⭐ */
    if (certName === "TVET Competency Certification") {
      // Wrapper = flex (image left + description right)
      const wrapper = document.createElement("div");
      wrapper.style.display = "flex";
      wrapper.style.gap = "20px";
      wrapper.style.alignItems = "flex-start";
      wrapper.style.flexWrap = "wrap";

      // LEFT SIDE IMAGE
      const img = document.createElement("img");
      img.src = data.image;
      img.style.width = "280px";
      img.style.borderRadius = "12px";
      img.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
      img.style.flexShrink = "0";

      // RIGHT SIDE DESCRIPTION
      const textBox = document.createElement("div");
      textBox.style.flex = "1";
      textBox.style.minWidth = "260px";
      textBox.innerHTML = data.desc;

      wrapper.appendChild(img);
      wrapper.appendChild(textBox);

      modalDesc.appendChild(wrapper);
      modal.style.display = "flex";
      return; // stop here so the normal behavior does not run
    }

    /* ⭐ NORMAL LAYOUT FOR ALL OTHER CERTIFICATES ⭐ */

    // Render HTML formatting in desc
    modalDesc.innerHTML = data.desc;

    const img = document.createElement("img");
    img.src = data.image;

    // Size adjustments for non-TVET
    if (certName === "Web Development Bootcamp") {
      img.style.width = "85%";
      img.style.maxWidth = "420px";
    } else {
      img.style.width = "100%";
      img.style.maxWidth = "650px";
    }

    img.style.borderRadius = "12px";
    img.style.margin = "0 auto";
    img.style.display = "block";

    modalMedia.appendChild(img);

    modal.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";

  // Reset modal size to default for other projects
  const modalContent = modal.querySelector(".modal-content");
  modalContent.style.width = "90%";
  modalContent.style.maxWidth = "800px";
});

// Close modal if user clicks outside content
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

$(document).ready(function () {
  /* CONTACT FORM SUBMISSION WITH LOADING AND CONFIRM */
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();

    var $form = $(this);
    var $submitBtn = $form.find("button[type='submit']");

    // Disable button & show loading
    $submitBtn.prop("disabled", true).text("Sending...");

    $.ajax({
      url: $form.attr("action"), // send_email.php
      type: "POST",
      data: $form.serialize(),
      success: function (response) {
        // Re-enable button & reset text
        $submitBtn.prop("disabled", false).text("Send Message");

        // Show confirmation modal
        $.confirm({
          title: "Message Sent!",
          content: response,
          type: "green",
          boxWidth: "400px", // control the width
          useBootstrap: false, // disables bootstrap responsive auto-width
          buttons: {
            ok: function () {
              $form[0].reset();
            },
          },
        });
      },
      error: function (xhr, status, error) {
        $submitBtn.prop("disabled", false).text("Send Message");
        $.alert({
          title: "Error",
          content: "An error occurred: " + error,
          type: "red",
        });
      },
    });
  });
});
