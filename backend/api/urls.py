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
]
