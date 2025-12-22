FROM nginx:1.25.4-alpine

COPY ./_docker/site.conf /etc/nginx/conf.d/site.conf
COPY ./frontend/build /static
COPY ./frontend/markers /static/static/markers

RUN chmod 644 /etc/nginx/conf.d/site.conf \
    && rm /etc/nginx/conf.d/default.conf

RUN sed -i 's/trdosl-java/trdosl-java-prod/g' /etc/nginx/conf.d/site.conf
