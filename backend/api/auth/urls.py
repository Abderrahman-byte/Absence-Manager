from rest_framework_simplejwt.views import TokenVerifyView
from django.urls import path

from .views import AccountTokenObtainPairView, AccountTokenRefreshView, AccountInfo

# TODO : black list refresh token on logout

urlpatterns = [
    path('token', AccountTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', AccountTokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify', TokenVerifyView.as_view(), name='token_verify'),
    path('account', AccountInfo.as_view(), name='account_info')
]