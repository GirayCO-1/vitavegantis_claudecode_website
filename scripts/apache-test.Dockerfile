# .htaccess kurallarını gerçek Apache üzerinde sınamak için.
#
# Derleme bağlamı out/ klasörünün kendisidir — böylece ne Docker'a klasör
# paylaşımı tanıtmak ne de .dockerignore yazmak gerekir:
#
#   npm run build:static
#   docker build -f scripts/apache-test.Dockerfile -t vv-apache-test ./out
#   docker run -d --name vv-apache -p 8099:80 vv-apache-test
#   node apache-test.mjs
#   docker rm -f vv-apache
FROM httpd:2.4

# IHS'nin paylaşımlı hostinginde de açık olan modüller.
RUN sed -i \
      -e 's/^#LoadModule rewrite_module/LoadModule rewrite_module/' \
      -e 's/^#LoadModule headers_module/LoadModule headers_module/' \
      -e 's/^#LoadModule expires_module/LoadModule expires_module/' \
      -e 's/^#LoadModule deflate_module/LoadModule deflate_module/' \
      /usr/local/apache2/conf/httpd.conf \
 && sed -i 's/AllowOverride None/AllowOverride All/' /usr/local/apache2/conf/httpd.conf

COPY . /usr/local/apache2/htdocs/
