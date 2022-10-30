from django.urls import path, include

urlpatterns = [
    path('auth/', include('backend.api.auth.urls')),
]