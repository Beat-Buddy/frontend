document.addEventListener("DOMContentLoaded", function() {
    // sample song data
    const songs = [
      {
        title: "my tears ricochet",
        artist: "Taylor Swift",
        length: "4:14",
        album: "folklore"
      },
      {
        title: "Midnight Rain",
        artist: "Taylor Swift",
        length: "2:54",
        album: "Midnights"
      },
      {
        title: "The Archer",
        artist: "Taylor Swift",
        length: "3:31",
        album: "Lover"
      },
      {
        title: "cowboy like me",
        artist: "Taylor Swift",
        length: "4:35",
        album: "evermore"
      },
      {
        title: "right where you left me - bonus track",
        artist: "Taylor Swift",
        length: "4:05",
        album: "evermore"
      },
      {
        title: "mirrorball",
        artist: "Taylor Swift",
        length: "3:28",
        album: "folklore"
      },
      {
        title: "Anti-Hero",
        artist: "Taylor Swift",
        length: "3:20",
        album: "Midnights"
      },
      {
        title: "champagne problems",
        artist: "Taylor Swift",
        length: "4:04",
        album: "evermore"
      },
      {
        title: "Would've, Could've, Should've",
        artist: "Taylor Swift",
        length: "4:20",
        album: "Midnights"
      },
      {
        title: "this is me trying",
        artist: "Taylor Swift",
        length: "3:15",
        album: "folklore"
      },
    ];
  
    const songList = document.getElementById("songList");
  
    // displaying the first ten recommended songs
    for (let i = 0; i < 10 && i < songs.length; i++) {
      const song = songs[i];
      const songElement = createSongElement(song);
      songList.appendChild(songElement);
    }
  
    function createSongElement(song) {
      const songDiv = document.createElement("div");
      songDiv.classList.add("song");
  
      const songInfoDiv = document.createElement("div");
      songInfoDiv.classList.add("song-info");
  
      const titleElement = document.createElement("div");
      titleElement.classList.add("song-title");
      titleElement.textContent = song.title;
  
      const detailsElement = document.createElement("div");
      detailsElement.classList.add("song-details");
      detailsElement.textContent = `${song.artist} · ${song.length} · ${song.album}`;

      const buttonsContainer = document.createElement("div");
  
      const spotifyButton = document.createElement("button");
      spotifyButton.classList.add("spotify-button");
      spotifyButton.innerHTML = '<img src="/icons/spotify-icon.svg" alt="Spotify">';
      spotifyButton.setAttribute("data-tooltip", "Open in Spotify");

      const shareButton = document.createElement("button");
      shareButton.classList.add("share-button");
      shareButton.innerHTML = '<img src="/icons/share-icon.svg" alt="Share">';
      shareButton.setAttribute("data-tooltip", "Show Sharing Options");
      
      const favoriteButton = document.createElement("button");
      favoriteButton.classList.add("favorite-button");
      favoriteButton.innerHTML = '<img src="/icons/heart-icon.svg" alt="Like">';
      favoriteButton.setAttribute("data-tooltip", "Favorite Song");

      const isActive = favoriteButton.classList.contains("active");

      if (isActive) {
        favoriteButton.innerHTML = '<img src="/icons/solid-heart-icon.svg" alt="Unlike">';
        favoriteButton.setAttribute("data-tooltip", "Unfavorite Song");
        favoriteButton.classList.add("active");
      }

      favoriteButton.addEventListener("click", function() {
        if (favoriteButton.classList.contains("active")) {
          favoriteButton.innerHTML = '<img src="/icons/heart-icon.svg" alt="Like">';
          favoriteButton.setAttribute("data-tooltip", "Favorite Song");
          favoriteButton.classList.remove("active");
        } else {
          favoriteButton.innerHTML = '<img src="/icons/solid-heart-icon.svg" alt="Unlike">';
          favoriteButton.setAttribute("data-tooltip", "Unfavorite Song");
          favoriteButton.classList.add("active");
        }
      });

      // icons used: https://www.svgrepo.com/collection/zest-interface-icons/

      songInfoDiv.appendChild(titleElement);
      songInfoDiv.appendChild(detailsElement);
    
      buttonsContainer.appendChild(spotifyButton);
      buttonsContainer.appendChild(shareButton);
      buttonsContainer.appendChild(favoriteButton);
    
      songDiv.appendChild(songInfoDiv);
      songDiv.appendChild(buttonsContainer);

      return songDiv;
    }

  });
  