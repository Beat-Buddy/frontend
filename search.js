let timeoutId = null;
let spotifyAccessToken = null;
let tokenType = null;
let seedSearchInProgress = false;

// Braucht keine Übergabeparameter, da die benötigten Werte in der Funktion geholt werden.
function search() {
    console.log("search-Function still needs to be implemented.");
}

// Braucht keine Übergabeparameter, da die benötigten Werte in der Funktion geholt werden.
function seedSearch() {
    timeoutId = null;
    if(seedSearchInProgress) return;
    if(document.getElementById("seedSearchInput").value === "") {
        removeSearchBarResults();
        return;
    }
    seedSearchInProgress = true;
    
    //console.log("seedSearch-Function still needs to be implemented.");
    

    
    // Übereinstimmungen mit Genres Prüfen.
    
    
    // Da Spotify Get-SearchForItem Endpoint nur erlaubt, dass man nach Tracks, oder Artists sucht,
    // müssen die am Anfang geladenen Genre-Seeds selbst bei übereinstimmung in der Liste angezeigt werden.
    // ich zeige 8 Element an, die letzten 2 sind Genres, bei Übereinstimmung, sonst werden nur 6 Elemente angezeigt. 
    
    let url = "https://api.spotify.com/v1/search?q=";
    let seedSearchbarText =  document.getElementById("seedSearchInput").value;
    let searchparamsURIEncoded = "&type=artist%2Ctrack&market=AT&limit=3";
    
    
    let finalURL = url + encodeURIComponent(seedSearchbarText) + searchparamsURIEncoded;
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        let response = JSON.parse(xhr.responseText);
        console.log(response);
        
        // Die Ergebnisse werden angezeigt
            // Bild und Text daneben. 
                // Bei Artists hat das Bild eine Abrundung
                // Bei Songs wird das Cover quadratisch angezeigt.
        removeSearchBarResults();

        // Songs anzeigen
        let seedTracks = response.tracks.items;
        addSeedsToSearchbar(seedTracks,"track");
        // Artists anzeigen
        let seedArtists = response.artists.items;
        addSeedsToSearchbar(seedArtists,"artist");

        
        seedSearchInProgress = false;
    }
    console.log(finalURL);
    xhr.open("GET", finalURL);
    xhr.setRequestHeader("Authorization", tokenType + " " + spotifyAccessToken);
    xhr.send();
}

// TODO : Funktion um Genres erweitern
function addSeedsToSearchbar(data,dataType){
    if(dataType !== "track" && dataType !== "artist") {
        console.log("Datatype : '" + dataType + "' wird nicht unterstützt!");
        return;
    }

    let seedResultList = document.getElementById("seedSearchResults");

    data.forEach(seed => {
        let seedListElement = document.createElement("li");
        seedResultList.append(seedListElement);
        let seedContainer = document.createElement("div");
        seedContainer.setAttribute("id",seed.id);
        seedContainer.setAttribute("class","searchBarResultContainer");
        seedContainer.addEventListener("click",function(){
            addToSelectedSeed(seed.id,seed.name,dataType);
        });

        seedListElement.append(seedContainer);
        
        // Bild setzten
        let seedPicture = document.createElement("img");
        
        if(dataType === "track") {
            seedPicture.setAttribute("class","searchBarResultItemPictureTrack");
            if(seed.album.images !== null){
                let picturesOfTrack = seed.album.images;
                if(picturesOfTrack.length > 0){
                    //seedPicture.alt = ""
                    // TODO : Width an Height mit CSS setzten
                    // TODO : CSS Classe hier setzten
                    let smallestPictureOfTrack = picturesOfTrack[picturesOfTrack.length - 2].url;
                    console.log("URL für Foto : " + smallestPictureOfTrack);
                    seedPicture.src = smallestPictureOfTrack;
                } else {
                    seedPicture.src = "Resources/track_icon.png";
                }
            } 
            else {
                seedPicture.src = "Resources/track_icon.png";
            }
        } else {
            // Wenn es kein Track ist, muss es ein Artist sein
            seedPicture.setAttribute("class","searchBarResultItemPictureArtist");
            if(seed.images !== null){
                let picturesOfTrack = seed.images;
                if(picturesOfTrack.length > 0){
                    //seedPicture.alt = ""
                    // TODO : Width an Height mit CSS setzten
                    // TODO : CSS Classe hier setzten
                    let smallestPictureOfTrack = picturesOfTrack[picturesOfTrack.length - 2].url;
                    console.log("URL für Foto : " + smallestPictureOfTrack);
                    seedPicture.src = smallestPictureOfTrack;
                } else {
                    seedPicture.src = "Resources/artist_icon.png";
                }
            } 
             else {
                seedPicture.src = "Resources/artist_icon.png";
            }
        }
        seedContainer.append(seedPicture); 
        
        // Title setzten
        let seedTitel = document.createElement("p");
        seedTitel.setAttribute("class","searchBarResultItemTitle");

        seedTitel.innerText = seed.name;
        seedContainer.append(seedTitel);
        
        //ID
        /*let seedId = document.createElement("p");
        //seedId.setAttribute("type","hidden");
        seedId.style.display = "none";
        seedId.innerText = seed.id; 
        seedContainer.append(seedId);*/
    });
}

function addToSelectedSeed(seedId,seedName,dataType){
    
    let selectedSearchbarContainer = document.getElementById(seedId); 
    console.log(selectedSearchbarContainer.querySelectorAll("p"));
    
    if (dataType === "track" || dataType === "artist") {
        // Ich brauche die Liste, der das Element hinzugefügt werden soll
        let selectedItemContainer = document.createElement("div");
        selectedItemContainer.setAttribute("class","selectedItemContainer");

        let selectedItemTitle = document.createElement("p");
        selectedItemTitle.innerText = seedName;
        selectedItemContainer.append(selectedItemTitle);

        let deleteButtonForSelectedItem = document.createElement("button");
        deleteButtonForSelectedItem.innerText = "x";
        deleteButtonForSelectedItem.addEventListener("click",function(){
            selectedItemContainer.remove();
        });
        selectedItemContainer.append(deleteButtonForSelectedItem);
        
        let selectedItemIdHidden = document.createElement("p");
        selectedItemIdHidden.innerText = seedId;
        selectedItemIdHidden.style.display = "none";
        selectedItemContainer.append(selectedItemIdHidden);
        

        // Unterscheidung zwischen Track und Artist machen.
        if(dataType === "track"){
            let listOfSelectedTracks = document.getElementById("selectedTrackList");
            listOfSelectedTracks.append(selectedItemContainer);
            
        } else {
            let listOfSelectedArtists = document.getElementById("selectedArtistList");
            listOfSelectedArtists.append(selectedItemContainer);
        }
    
    } else{
        // In diesem Fall kann es nur ein Genre sein.
        console.log("Fall für Genres muss noch implementiert werden");
    }

    // EVALUATE - 
        // Sollen die aktuellen Suchergebnisse verschwinden, wenn eines ausgewählt wurde - NEIN
        // Aktuelle Suchergebnisse sollen verschwinden, sobald der Text in der Suchleiste geändert wird.
    //removeSearchBarResults();
}

function removeSearchBarResults(){
    let seedResultList = document.getElementById("seedSearchResults");
    while (seedResultList.childElementCount > 0) {
        seedResultList.firstChild.remove();
    }
}

// Braucht keine Übergabeparameter, da die benötigten Werte in der Funktion geholt werden.
function clearAll() {
    console.log("clearAll-Function still needs to be implemented.");
}

window.onload = function() {
    // Input Listener auf SearchInput hängen.
    const seedSearchbar = document.getElementById('seedSearchInput');
    seedSearchbar.addEventListener("input", function() {
        
        if(timeoutId != null) clearTimeout(timeoutId);        
        timeoutId = setTimeout(seedSearch, 2500);
    });


    // Token Holen - gehört dann zwar ins Backend, und wird dem Client nach der Anmeldung mitgeschickt, aber vorerst
    // kann ich es so machen.
        // Daten vom Backend.
        const client_id = 'a77c30d64c6e4f448693b864b9fa0ce8';
        const client_secret = '7fe3fb3fb288461e8dd8949659f42971';

        let authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret) 
            },
            form: {
              grant_type: 'client_credentials'
            },
            json: true
        };

        const xhr = new XMLHttpRequest();
        xhr.onload = function(){
            let response = JSON.parse(xhr.responseText);
            tokenType = response.token_type;
            spotifyAccessToken = response.access_token;
            console.log(response);
        }

        const url = "https://accounts.spotify.com/api/token"; 
        xhr.open("POST",authOptions.url);
        xhr.setRequestHeader("Authorization",authOptions.headers.Authorization);
        xhr.setRequestHeader("Content-Type",'application/x-www-form-urlencoded');
        
        var formData = [];
        for (var key in authOptions.form) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(authOptions.form[key]);
            formData.push(encodedKey + '=' + encodedValue);
        }
        var requestBody = formData.join('&');

        xhr.send(requestBody);


    // API Call - Get Genre Seeds beim Laden des Fensters ausführen.
    // https://developer.spotify.com/documentation/web-api/reference/get-recommendation-genres

};