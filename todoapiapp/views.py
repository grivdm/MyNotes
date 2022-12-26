from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Note
from .serializers import NoteSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from .permissions import CustomPermission




class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


def tester(request):
    routes = [
        {
            'name': 'YEP'
        }
    ]
    return JsonResponse(routes, safe=False)


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [CustomPermission]

    def list(self, request):
        user = request.user
        query = self.queryset.order_by('-updated').filter(user = user)
        return Response(self.serializer_class(query, many=True).data)
        