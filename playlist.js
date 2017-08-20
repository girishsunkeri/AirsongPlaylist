//
var selectedPlaylist = 'soulful';
var playlists = {
    soulful: [
        '20151112-WA0001',
        '2868',
        'Munbe Vaa Flute',
        'tamillove2'
    ],
    rock: [
        'Munbe Vaa Flute',
        'tamillove2'
    ],
    index: 0
}

function startSong() {
    var songTitle = playlists[selectedPlaylist][playlists.index++];
    $( "div:contains('" + songTitle + "')" ).parent().click();
    if(playlists.index <= playlists[selectedPlaylist].length) {
        setTimeout(function() {
            var currentTime = new Date().getTime();
            setNextSong(currentTime);
        }, 2000);
    }
}

function setNextSong(currentSongStartTime) {
    var currentSongDuration = $('.mejs-duration').html();
    currentSongDuration = currentSongDuration.split(':');
    var totalDuration = 0;
    for(var i = currentSongDuration.length - 1, j = 0; i >= 0; i--) {
        if(j === 0) {
            totalDuration = parseInt(currentSongDuration[i]);
        } else if (j === 1) {
            totalDuration += parseInt(currentSongDuration[i]) * 60;
        } else {
            totalDuration += parseInt(currentSongDuration[i]) * 60 * 60;
        }

        j++;
    }

    totalDuration = totalDuration * 1000;
    var nextSongStartTime = currentSongStartTime + totalDuration;
    nextSongStartTime = nextSongStartTime - new Date().getTime() - 1000;
    setTimeout(startSong, nextSongStartTime);
}

startSong();