const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// The issue might be that the input is found, but the transactionMode isn't successfully "accept"
// Wait, when I click "Accept Card", I replaced `setTransactionMode("consume")` with `setTransactionMode("accept")`.
// Let's verify that.

const match = content.match(/onClick=\{\(\) => \{ setTransactionMode\("accept"\); navigateTo\("HANDLE_SEARCH"\); \}\}/);
if (match) {
    console.log("Accept card logic found");
} else {
    console.log("Accept card logic missing or malformed");
    const testMatch = content.match(/onClick=\{[^}]+\}\s*className="h-\[100px\] bg-\[#F4F4F4\] rounded-\[16px\] shadow-sm p-4 flex flex-col justify-between cursor-pointer"\s*>\s*<div className="w-8 h-8 bg-\[#27A163\]\/10 rounded-full flex items-center justify-center self-start shadow-sm">\s*<Utensils className="w-4 h-4 text-\[#27A163\]" strokeWidth=\{2\} \/>\s*<\/div>\s*<div className="text-\[15px\] font-bold text-\[#1A1A1A\] leading-tight">Use Card<\/div>/)
    console.log(testMatch);
}
