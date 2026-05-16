#!/bin/bash
# Rebuild frontend với platform và network fixes

echo "🔄 Stopping frontend containers..."
docker-compose stop frontend nginx

echo "🗑️  Removing old containers and images..."
docker-compose rm -f frontend nginx
docker rmi vietstrix_fe-frontend vietstrix_fe-nginx 2>/dev/null || true

echo "🏗️  Rebuilding frontend with platform linux/amd64..."
docker-compose build --no-cache --progress=plain frontend nginx

if [ $? -eq 0 ]; then
    echo "🚀 Starting containers..."
    docker-compose up -d frontend nginx

    echo "✅ Done! Checking status..."
    docker-compose ps frontend nginx

    echo ""
    echo "📋 Frontend logs:"
    docker logs frontend_app --tail 30
else
    echo "❌ Build failed!"
    exit 1
fi
