# Fix setAppState calls to navigateTo
sed -i 's/setAppState/navigateTo/g' src/app/page.tsx
# Now fix goBack inside absolute button (Route Selection)
sed -i 's/onClick={() => navigateTo("HOME")}/onClick={goBack}/g' src/app/page.tsx
# In Fare Selection, there is one navigateTo("ROUTE_SELECTION") we should change to goBack
sed -i 's/onClick={() => navigateTo("ROUTE_SELECTION")} className="p-2 shrink-0"/onClick={goBack} className="p-2 shrink-0"/g' src/app/page.tsx
