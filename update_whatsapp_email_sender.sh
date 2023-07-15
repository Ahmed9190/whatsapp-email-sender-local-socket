cd /d/whatsapp-email-sender/
git fetch --all
git reset --hard origin/master
rm -rf node_modules
export PUPPETEER_SKIP_DOWNLOAD=true
npm i
npm run build