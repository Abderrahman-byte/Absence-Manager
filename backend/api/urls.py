from django.urls import path, include

from .views import ParseExcelCSV

urlpatterns = [
    path('auth/', include('backend.api.auth.urls')),
    path('teacher/', include('backend.api.teacher.urls')),
    path('admin/', include('backend.api.admin.urls')),

    path('utils/parse', ParseExcelCSV.as_view(), name='api_parse_csv_excel')
]