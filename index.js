'use strict';

const arr = [
  {
    uid: 'merge',
    type: 'file',
    title: 'Merge development to production branches',
    arg: 'MERGE',
    subtitle: 'Merge development to master and master to custom branches',
    icon: {
      path: 'icons/github.png'
    }
  },
  {
    uid: 'PR',
    type: 'file',
    title: 'Pull requests',
    arg: 'PRS',
    subtitle: 'uwazi github pull requests',
    icon: {
      path: 'icons/github.png'
    }
  },
  {
    uid: 'servers',
    type: 'file',
    title: 'Servers',
    arg: 'SERVERS',
    subtitle: 'List all uwazi servers and instances',
  },
  {
    uid: 'reclone',
    type: 'file',
    title: 'Fresh uwazi',
    arg: 'FRESH',
    subtitle: 'remove uwazi and clone/install it again',
    icon: {
      path: 'icons/github.png'
    }
  },
  {
    uid: 'sprint',
    type: 'file',
    title: 'sprint',
    arg: 'https://github.com/huridocs/uwazi/issues?utf8=%E2%9C%93&q=is%3Aopen%20is%3Aissue%20label%3A%22Status%3A%20Sprint%22',
    subtitle: 'uwazi github sprint issues',
    icon: {
      path: 'icons/github.png'
    }
  },
  {
    uid: 'newIssue',
    type: 'file',
    title: 'Create issue',
    arg: 'https://github.com/huridocs/uwazi/issues/new',
    subtitle: 'Create new uwazi issue',
    icon: {
      path: 'icons/github.png'
    }
  },
  {
    uid: 'issues_recently_updated',
    type: 'file',
    title: 'Updated issues',
    arg: 'https://github.com/huridocs/uwazi/issues?q=is%3Aissue+is%3Aclosed+sort%3Aupdated-desc',
    subtitle: 'Recently updated issues',
    icon: {
      path: 'icons/github.png'
    }

  },
  {
    uid: 'monitoring',
    type: 'file',
    title: 'server monitoring',
    arg: 'https://monitor.huridata.org/'
  },
  {
    uid: 'ci',
    type: 'file',
    title: 'go integration pipelines',
    arg: 'http://213.167.241.120:8153/go/pipelines',
    subtitle: 'uwazi github continuous integration pipelines',
    icon: {
      path: 'icons/go.png'
    }

  },
  {
    uid: 'image',
    title: 'dev',
    arg: 'dev',
    subtitle: 'bootstrap dev environment'
  }
];
console.log(JSON.stringify({items: arr}, null, '\t'));
