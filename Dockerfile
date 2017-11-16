FROM nginx:1.13.6

LABEL maintainer="W. Neto <netoht@gmail.com>"

ADD index.html /usr/share/nginx/html/index.html
ADD dist /usr/share/nginx/html/dist