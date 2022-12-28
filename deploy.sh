echo "Switching to branch master"
git checkout master

echo "Building app ..."
npm run build

echo "Deploying files to server ..."
scp -r build/* xudayar@135.181.44.51:/var/www/135.181.44.51/ 

echo "Done!"