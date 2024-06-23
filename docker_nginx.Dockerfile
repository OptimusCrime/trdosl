FROM nginx:1.25.4-alpine

ARG ENV=prod

COPY ./_docker/site.conf /etc/nginx/conf.d/site.conf
COPY ./frontend/build /static
COPY ./frontend/markers /static/static/markers

RUN chmod 644 /etc/nginx/conf.d/site.conf \
    && rm /etc/nginx/conf.d/default.conf

RUN if [ $ENV = "prod" ] ; then \
    sed -i 's/trdosl-java/trdosl-java-prod/g' /etc/nginx/conf.d/site.conf ; \
fi ;
