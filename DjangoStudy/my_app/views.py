from django.shortcuts import render,redirect
from django.http import Http404, HttpResponse, HttpResponseNotFound, HttpResponseRedirect
from django.urls import reverse
from . import models
# Create your views here.


def index(request):
    return HttpResponse("Hellp my first view inside a APP")

dict = {
    'first':'first',
    'second':'second'
}

def Dynamic_path(request,Dynamic_path):
    try:
        return HttpResponse(dict[Dynamic_path])
    except:
        raise Http404('404')


def Dynamic_path2(request,int1,int2):
    return HttpResponse(int1+int2)


def Dynamic_path_and_Redirect(request,int1):
    list1 = list(dict.keys())
    topics = list1[int1]
    return HttpResponseRedirect(reverse('Dynamic_path',args=[topics]))
    # return HttpResponse(topics)


def simple_vies(request):
    my_var = {'name':'卫艺伟','properties':'可爱','size':[1,2,3],'other':{'love':'sport shoes'}}
    return render(request, 'my_app/example.html',context = my_var)


def list(request):
    all = models.When.objects.all()
    context = {'all':all}
    return render(request,'my_app/list.html',context=context)


def delete(request):
    if request.POST:
        pk = request.POST['pk']
        try:
            models.When.objects.get(pk=pk).delete()
            return redirect(reverse('my_app:list'))
        except:
            print('pk not found')
            return render(request,'my_app/delete.html')
    

def add(request):
    if request.POST:
        when = int(request.POST['when'])
        where = request.POST['where']
        models.When.objects.create(when=when,where=where)
        return redirect(reverse('my_app:list'))
    else:
        return render(request,'my_app/add.html')