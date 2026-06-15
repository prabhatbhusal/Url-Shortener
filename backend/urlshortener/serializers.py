from rest_framework import serializers
from .models import URL,Clicked

class URLSerializer(serializers.ModelSerializer): #to aquire data in json  for Url
    class Meta:
        model=URL
        fields=["url_entry","alias_value","date_url"]
        
class ClickedSerializer(serializers.ModelSerializer):  #to aquire data in json  for clicked value and their dates
    class Meta:
        model=Clicked
        fields=["url","date_click"]