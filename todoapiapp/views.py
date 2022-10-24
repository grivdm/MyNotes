from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Note
from .serializers import NoteSerializer

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

    def list(self, request):
        query = self.queryset.order_by('-updated')
        return Response(self.serializer_class(query, many=True).data)
        