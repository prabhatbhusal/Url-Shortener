import hashlib
from django.shortcuts import redirect
from django.utils import timezone
from .models import URL, Clicked
from .serializers import URLSerializer, ClickedSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from datetime import timezone, timedelta, datetime
from django.db.models import Count
from backend.urlshortener import serializers
#######################################
########################################


class ShortenURL(APIView):
    def post(self, request):
        long_url = request.data.get('url_entry')
        if not long_url:
            return Response({'error': 'URL is required'}, status=status.HTTP_400_BAD_REQUEST)

        hash_creator = hashlib.md5(long_url.encode())
        hash_value = hash_creator.hexdigest()[:6]
        serializer = URLSerializer(
            data={'url_entry': long_url, 'alias_value': hash_value})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#######################################
########################################


class RedirectURL(APIView):
    def get(self, request, alias):
        try:
            url = URL.objects.get(alias_value=alias)
        except URL.DoesNotExist:
            return Response({'error!!': 'URL NOT found'}, status=status.HTTP_404_NOT_FOUND)
        Clicked.objects.create(url=url)
        return redirect(url.url_entry)
#######################################
########################################


class URLList(APIView):
    def get(self, request):
        urls = URL.objects.all()
        serializer = URLSerializer(urls, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
#######################################
########################################


class Analytics(APIView):
    def get(self, request, alias):
        try:
            url = URL.objects.get(alias_value=alias)
        except URL.DoesNotExist:
            return Response({'error': 'URL NOT FOUND'}, status=status.HTTP_404_NOT_FOUND)
        seven_days = timezone.now().date()-timedelta(days=7)  # acquires 7 days

        clicks = Clicked.objects.filter(url=url, date_click__date__gte=seven_days).values(
            'date_click__date').annotate(clicks=Count('id'))

        return Response(list(clicks), status=status.HTTP_200_OK)
