from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def tutor(request):
    return HttpResponse('<h1>Prabhat</h1>')
    