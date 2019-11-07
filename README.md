# run containre
# docker build -t .

run container 

docker run -it --rm -v /Users/jilios/dev/src:/go/src/app
            -v /Users/jilios/dev/build:/build myapp

ther run build file
./build/app

create preact app
npx preact-cli create default frontend

cd frontend/ && yarn start 

yarn build 

cp -r build/* ../src/public/ 