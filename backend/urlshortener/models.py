from ipaddress import ip_address

from django.db import models

# Create your models here.
class URL(models.Model):     #Table fto store url
    
    url_entry=models.URLField()
    alias_value=models.CharField(max_length=6,null=False,unique=True)
    date_url=models.DateTimeField(auto_now_add=True)
    
class Clicked(models.Model):    #table to store clicked data 
    url=models.ForeignKey(URL, on_delete=models.CASCADE) 
    date_click=models.DateTimeField(auto_now_add=True)

class RateLimiterLog(models.Model): #stores ip address and time stam to determine 
    ip_address=models.GenericIPAddressField()
    timestamps=models.DateTimeField(auto_now_add=True)