const reelsData = [
    { img: "./img1.jpg", user: "Takli yadav",  caption: "E-commerce Changes Adapting to the future #short video", likes: 1200, comments: 48, following: false, liked: false },
    { img: "./img2.jpg", user: "Rohit Sharma", caption: "Morning vibes aur ek nayi shuruaat #shorts",            likes: 860,  comments: 22, following: false, liked: false },
    { img: "./img3.jpg", user: "Neha Verma",   caption: "Travel diaries: pahadon ki sair #travel",               likes: 2400, comments: 130, following: false, liked: false },
    { img: "./img4.jpg", user: "Aman Singh",   caption: "Coding seekhna itna bhi mushkil nahi #webdev",          likes: 540,  comments: 17, following: false, liked: false },
    { img: "./img5.jpg", user: "Priya Das",    caption: "Street food ka maza #foodie",                           likes: 3100, comments: 205, following: false, liked: false },
    { img: "./img6.jpg", user: "Karan Mehta",  caption: "Gym motivation #fitness #shorts",                       likes: 970,  comments: 36, following: false, liked: false },
    { img: "./img7.jpg", user: "Sana Khan",    caption: "Sunset ka jaadu #nature",                               likes: 1800, comments: 77, following: false, liked: false }
];

const allReels = document.querySelector(".all-reels");


function fmt(n){
    return n >= 1000 ? (n / 1000).toFixed(1).replace(".0", "") + "K" : n;
}


function renderReels(){
    allReels.innerHTML = reelsData.map((r, i) => `
        <div class="reel" data-index="${i}">
            <img class="main-img" src="${r.img}" alt="reel ${i + 1}">
            <div class="big-heart">&#10084;</div>

            <div class="actions">
                <div>
                    <button class="like-btn ${r.liked ? "liked" : ""}" data-id="${i}">&#10084;</button>
                    <span id="like-${i}">${fmt(r.likes)}</span>
                </div>
                <div>
                    <button class="comment-btn">&#128172;</button>
                    <span>${fmt(r.comments)}</span>
                </div>
                <div>
                    <button class="share-btn" data-id="${i}">&#10150;</button>
                    <span>Share</span>
                </div>
            </div>

            <div class="bottom">
                <div class="user">
                    <img src="${r.img}" alt="${r.user}">
                    <h4>${r.user}</h4>
                    <button class="follow-btn" data-id="${i}">Follow</button>
                </div>
                <h3>${r.caption}</h3>
            </div>
        </div>
    `).join("");
}
renderReels();


function toggleLike(i, forceLike = false){
    const r = reelsData[i];
    if (forceLike && r.liked) return;       
    r.liked = !r.liked;
    r.likes += r.liked ? 1 : -1;
    const reel = allReels.children[i];
    reel.querySelector(".like-btn").classList.toggle("liked", r.liked);
    reel.querySelector("#like-" + i).textContent = fmt(r.likes);
}


allReels.addEventListener("click", (e) => {
    const likeBtn = e.target.closest(".like-btn");
    const followBtn = e.target.closest(".follow-btn");
    const shareBtn = e.target.closest(".share-btn");
    const commentBtn = e.target.closest(".comment-btn");

    if (likeBtn) {
        toggleLike(Number(likeBtn.dataset.id));
    } else if (followBtn) {
        const i = Number(followBtn.dataset.id);
        reelsData[i].following = !reelsData[i].following;
        followBtn.textContent = reelsData[i].following ? "Following" : "Follow";
        followBtn.classList.toggle("following", reelsData[i].following);
    } else if (shareBtn) {
        const i = Number(shareBtn.dataset.id);
        if (navigator.share) {
            navigator.share({ title: reelsData[i].user, text: reelsData[i].caption, url: location.href });
        } else {
            navigator.clipboard?.writeText(location.href);
            shareBtn.nextElementSibling.textContent = "Copied!";
            setTimeout(() => (shareBtn.nextElementSibling.textContent = "Share"), 1200);
        }
    } else if (commentBtn) {
        alert("Comments abhi demo me hain :)");
    }
});


allReels.addEventListener("dblclick", (e) => {
    const reel = e.target.closest(".reel");
    if (!reel || e.target.closest("button")) return;
    toggleLike(Number(reel.dataset.index), true);
    const heart = reel.querySelector(".big-heart");
    heart.classList.remove("show");
    void heart.offsetWidth;     
    heart.classList.add("show");
});


document.addEventListener("keydown", (e) => {
    const h = allReels.clientHeight;
    if (e.key === "ArrowDown") allReels.scrollBy({ top: h });
    if (e.key === "ArrowUp") allReels.scrollBy({ top: -h });
});