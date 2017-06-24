
var track = null;
var apiHost = 'http://ws.audioscrobbler.com/2.0/?';
var apiKey = '&api_key=ea50b8271def892cb877d5983fc8ca3a&format=json'
$(document).ready(function () {
  _populateView(apiHost+'method=chart.gettoptracks'+apiKey,
  function(){
$('#close-overlay').click(function(event){
        _closeOverlay();
    });
  });    
});

var _populateView = function(apiUrl, cb){
      $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function (response) {
            console.log(response)
            debugger;
            if(response && response.tracks != undefined){
                console.log('if')
                track = response.tracks.track;
            }
            else{
                 track = response.results.trackmatches.track;
            }
            _populateContainer();
            cb();
        }
    });
}
var _closeOverlay = function(){
    $('#overlay').removeClass('hide-body');
    $('body').css('overflow', 'initial');
    $('#load-selected-track').html('');
}


var loadTrack = function(track){
    let content = `<div class="row">
          <div class="col-md-2">
            <div class="track-selected">
              <div class="poster">
                <img src='${track.image[3]['#text']}' />
              </div>
            </div>
          </div>
          <div class="col-md-3" style='color: #fff;'>
          <h4>${track.name}</h4>
          <h5>Artist: ${track.artist.name}</h5>
          <h5>Listeners: <span class='badge'>${track.listeners}</span></h5>
          <h5><i class="fa fa-play-circle" aria-hidden="true"></i> Play</h5>
          </div>
          </div>

        `;

var availableAlbums = [{
    name: 'John Doe',
    listeners: 2490,
    playcount: 3400,
    posterUrl: 'https://thetechmap.com/uploads/Logo_36034.jpg',
    songUrl: ''
}, {
    name: 'John Doe',
    listeners: 2490,
    playcount: 3400,
    posterUrl: 'https://thetechmap.com/uploads/Logo_36034.jpg',
    songUrl: ''
}, {
    name: 'John Doe',
    listeners: 2490,
    playcount: 3400,
    posterUrl: 'https://thetechmap.com/uploads/Logo_36034.jpg',
    songUrl: ''
},];
content += `<hr /> 
            <div class='col-md-12' style='color: #fff'>
                <h4>Available Covers</h4>
            </div>
            <div class='row' style='color: #fff;'>`;
availableAlbums.forEach((track)=>{
    
content += `<div class='available-each-poster'>
           
            <div class='col-md-12'>
                <div class='available-covers'>
                    <img src='${track.posterUrl}' />
                    <h4>${track.name}</h4>
                    <h5>Artist: ${track.name}</h5>
                    <h5>Listeners: <span class='badge'>${track.listeners}</span></h5>
                    <h5>Play Count: <span class='badge'>${track.playcount}</span></h5>
                </div>
          </div>
          </div>
        `;
        
});
content +='</div>';
$('#load-selected-track').html(content);
}

var playSong = function (id) {
    var song = track.find((item) => {
        return item.sid == id;
    });
    if (!song) return;
    $('body').css('overflow', 'hidden');
    $('#overlay').addClass('hide-body');
    loadTrack(song);
}
var _populateContainer = function () {
    //gallery
    let content = '';
    track.forEach((item, index) => {
        item.sid = index;
        content += `<div class='col-md-3 track' onClick='playSong(${item.sid})' style='background:url("${item.image[3]['#text']}");background-repeat: no-repeat;background-size: cover;'>
        <div class='track-content'>
        <div class="detail"> 
        <div>
        ${item.name}
        </div>
        <div class='hide-content'>
        ${item.artist.name}
        </div>
        <div>
        ${item.listeners}
        </div>
        </div>
        </div></div>`
    });
    $('#gallery').html(content);

};

function searchartist(){
    var searchKey=$('#search-artist').val();
    debugger;
 _populateView(apiHost+`method=track.search&track=${searchKey}`+apiKey,
  function(){

$('#close-overlay').click(function(event){
        _closeOverlay();
  
  });
  });   
  
}
