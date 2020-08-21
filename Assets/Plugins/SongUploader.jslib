//https://forum.unity.com/threads/how-do-i-let-the-user-load-an-image-from-their-harddrive-into-a-webgl-app.380985/
var SongUploaderPlugin = {
  SongUploaderInit: function() {
    var fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.onclick = function (event) {
      this.value = null;
    };
    fileInput.onchange = function (event) {
      var url = URL.createObjectURL(event.target.files[0]);
      var rawUrl = document.createElement('div');
      rawUrl.setAttribute('id', 'rawurl');
      rawUrl.dataset.url = url;
      document.body.appendChild(rawUrl);
      SendMessage('UI', 'WebFileSelected', url);
      var event = new Event("fileselect");
      document.addEventListener("fileprocessed", function (event) {
        console.log('file processed...');
        var url2 = document.getElementById('samplesurl').dataset.samples;
        SendMessage('UI', 'WebFileProcessed', url2);
      });
      document.dispatchEvent(event);
    }
    document.body.appendChild(fileInput);
  }
};
mergeInto(LibraryManager.library, SongUploaderPlugin);
