var JIRA_ISSUE_PATTERN = /^\[?(?:[A-Z][A-Z0-9]{1,6}-\d+\s?)+\]?.*/;

var TEXT_UPDATE_PATTERN = /^Update\s\S*\.(?:txt|html|json)/;

var fs = require('fs');
var path = process.cwd();
var buffer = fs.readFileSync(path + '/.git/COMMIT_EDITMSG');
var commitMessage = buffer.toString();

if (
    commitMessage.startsWith('Revert') ||
    commitMessage.startsWith('# Conflicts:') ||
    commitMessage.startsWith('Merge') ||
    JIRA_ISSUE_PATTERN.test(commitMessage) ||
    TEXT_UPDATE_PATTERN.test(commitMessage)
) {
    process.exit(0);
}

console.log(commitMessage);
console.log(
    '\n' +
        'COMMITMELDINGER MÅ PREFIKSES MED ET JIRA ISSUE \n' +
        'Eks: git commit -m "FO-1234: Implementer håndtering av uventede pingviner.\n'
);
process.exit(1);
