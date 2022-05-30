docker buildx build --platform linux/amd64,linux/arm64 --push -t jasonhongxyz/myjenkins:latest ./jenkins
docker buildx build --platform linux/amd64,linux/arm64 --push -t jasonhongxyz/blog:latest .
