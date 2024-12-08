from django.db import models

# Create your models here.
from django.contrib.auth.models import User


class Todo(models.Model):
    title = models.CharField(max_length=100,verbose_name="标题")
    detail = models.TextField(blank=True, verbose_name="详情")
    completed = models.BooleanField(default=False, verbose_name="是否完成")
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="用户名")
    create_time = models.DateTimeField(auto_now_add=True, verbose_name="添加时间")
    update_time = models.DateTimeField(auto_now=True, verbose_name="修改时间")

    def __str__(self):
        return f"<Todo title={self.title}>"
    
    def __repr__(self) -> str:
        return self.__str__()
    
    class Meta:
        db_table = "tb_todo"
        verbose_name = "待办事项"
        verbose_name_plural = verbose_name