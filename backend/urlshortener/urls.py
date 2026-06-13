from django.urls import path
from .views import ShortenURL,RedirectURL,URLList,Analytics

urlpatterns = [
    path('shortenurl/',ShortenURL.as_view()),
    path('urls/',URLList.as_view()),
    path('<str:alias>/',RedirectURL.as_view()),
    path('analytics/<str:alias>/',Analytics.as_view())
]
