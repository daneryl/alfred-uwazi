'use strict';
var fetch = require('node-fetch');
var fs = require('fs');
var moment = require('moment');

var download = function(uri, filename, callback){
  fs.exists(filename, (exists) => {
    if (!exists) {
      fetch(uri)
      .then(function(res) {
        var dest = fs.createWriteStream(filename);
        res.body.pipe(dest);
      });
    }
  })
};

fetch('https://api.github.com/repos/huridocs/uwazi/pulls')
.then(res => res.json())
.then((pulls) => {
  const arr = pulls.map((pr) => {
    download(pr.user.avatar_url, __dirname+'/icons/'+pr.user.login+'.png')
    return {
      title: pr.title,
      arg: pr.html_url,
      subtitle: `${pr.user.login}  ${moment(pr.created_at).fromNow()}`,
      icon: {
        path: `icons/${pr.user.login}.png`
      },
      mods: {
        //alt: {
          //valid: true,
          //arg: "alfredapp.com/powerpack",
          //subtitle: "https://www.alfredapp.com/powerpack/"
        //},
        cmd: {
          valid: true,
          arg: pr.head.ref,
          subtitle: `checkout ${pr.head.ref}`
        }
      }
    }
  });
  console.log(JSON.stringify({items: arr}, null, '\t'));
});

