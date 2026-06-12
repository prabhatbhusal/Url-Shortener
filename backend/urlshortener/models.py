from django.db import models

# Create your models here.
class URL(models.Model):
    
    url_entry=models.URLField()
    alias_value=models.CharField(max_length=6,null=False,unique=True)
    date_url=models.DateTimeField(auto_now_add=True)
    
class Clicked(models.Model):
    url=models.ForeignKey(URL, on_delete=models.CASCADE) 
    date_click=models.DateTimeField(auto_now_add=True)
    