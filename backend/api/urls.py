from django.urls import path
from . import views

app_name = "todo"
urlpatterns = [
    path("", views.TodoListCreate.as_view(), name="todo"),
    path("todos/", views.TodoListCreate.as_view(), name="todo"),
    path("todos/<int:pk>", views.TodoRetrieveUpdateDestroy.as_view(), name="todo_detail"),
    path("todos/<int:pk>/complete/", views.TodoCompleteView.as_view(), name="todo_complete"),
    path('signup/', views.signup),
    path('login/', views.login),

    path('room', views.RoomView.as_view()),
    path('room-create', views.RoomCreateView.as_view()),
    path('get-room', views.GetRoom.as_view()),
    path('join-room', views.JoinRoom.as_view()),
    path('leave-room', views.LeaveRoom.as_view()),
]
