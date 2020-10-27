#!bin/sh
if [ -z $BASE_HREF ]; then
    export BASE_HREF='/'
fi

function replace_baseref {
    target=${1//\/usr\/share\/nginx\/org/\/usr\/share\/nginx\/html}
    if [ ! -d "$(dirname $target)" ]; then
        mkdir -p "$(dirname $target)"
    fi

    if [ -f $1 ]; then
        if [ ${1##*.} == "js" ]; then
            sed "s@\/\$BASE_HREF\/@$BASE_HREF@g" $1 > $target # is js files we need to replace /$BASE_HREF/
        else
            envsubst '${BASE_HREF}' < $1 > $target # replace $BASE_HREF
        fi
    fi
}
envsubst '${BASE_HREF}' < /etc/nginx/conf.d/mysite.template > /etc/nginx/conf.d/default.conf
find /usr/share/nginx/org | while read file; do replace_baseref "$file"; done
exec nginx -g 'daemon off;'
