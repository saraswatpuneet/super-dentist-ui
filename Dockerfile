FROM nginx:stable-alpine


COPY nginx.conf /etc/nginx/conf.d/mysite.template
COPY start.sh /usr/local/bin/

COPY dist/super-dentist /usr/share/nginx/org/
COPY custom-errors/ /usr/share/nginx/html/
RUN chmod +x /usr/local/bin/start.sh
CMD /usr/local/bin/start.sh

