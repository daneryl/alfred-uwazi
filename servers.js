var readDirFiles = require('read-dir-files');
var yaml = require('yamljs');
var ini = require('ini');
var fs = require('fs');

function getUwaziServers() {
  return new Promise((resolve, reject) => {
    fs.readFile('/Users/daneryl/workspace/operations/inventory', (err, content) => {
      if (err) return reject(err);
      var config = ini.parse(content.toString());

      resolve([
        {
          title: 'Nginx',
          arg: `ansible-playbook uwazi_load_balancer.yml --vault-password-file=.vault-password -bK -u joan`,
          subtitle: `deploy Nginx server`,
          icon: {
            path: 'icons/ansible.png'
          },
          mods: {
            cmd: {
              valid: true,
              arg: `ssh joan@${Object.keys(config.uwazi_load_balancer)[0]}`,
              subtitle: `ssh to server`,
            }
          }
        }, 
        {
          title: 'Mongo',
          arg: `ansible-playbook uwazi_bbdd.yml --vault-password-file=.vault-password -bK -u joan`,
          subtitle: `deploy Mongo server`,
          icon: {
            path: 'icons/ansible.png'
          },
          mods: {
            cmd: {
              valid: true,
              arg: `ssh joan@${Object.keys(config.uwazi_bbdd)[0]}`,
              subtitle: `ssh to server`,
            }
          }
        },
        {
          title: 'Elasticsearch',
          arg: `ansible-playbook uwazi_elasticsearch.yml --vault-password-file=.vault-password -bK -u joan`,
          subtitle: `deploy Elastic server`,
          icon: {
            path: 'icons/ansible.png'
          },
          mods: {
            cmd: {
              valid: true,
              arg: `ssh joan@${Object.keys(config.uwazi_elasticsearch)[0]}`,
              subtitle: `ssh to server`,
            }
          }
        }
      ])
    });
  });
}

function getUwaziInstances() {
  return new Promise((resolve, reject) => {
    readDirFiles.read('/Users/daneryl/workspace/operations/host_vars', function (err, files) {
      if (err) return reject(err);
      let all_instances = [];

      Object.keys(files).forEach((host) => {
        const buffer = files[host]
        let data;

        try {
          data = yaml.parse(buffer.toString('utf8'));
        }
        catch(e) {
          return;
        }

        if (data.uwazi_instances) {
          data.uwazi_instances = data.uwazi_instances.map((instance) => {
            return {
              title: instance.name,
              arg: `ansible-playbook uwazi_instances.yml --vault-password-file=.vault-password -bK -l uwazi_instances -u joan --extra-vars "instance_name=${instance.name}"`,
              subtitle: `deploy ${instance.name} instance`,
              icon: {
                path: 'icons/ansible.png'
              },
              mods: {
                ctrl: {
                  valid: true,
                  arg: `ansible-playbook uwazi_instances.yml --vault-password-file=.vault-password -bK -l uwazi_instances -u joan --extra-vars "instance_name=${instance.name} reindex_elastic=true"`,
                  subtitle: `deploy ${instance.name} instance and reindex elasticsearch`,
                },
                cmd: {
                  valid: true,
                  arg: `ssh joan@${host}`,
                  subtitle: `ssh to the instance server`,
                }
              }
            };
          });
          all_instances = all_instances.concat(data.uwazi_instances);
        }
      });

      all_instances.push({
        title: 'ALL instances',
        arg: `ansible-playbook uwazi_instances.yml --vault-password-file=.vault-password -bK -l uwazi_instances -u joan`,
        subtitle: 'deploy ALL instances',
        icon: {
          path: 'icons/ansible.png'
        },
        mods: {
          ctrl: {
            valid: true,
            arg: `ansible-playbook uwazi_instances.yml --vault-password-file=.vault-password -bK -l uwazi_instances -u joan --extra-vars "reindex_elastic=true"`,
            subtitle: 'deploy ALL instances and reindex elasticsearch',
          }
        }
      });

      resolve(all_instances);
    });
  });
}

Promise.all([
  getUwaziServers(),
  getUwaziInstances()
])
.then(([servers, instances]) => {
  console.log(JSON.stringify({items: servers.concat(instances)}, null, '\t'));
});

