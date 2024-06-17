FROM nginx:1.25.4-alpine

ARG ENV=prod

COPY ./_docker/site.conf /etc/nginx/conf.d/site.conf
COPY ./frontend/build /static

RUN chmod 644 /etc/nginx/conf.d/site.conf \
    && rm /etc/nginx/conf.d/default.conf

RUN if [ $ENV = "prod" ] ; then \
    sed -i 's/trdosl-spring-boot/trdosl-spring-boot-prod/g' /etc/nginx/conf.d/site.conf ; \
fi ;
