FROM node:8.11.1-alpine

RUN apk --update add git && rm -rf /var/cache/apk/*
# required behind some ISP:
RUN git config --global url.https://github.com.insteadof git://github.com

RUN apk --no-cache add git openssh python make gcc g++ && rm -rf /var/cache/apk/*

WORKDIR /workspace
COPY . /workspace
RUN yarn

# To test with local rocketh
# WORKDIR /workspace/rocketh
# RUN yarn 
# RUN yarn link
# WORKDIR /workspace
# RUN yarn link rocketh

# CMD ["yarn", "rocketh", "launch", "-l", "true", "tap", "-T", "--jobs=1", "test"]
