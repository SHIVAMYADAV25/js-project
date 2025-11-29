const data = [
  {
    "video_url": "https://sample-videos.com/video321/mp4/240/big_buck_bunny_240p_1mb.mp4",
    "username": "streetVibes",
    "follow": true,
    "caption": "Morning hustle never stops.",
    "like_count": 1450,
    "comment_count": 87,
    "share_count": 22,
    "isLiked" : true,
  },
  {
    "video_url": "https://sample-videos.com/video321/mp4/240/big_buck_bunny_240p_2mb.mp4",
    "username": "dailyGrind",
    "follow": false,
    "caption": "Small steps, big progress.",
    "like_count": 980,
    "comment_count": 41,
    "share_count": 10,
    "isLiked" : false
  },
  {
    "video_url": "https://sample-videos.com/video321/mp4/240/big_buck_bunny_240p_5mb.mp4",
    "username": "snapCreator",
    "follow": true,
    "caption": "Caught this moment perfectly.",
    "like_count": 2210,
    "comment_count": 112,
    "share_count": 35,
    "isLiked" : true
  },
  {
    "video_url": "https://sample-videos.com/video321/mp4/240/big_buck_bunny_240p_3mb.mp4",
    "username": "urbanLens",
    "follow": false,
    "caption": "City lights hit different.",
    "like_count": 1675,
    "comment_count": 59,
    "share_count": 19
  },
  {
    "video_url": "https://sample-videos.com/video321/mp4/240/big_buck_bunny_240p_6mb.mp4",
    "username": "focusFrame",
    "follow": true,
    "caption": "Just keep aiming higher.",
    "like_count": 3100,
    "comment_count": 210,
    "share_count": 47
  },
  {
    "video_url": "https://sample-videos.com/video321/mp4/240/big_buck_bunny_240p_4mb.mp4",
    "username": "wanderMode",
    "follow": false,
    "caption": "Quick escape from the noise.",
    "like_count": 875,
    "comment_count": 33,
    "share_count": 9
  },
  {
    "video_url": "https://sample-videos.com/video321/mp4/240/big_buck_bunny_240p_7mb.mp4",
    "username": "rawCulture",
    "follow": true,
    "caption": "Pure energy in one clip.",
    "like_count": 1920,
    "comment_count": 94,
    "share_count": 28
  },
  {
    "video_url": "https://sample-videos.com/video321/mp4/240/big_buck_bunny_240p_8mb.mp4",
    "username": "midnightVibes",
    "follow": false,
    "caption": "Late-night thoughts.",
    "like_count": 760,
    "comment_count": 24,
    "share_count": 6
  },
  {
    "video_url": "https://sample-videos.com/video321/mp4/240/big_buck_bunny_240p_9mb.mp4",
    "username": "edgeCreator",
    "follow": true,
    "caption": "Sharp moments captured.",
    "like_count": 2550,
    "comment_count": 131,
    "share_count": 52
  },
  {
    "video_url": "https://sample-videos.com/video321/mp4/240/big_buck_bunny_240p_10mb.mp4",
    "username": "classicTone",
    "follow": false,
    "caption": "Keeping things real.",
    "like_count": 1140,
    "comment_count": 48,
    "share_count": 14
  }
]



let allReel = document.querySelector(".all-reels");

function DataShow(){
allReel.innerHTML=""; // IMPORTANT — clear old UI
data.forEach((e,idx)=>{
  allReel.innerHTML += ` <article class="reel">
  <video class="media" autoplay muted loop playsinline>
    <source src="./v1.mp4" type="video/mp4" />
  </video>

  <div class="bottom">
    <div class="user">

      <!-- USER IMAGE RESTORED -->
      <img src="./Screenshot 2025-11-21 082911.png" alt="${e.username}">

      <div class="user-meta">
        <h4>${e.username}</h4>
        <button class="follow" data-id="${idx}">${e.follow ? "Following":"Follow"}</button>
      </div>
    </div>

    <h3 class="caption">${e.caption}</h3>
  </div>

  <aside class="right">
    <button class="icon-btn like" data-id="${idx}"><i class="${e.isLiked ? "ri-heart-fill" : "ri-heart-line"}" id="${idx}"></i><span>${e.like_count}</span></button>
    <button class="icon-btn"><i class="ri-chat-1-line"></i><span>${e.comment_count}</span></button>
    <button class="icon-btn"><i class="ri-share-line"></i><span>${e.share_count}</span></button>
    <button class="icon-btn"><i class="ri-more-2-line"></i></button>
  </aside>
</article>
`
})

}

allReel.addEventListener("click",(e)=>{
  console.log();
  if(e.target.closest(".like")){
    let id = e.target.closest(".like").dataset.id
    let item = data[id];

    item.isLiked = !item.isLiked;
    item.like_count += item.isLiked? 1 : -1;

    DataShow();
    return;
  }


  if(e.target.classList.contains("follow")){
    let id = e.target.dataset.id;
    let item = data[id];

    item.follow = !item.follow;

    DataShow();
    return;
  }

});


DataShow();


// allReel.appendChild(reel)