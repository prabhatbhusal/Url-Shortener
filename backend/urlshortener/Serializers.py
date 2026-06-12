from rest_framework import serializers
from .models import URL,Clicked

class URLSerializer(serializers.ModelSerializer):
    class Meta:
        model=URL
        fields=["url_entry","alias_value","date_url"]
        
class ClickedSerializer(serializers.ModelSerializer):
    class Meta:
        model=Clicked
        fields=["url","date_click"]