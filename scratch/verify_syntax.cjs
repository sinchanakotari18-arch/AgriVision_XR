const fs = require('fs');
const vm = require('vm');
let content = fs.readFileSync('public/agrivision.html', 'utf8');

const target = `                '%<br/><span style="font-size:12px;color:#414942">Quick on-device colour screening, not a lab diagnosis.</span>';
        };`;

const replacement = `                '%<br/><span style="font-size:12px;color:#414942">Quick on-device colour screening, not a lab diagnosis.</span>';
            };
            img.src = current;
          }
        };`;

console.log('Target found:', content.includes(target));
content = content.replace(target, replacement);

const scripts = [...content.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
const code = scripts[3][1];
try {
  new vm.Script(code);
  console.log('SUCCESS! Script 3 is 100% valid JavaScript!');
} catch (e) {
  console.error('ERROR:', e.message, e.stack);
}
