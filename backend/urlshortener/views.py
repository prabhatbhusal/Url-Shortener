import hashlib
from ipaddress import ip_address
from django.shortcuts import redirect
from django.utils import timezone
from .models import URL, Clicked,RateLimiterLog
from .serializers import URLSerializer, ClickedSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from datetime import  timedelta, datetime
from django.db.models import Count
from urlshortener import serializers
#######################################
########################################


def check_rate_limiter(request):
    
    ip=request.META.get("HTTP_X_FORWARDED_FOR") or request.META.get("REMOTE_ADDR")##get IPAddress of the client
    minute_get=timezone.now()-timedelta(seconds=60) ##determines minute
    count = RateLimiterLog.objects.filter(ip_address=ip,timestamps__gte=minute_get).count() #counts value
    previous_time= RateLimiterLog.objects.filter(ip_address=ip,timestamps__gte=minute_get).order_by('timestamps').first() #determines previous time
    
    if count>=5:
        timestamps_remain=60 - (timezone.now() - previous_time.timestamps).total_seconds()
        return int(timestamps_remain)# return remaining time
    else:
        RateLimiterLog.objects.create(ip_address=ip)
        return None

class ShortenURL(APIView): #shorten url as well as provide checks rate limit exceed or not also use hashib to generate hash
    def post(self, request):
        result=check_rate_limiter(request)
        if result is not None:
            return Response({'retry_after':result},status=status.HTTP_429_TOO_MANY_REQUESTS)
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


class RedirectURL(APIView):#redirects url
    def get(self, request, alias):
        try:
            url = URL.objects.get(alias_value=alias)
        except URL.DoesNotExist:
            return Response({'error!!': 'URL NOT found'}, status=status.HTTP_404_NOT_FOUND)
        Clicked.objects.create(url=url)
        return redirect(url.url_entry)
#######################################
########################################


class URLList(APIView):# provide all stores url lists
    def get(self, request):
        urls = URL.objects.all()
        serializer = URLSerializer(urls, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK) # return json/dict data
#######################################
########################################


class Analytics(APIView): #analyses the total click in a date as well as data 
    def get(self, request, alias):
        try:
            url = URL.objects.get(alias_value=alias)
        except URL.DoesNotExist:
            return Response({'error': 'URL NOT FOUND'}, status=status.HTTP_404_NOT_FOUND)
        
        seven_days = timezone.now().date() - timedelta(days=7)  # ← add back
        
        clicks = Clicked.objects.filter(
            url=url, 
            date_click__date__gte=seven_days
        ).values('date_click__date').annotate(clicks=Count('id'))
        
        # Generate all 7 days 
        all_days = []
        for i in range(7):
            day = (timezone.now().date() - timedelta(days=6-i))
            all_days.append(str(day))
        
        clicks_dict = {
            str(c['date_click__date']): c['clicks'] 
            for c in clicks
        }
        
        result = [
            {'date': day, 'clicks': clicks_dict.get(day, 0)}
            for day in all_days
        ]
        
        return Response(result, status=status.HTTP_200_OK)
