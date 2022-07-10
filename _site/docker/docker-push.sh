docker buildx build -f Dockerfile-jenkins --platform linux/amd64,linux/arm64 --push -t jasonhongxyz/myjenkins:latest .
docker buildx build -f Dockerfile-blog --platform linux/amd64,linux/arm64 --push -t jasonhongxyz/blog:latest .
