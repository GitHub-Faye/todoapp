from django.contrib.auth import authenticate
from django.shortcuts import render
import logging

from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.parsers import JSONParser


@csrf_exempt
def register(request):
    if request.method != "POST":
        logging.warning(f"暂不支持此方法：{request.method}")
        return

    try:
        data = JSONParser().parse(request)
        user = User.objects.create_user(username=data["username"], password=data["password"])
        user.save()
        token = Token.objects.create(user=user)
        return JsonResponse({"token": str(token)}, status=200)
    except Exception as e:
        logging.error(e)
        return JsonResponse({"error": "用户注册失败"}, status=400)


@csrf_exempt
def login(request):
    if request.method != "POST":
        logging.error(f"不支持此方法：{request.method}")
        return
    msg = "用户名或密码错误"
    try:
        data = JSONParser().parse(request)
        user = authenticate(request, username=data["username"], password=data["password"])
        if user is not None:
            token = Token.objects.get(user=user)
            if not token:
                token = Token.objects.create(user=user)
            return JsonResponse({"token": str(token)}, status=200)
        logging.error(msg)
    except Exception as e:
        logging.error(e)
        msg = str(e)
    return JsonResponse({"error": msg}, status=400)
