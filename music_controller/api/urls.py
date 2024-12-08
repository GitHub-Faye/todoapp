from django.contrib import admin
from django.urls import include, path
from . import views

urlpatterns = [
    path('room/', views.RoomView.as_view()),
]
