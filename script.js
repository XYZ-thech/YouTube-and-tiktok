function embedVideo() {
    console.log("embedVideo called");
    const videoUrl = document.getElementById('videoUrl').value;
    console.log("URL: ",videoUrl);
    const videoContainer = document.getElementById('videoContainer');
    videoContainer.innerHTML = ''; // Clear any existing embed

    if (videoUrl.includes("youtube.com")) {
        // YouTube Embed Logic
        const videoId = extractYouTubeId(videoUrl);
         console.log("YouTube ID extracted:", videoId);
        if (videoId) {
          const embedCode = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
          videoContainer.innerHTML = embedCode;
        } else {
          videoContainer.innerHTML = "<p>Invalid YouTube URL.</p>"
        }


    } else if (videoUrl.includes("tiktok.com")) {
      const tiktokId = extractTikTokId(videoUrl);
      console.log("TikTok ID extracted:", tiktokId);
      if (tiktokId) {
          const embedCode = `<iframe src="https://www.tiktok.com/embed/${tiktokId}" width="320" height="480" frameborder="0" allowfullscreen></iframe>`;
           videoContainer.innerHTML = embedCode;
      } else {
          videoContainer.innerHTML = "<p>Invalid TikTok URL.</p>";
        }
    } else {
        videoContainer.innerHTML = "<p>Unsupported URL. Please use YouTube or TikTok URLs.</p>";
    }
}

function extractYouTubeId(url) {
  try{
    const urlObject = new URL(url);
    const urlParams = new URLSearchParams(urlObject.search);
    const id = urlParams.get('v');
    if (id) return id;
    const pathname = urlObject.pathname;
    const match = pathname.match(/\/embed\/([a-zA-Z0-9_-]+)/);

    if (match) return match[1];

    const lastPathSegment = pathname.substring(pathname.lastIndexOf('/') + 1);
    if (lastPathSegment.length === 11){
        return lastPathSegment;
    }

    return null;

  } catch (e) {
    return null;
  }
}


function extractTikTokId(url) {
    try{
        const urlObject = new URL(url);
      const pathname = urlObject.pathname;
      const regex = /\/video\/(\d+)/;
      const match = pathname.match(regex);
        if (match && match[1])
           return match[1]
       return null;

    } catch (e) {
        return null;
    }
}
