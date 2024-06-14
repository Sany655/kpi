from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
import json

User = get_user_model()

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        role = data.get('role')
        username = data.get('username')

        if User.objects.filter(username=username).exists():
            return JsonResponse({'status': False, 'message': 'Username already exists'})
        if User.objects.filter(email=email).exists():
            return JsonResponse({'status': False, 'message': 'Email already exists'})

        user = User.objects.create_user(username=username, email=email, password=password, role=role)
        return JsonResponse({'status': True, 'role': user.role})
    return JsonResponse({'status': False, 'message': 'Invalid request method'})

@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        user = authenticate(username=username, password=password)
        if user is not None:
            update_last_login(None, user)
            return JsonResponse({'status': True, 'role': user.role})
        return JsonResponse({'status': False, 'message': 'Invalid credentials'})
    return JsonResponse({'status': False, 'message': 'Invalid request method'})
