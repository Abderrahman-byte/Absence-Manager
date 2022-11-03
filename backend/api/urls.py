from django.urls import path, include

urlpatterns = [
    path('auth/', include('backend.api.auth.urls')),
    path('teacher/', include('backend.api.teacher.urls')),
    path('admin/', include('backend.api.admin.urls')),
]