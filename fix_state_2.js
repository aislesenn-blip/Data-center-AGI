const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// The mode is still starting as 'send', which breaks my "subscribe" string matches inside the UI.
content = content.replace(
  /const \[transactionMode, setTransactionMode\] = useState<"send" \| "receive" \| "pay" \| "deposit" \| "withdraw">\("send"\)/,
  'const [transactionMode, setTransactionMode] = useState<"subscribe" | "share" | "accept" | "catalogue">("subscribe")'
);

// We should also remove deposit/withdraw completely
content = content.replace(/transactionMode === "deposit" \|\| transactionMode === "withdraw"/g, 'false');
content = content.replace(/transactionMode === "deposit" \? "Funding Source" : "Destination"/g, '""');

// Fix buttons to actually set mode correctly
content = content.replace(
  /onClick=\{\(\) => \{\s*setTransactionMode\("send"\); navigateTo\("HANDLE_SEARCH"\);\s*\}\}/g,
  'onClick={() => { setTransactionMode("subscribe"); navigateTo("HANDLE_SEARCH"); }}'
);
content = content.replace(
  /onClick=\{\(\) => \{\s*setTransactionMode\("pay"\); navigateTo\("HANDLE_SEARCH"\);\s*\}\}/g,
  'onClick={() => { setTransactionMode("accept"); navigateTo("HANDLE_SEARCH"); }}'
);


fs.writeFileSync('src/app/page.tsx', content);
