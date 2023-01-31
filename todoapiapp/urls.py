from django.urls import path, include
from . import views
from rest_framework import routers
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


router = routers.DefaultRouter()

router.register('note', viewset=views.NoteViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/jwt/create/', MyTokenObtainPairView.as_view()),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]