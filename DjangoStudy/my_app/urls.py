from django.urls import path
from . import views

app_name = 'my_app'
#all under Parent path 
urlpatterns = [
    path('list/',views.list,name='list'),
    path('add/',views.add,name='add'),
    path('delete/',views.delete,name='delete'),

    #Dynamic_path  take current_level path as a str paramter
    # can tell from different
    path('<int:int1>/',views.Dynamic_path_and_Redirect),
    path('<str:Dynamic_path>/',views.Dynamic_path,name='Dynamic_path'),


    #Dynamic_path  take current_level and last_level path as  int paramters
    #passing name must match  paramters of called method
    path('<int:int1>/<int:int2>/',views.Dynamic_path2),


   
]